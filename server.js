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
    ['Laptop Pro 15"', 'Electronics', 12, 1299.99, 'High-performance 15-inch laptop with 16GB RAM'],
    ['Wireless Mouse', 'Electronics', 45, 29.99, 'Ergonomic wireless mouse with long battery life'],
    ['USB-C Hub 7-in-1', 'Electronics', 30, 49.99, 'Multi-port USB-C hub for connectivity'],
    ['Mechanical Keyboard', 'Electronics', 18, 89.99, 'Tactile mechanical keyboard with RGB backlight'],
    ['27" 4K Monitor', 'Electronics', 8, 449.99, 'Crystal-clear 4K display with HDR support'],
    ['Office Chair', 'Furniture', 5, 299.99, 'Ergonomic office chair with lumbar support'],
    ['Standing Desk', 'Furniture', 3, 599.99, 'Height-adjustable standing desk, 140x70cm'],
    ['Desk Lamp LED', 'Furniture', 22, 39.99, 'Adjustable LED desk lamp with USB charging port'],
    ['Whiteboard 90x60', 'Office Supplies', 10, 34.99, 'Magnetic whiteboard with pen tray'],
    ['Notebook A5', 'Office Supplies', 100, 4.99, 'Hardcover dotted notebook, 200 pages'],
    ['Ballpoint Pens (10pk)', 'Office Supplies', 80, 7.99, 'Smooth writing ballpoint pens, black ink'],
    ['Sticky Notes (5pk)', 'Office Supplies', 60, 5.49, 'Colorful sticky note pads, 100 sheets each'],
    ['Filing Cabinet', 'Furniture', 7, 149.99, '3-drawer steel filing cabinet with lock'],
    ['Webcam HD 1080p', 'Electronics', 25, 69.99, 'Full HD webcam with built-in microphone'],
    ['Noise-Cancelling Headphones', 'Electronics', 14, 199.99, 'Over-ear ANC headphones with 30h battery'],
    ['Portable SSD 1TB', 'Electronics', 20, 109.99, 'Fast portable SSD, USB 3.2 Gen 2'],
    ['Coffee Maker', 'Appliances', 9, 79.99, '12-cup programmable coffee maker'],
    ['Water Purifier', 'Appliances', 6, 89.99, 'Countertop water purifier with filter indicator'],
    ['First Aid Kit', 'Safety', 15, 24.99, 'Comprehensive 100-piece first aid kit'],
    ['Fire Extinguisher', 'Safety', 4, 44.99, 'Dry powder fire extinguisher, 2kg'],
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
