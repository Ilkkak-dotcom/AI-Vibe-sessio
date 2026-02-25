const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Database setup
const db = new Database(path.join(__dirname, 'inventory.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    price REAL NOT NULL DEFAULT 0,
    description TEXT
  );
`);

// Seed with 20 products if table is empty
const count = db.prepare('SELECT COUNT(*) as count FROM products').get();
if (count.count === 0) {
  const insert = db.prepare(
    'INSERT INTO products (name, category, quantity, price, description) VALUES (?, ?, ?, ?, ?)'
  );
  const products = [
    ['Öljynsuodatin Mann W712/75', 'Moottorin osat', 48, 8.90, 'Öljynsuodatin sopii useille VW, Audi ja Seat -malleille'],
    ['Ilmansuodatin Bosch S0221', 'Moottorin osat', 35, 14.50, 'Korkealaatuinen ilmansuodatin, parantaa moottorin suorituskykyä'],
    ['Polttoainesuodatin Hengst H70WK02', 'Moottorin osat', 20, 18.90, 'Diesel-polttoainesuodatin, soveltuu useille merkeille'],
    ['Etujousitus iskunkuivatin Monroe G8071', 'Alusta & Ohjaus', 12, 49.90, 'Kaasutäytteinen iskunkuivatin, etupyörät'],
    ['Kallistuksenvakaajanpultti Lemförder 21735', 'Alusta & Ohjaus', 30, 12.50, 'Etuakselin kallistuksenvakaajanpultti, pari'],
    ['Raidetangon pää TRW JTE388', 'Alusta & Ohjaus', 18, 22.90, 'Raidetangon pää, oikea/vasen, useille merkeille'],
    ['Etujarrupala Brembo P23080', 'Jarrut', 25, 34.90, 'Etujarrupalat, sopii Ford Focus ja C-Max -malleihin'],
    ['Jarrulevyt Zimmermann 400.3685.20', 'Jarrut', 10, 58.50, 'Takajarrulevyt, pari, ventiloidut'],
    ['Jarrusatula ATE 24.3523-2203.5', 'Jarrut', 6, 89.90, 'Takajarrusatula vasemmalle, kunnostettu'],
    ['Sytytystulppa NGK BKR6E (4kpl)', 'Sähköjärjestelmä', 50, 16.90, 'Standardisytytystulpat, 4 kappaletta, useille bensiinimoottoreille'],
    ['Akku Varta Silver 74Ah 750A', 'Sähköjärjestelmä', 8, 119.00, '12V ajoneuvon käynnistysakku, 74Ah'],
    ['Generaattori Valeo 437319', 'Sähköjärjestelmä', 4, 169.00, 'Kunnostettu generaattori 90A, sopii Peugeot ja Citroën -malleihin'],
    ['Jäähdyttimen nestepumppu Hepu P403', 'Jäähdytysjärjestelmä', 14, 42.90, 'Jäähdytysnesteen pumppu, useille VAG-ryhmän autoille'],
    ['Jäähdytinneste G12 Plus 5L', 'Jäähdytysjärjestelmä', 40, 19.90, 'Pitkäkestoinen jäähdytinneste, punainen, -40°C'],
    ['Termostaatti Wahler 4222.92D', 'Jäähdytysjärjestelmä', 22, 28.50, 'Moottorin termostaatti tiivisteellä, 92°C'],
    ['Pakosarjan tiiviste Elring 914.791', 'Pakoputkisto', 16, 24.90, 'Pakosarjan tiivistesarja, soveltuu useille diesel-moottoreille'],
    ['Katalysaattori BM Catalysts BM91740H', 'Pakoputkisto', 5, 189.00, 'Kolmisuuntakatalysaattori, euro 4, universaali asennusnippu'],
    ['Kytkinlevysarja Valeo 826713', 'Voimansiirto', 7, 149.00, 'Kytkinlevysarja kolmiosainen: kytkinlevy, painelevy ja laakeri'],
    ['Vetoakselin suojakumisarja GSP 780049S', 'Voimansiirto', 24, 19.90, 'Vetoakselin suojakumikorjaussarja, sisempi, eri merkkeihin'],
    ['Vaihteisto-öljy Castrol MTX 75W-80 1L', 'Voiteluaineet', 55, 14.50, 'Täyssynteettinen vaihteisto-öljy manuaalivaihteistoon'],
  ];
  const insertMany = db.transaction((items) => {
    for (const item of items) insert.run(...item);
  });
  insertMany(products);
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// GET all products
app.get('/api/products', (req, res) => {
  const { search, category } = req.query;
  let query = 'SELECT * FROM products';
  const params = [];
  const conditions = [];
  if (search) {
    conditions.push("(name LIKE ? OR description LIKE ?)");
    params.push(`%${search}%`, `%${search}%`);
  }
  if (category) {
    conditions.push("category = ?");
    params.push(category);
  }
  if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
  query += ' ORDER BY name ASC';
  const products = db.prepare(query).all(...params);
  res.json(products);
});

// GET categories
app.get('/api/categories', (req, res) => {
  const rows = db.prepare('SELECT DISTINCT category FROM products ORDER BY category ASC').all();
  res.json(rows.map(r => r.category));
});

// POST add product
app.post('/api/products', (req, res) => {
  const { name, category, quantity, price, description } = req.body;
  if (!name || !category || quantity == null || price == null) {
    return res.status(400).json({ error: 'name, category, quantity, and price are required' });
  }
  const result = db.prepare(
    'INSERT INTO products (name, category, quantity, price, description) VALUES (?, ?, ?, ?, ?)'
  ).run(name, category, parseInt(quantity), parseFloat(price), description || '');
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(product);
});

// PATCH update quantity
app.patch('/api/products/:id/quantity', (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  if (quantity == null || isNaN(quantity) || parseInt(quantity) < 0) {
    return res.status(400).json({ error: 'Valid quantity >= 0 is required' });
  }
  const result = db.prepare('UPDATE products SET quantity = ? WHERE id = ?').run(parseInt(quantity), id);
  if (result.changes === 0) return res.status(404).json({ error: 'Product not found' });
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
  res.json(product);
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const result = db.prepare('DELETE FROM products WHERE id = ?').run(id);
  if (result.changes === 0) return res.status(404).json({ error: 'Product not found' });
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Inventory app running at http://localhost:${PORT}`);
});
