/* ---- i18n ---- */
let currentLang = 'fi';

const TRANSLATIONS = {
  fi: {
    addProduct: '+ Lisää tuote',
    searchPlaceholder: 'Hae varaosaa...',
    allCategories: 'Kaikki kategoriat',
    statsText: (n) => `${n} tuote${n !== 1 ? 'tta' : ''}`,
    emptyState: 'Tuotteita ei löytynyt',
    modalAddTitle: 'Lisää uusi tuote',
    labelName: 'Tuotteen nimi *',
    labelCategory: 'Kategoria *',
    labelQuantity: 'Kappalemäärä *',
    labelPrice: 'Hinta (€) *',
    labelDescription: 'Kuvaus',
    placeholderName: 'esim. Öljynsuodatin Bosch',
    placeholderCategory: 'esim. Moottorin osat',
    placeholderDescription: 'Valinnainen kuvaus tuotteesta...',
    btnCancel: 'Peruuta',
    btnAddProduct: 'Lisää tuote',
    modalDeleteTitle: 'Poista tuote',
    deleteMessage: (name) => `Haluatko varmasti poistaa tuotteen <strong>${name}</strong>? Toimintoa ei voi peruuttaa.`,
    btnDelete: 'Poista',
    toastAdded: (name) => `"${name}" lisätty varastoon!`,
    toastDeleted: (name) => `"${name}" poistettu.`,
    deleteAriaLabel: 'Poista tuote',
    decAriaLabel: 'Vähennä määrää',
    incAriaLabel: 'Lisää määrää',
  },
  sv: {
    addProduct: '+ Lägg till produkt',
    searchPlaceholder: 'Sök reservdel...',
    allCategories: 'Alla kategorier',
    statsText: (n) => `${n} produkt${n !== 1 ? 'er' : ''}`,
    emptyState: 'Inga produkter hittades',
    modalAddTitle: 'Lägg till ny produkt',
    labelName: 'Produktnamn *',
    labelCategory: 'Kategori *',
    labelQuantity: 'Antal *',
    labelPrice: 'Pris (€) *',
    labelDescription: 'Beskrivning',
    placeholderName: 't.ex. Oljefilter Bosch',
    placeholderCategory: 't.ex. Motordelar',
    placeholderDescription: 'Valfri produktbeskrivning...',
    btnCancel: 'Avbryt',
    btnAddProduct: 'Lägg till produkt',
    modalDeleteTitle: 'Ta bort produkt',
    deleteMessage: (name) => `Vill du verkligen ta bort produkten <strong>${name}</strong>? Åtgärden kan inte ångras.`,
    btnDelete: 'Ta bort',
    toastAdded: (name) => `"${name}" lagd till i lagret!`,
    toastDeleted: (name) => `"${name}" borttagen.`,
    deleteAriaLabel: 'Ta bort produkt',
    decAriaLabel: 'Minska antal',
    incAriaLabel: 'Öka antal',
  },
  zh: {
    addProduct: '+ 添加产品',
    searchPlaceholder: '搜索零件...',
    allCategories: '所有类别',
    statsText: (n) => `${n} 件产品`,
    emptyState: '未找到产品',
    modalAddTitle: '添加新产品',
    labelName: '产品名称 *',
    labelCategory: '类别 *',
    labelQuantity: '数量 *',
    labelPrice: '价格 (€) *',
    labelDescription: '描述',
    placeholderName: '例如 机油滤清器 Bosch',
    placeholderCategory: '例如 发动机零件',
    placeholderDescription: '可选产品描述...',
    btnCancel: '取消',
    btnAddProduct: '添加产品',
    modalDeleteTitle: '删除产品',
    deleteMessage: (name) => `确定要删除产品 <strong>${name}</strong>？此操作无法撤销。`,
    btnDelete: '删除',
    toastAdded: (name) => `"${name}" 已添加到库存！`,
    toastDeleted: (name) => `"${name}" 已删除。`,
    deleteAriaLabel: '删除产品',
    decAriaLabel: '减少数量',
    incAriaLabel: '增加数量',
  },
};

const CATEGORY_TRANSLATIONS = {
  sv: {
    'Moottorin osat': 'Motordelar',
    'Alusta & Ohjaus': 'Chassi & Styrning',
    'Jarrut': 'Bromsar',
    'Sähköjärjestelmä': 'Elsystem',
    'Jäähdytysjärjestelmä': 'Kylsystem',
    'Pakoputkisto': 'Avgassystem',
    'Voimansiirto': 'Drivlina',
    'Voiteluaineet': 'Smörjmedel',
  },
  zh: {
    'Moottorin osat': '发动机零件',
    'Alusta & Ohjaus': '底盘与转向',
    'Jarrut': '制动系统',
    'Sähköjärjestelmä': '电气系统',
    'Jäähdytysjärjestelmä': '冷却系统',
    'Pakoputkisto': '排气系统',
    'Voimansiirto': '传动系统',
    'Voiteluaineet': '润滑油',
  },
};

const DESC_TRANSLATIONS = {
  sv: {
    'Öljynsuodatin sopii useille VW, Audi ja Seat -malleille': 'Oljefilter passar flera VW, Audi och Seat-modeller',
    'Korkealaatuinen ilmansuodatin, parantaa moottorin suorituskykyä': 'Högkvalitativt luftfilter, förbättrar motorprestanda',
    'Diesel-polttoainesuodatin, soveltuu useille merkeille': 'Dieselbränslefilter, passar flera märken',
    'Kaasutäytteinen iskunkuivatin, etupyörät': 'Gasfjäderdämpare, framhjul',
    'Etuakselin kallistuksenvakaajanpultti, pari': 'Krängningshämmarstag framaxel, par',
    'Raidetangon pää, oikea/vasen, useille merkeille': 'Styrstagsände, höger/vänster, för flera märken',
    'Etujarrupalat, sopii Ford Focus ja C-Max -malleihin': 'Bromsbelägg fram, passar Ford Focus och C-Max',
    'Takajarrulevyt, pari, ventiloidut': 'Bakbromsskivor, par, ventilerade',
    'Takajarrusatula vasemmalle, kunnostettu': 'Bakbromsok vänster, renoverat',
    'Standardisytytystulpat, 4 kappaletta, useille bensiinimoottoreille': 'Standardtändstift, 4 stycken, för flera bensinmotorer',
    '12V ajoneuvon käynnistysakku, 74Ah': '12V startbatteri för fordon, 74Ah',
    'Kunnostettu generaattori 90A, sopii Peugeot ja Citroën -malleihin': 'Renoverad generator 90A, passar Peugeot och Citroën',
    'Jäähdytysnesteen pumppu, useille VAG-ryhmän autoille': 'Kylvätskepump, för flera VAG-gruppens bilar',
    'Pitkäkestoinen jäähdytinneste, punainen, -40°C': 'Långverkande kylarvätska, röd, -40°C',
    'Moottorin termostaatti tiivisteellä, 92°C': 'Motortermostaten med packning, 92°C',
    'Pakosarjan tiivistesarja, soveltuu useille diesel-moottoreille': 'Grenrörspackning, passar flera dieselmotorer',
    'Kolmisuuntakatalysaattori, euro 4, universaali asennusnippu': 'Trevägskatalysator, euro 4, universell monteringssats',
    'Kytkinlevysarja kolmiosainen: kytkinlevy, painelevy ja laakeri': 'Kopplingsats i tre delar: koppling, trycklager och lager',
    'Vetoakselin suojakumikorjaussarja, sisempi, eri merkkeihin': 'Drivaxelreparationssats, inre, för olika märken',
    'Täyssynteettinen vaihteisto-öljy manuaalivaihteistoon': 'Helsyntetisk växellådsolja för manuell växellåda',
  },
  zh: {
    'Öljynsuodatin sopii useille VW, Audi ja Seat -malleille': '适用于多款大众、奥迪和西亚特车型的机油滤清器',
    'Korkealaatuinen ilmansuodatin, parantaa moottorin suorituskykyä': '高品质空气滤清器，提升发动机性能',
    'Diesel-polttoainesuodatin, soveltuu useille merkeille': '柴油燃油滤清器，适用于多个品牌',
    'Kaasutäytteinen iskunkuivatin, etupyörät': '气体减震器，前轮',
    'Etuakselin kallistuksenvakaajanpultti, pari': '前桥稳定杆连杆，一对',
    'Raidetangon pää, oikea/vasen, useille merkeille': '转向横拉杆端，左/右，适用于多个品牌',
    'Etujarrupalat, sopii Ford Focus ja C-Max -malleihin': '前刹车片，适用于福特福克斯和C-Max',
    'Takajarrulevyt, pari, ventiloidut': '后刹车盘，一对，通风式',
    'Takajarrusatula vasemmalle, kunnostettu': '左后制动卡钳，翻新品',
    'Standardisytytystulpat, 4 kappaletta, useille bensiinimoottoreille': '标准火花塞，4只装，适用于多款汽油发动机',
    '12V ajoneuvon käynnistysakku, 74Ah': '12V汽车启动蓄电池，74安时',
    'Kunnostettu generaattori 90A, sopii Peugeot ja Citroën -malleihin': '翻新发电机90A，适用于标致和雪铁龙',
    'Jäähdytysnesteen pumppu, useille VAG-ryhmän autoille': '冷却液水泵，适用于多款大众集团车型',
    'Pitkäkestoinen jäähdytinneste, punainen, -40°C': '长效防冻液，红色，-40°C',
    'Moottorin termostaatti tiivisteellä, 92°C': '带垫片的发动机节温器，92°C',
    'Pakosarjan tiivistesarja, soveltuu useille diesel-moottoreille': '排气歧管垫片，适用于多款柴油发动机',
    'Kolmisuuntakatalysaattori, euro 4, universaali asennusnippu': '三元催化转化器，欧4排放标准，通用安装套件',
    'Kytkinlevysarja kolmiosainen: kytkinlevy, painelevy ja laakeri': '三件套离合器套件：离合器片、压盘和轴承',
    'Vetoakselin suojakumikorjaussarja, sisempi, eri merkkeihin': '驱动轴防尘套修理包，内侧，适用于多个品牌',
    'Täyssynteettinen vaihteisto-öljy manuaalivaihteistoon': '全合成手动变速箱齿轮油',
  },
};

function t(key, ...args) {
  const lang = TRANSLATIONS[currentLang] || TRANSLATIONS.fi;
  const val = lang[key] !== undefined ? lang[key] : TRANSLATIONS.fi[key];
  return typeof val === 'function' ? val(...args) : val;
}

function translateCategory(cat) {
  if (currentLang === 'fi') return cat;
  return (CATEGORY_TRANSLATIONS[currentLang] || {})[cat] || cat;
}

function translateDesc(desc) {
  if (currentLang === 'fi' || !desc) return desc;
  return (DESC_TRANSLATIONS[currentLang] || {})[desc] || desc;
}

function applyLanguage() {
  document.documentElement.lang = currentLang;

  document.getElementById('openAddModal').textContent = t('addProduct');
  document.getElementById('searchInput').placeholder = t('searchPlaceholder');

  const allOpt = categoryFilter.querySelector('option[value=""]');
  if (allOpt) allOpt.textContent = t('allCategories');

  // Translate category options (value stays Finnish for API queries)
  Array.from(categoryFilter.options).forEach(opt => {
    if (opt.value) opt.textContent = translateCategory(opt.value);
  });

  document.querySelector('#emptyState p').textContent = t('emptyState');

  document.querySelector('#addModal .modal-header h2').textContent = t('modalAddTitle');
  document.querySelector('label[for="prodName"]').textContent = t('labelName');
  document.querySelector('label[for="prodCategory"]').textContent = t('labelCategory');
  document.querySelector('label[for="prodQuantity"]').textContent = t('labelQuantity');
  document.querySelector('label[for="prodPrice"]').textContent = t('labelPrice');
  document.querySelector('label[for="prodDescription"]').textContent = t('labelDescription');
  document.getElementById('prodName').placeholder = t('placeholderName');
  document.getElementById('prodCategory').placeholder = t('placeholderCategory');
  document.getElementById('prodDescription').placeholder = t('placeholderDescription');
  document.getElementById('cancelAdd').textContent = t('btnCancel');
  document.querySelector('#addProductForm button[type="submit"]').textContent = t('btnAddProduct');

  document.querySelector('#deleteModal .modal-header h2').textContent = t('modalDeleteTitle');
  document.getElementById('cancelDelete').textContent = t('btnCancel');
  document.getElementById('confirmDelete').textContent = t('btnDelete');

  renderProducts();
}

/* ---- State ---- */
let products = [];
let deleteTargetId = null;

/* ---- DOM refs ---- */
const productGrid = document.getElementById('productGrid');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const statsBar = document.getElementById('statsBar');
const addModal = document.getElementById('addModal');
const deleteModal = document.getElementById('deleteModal');
const addForm = document.getElementById('addProductForm');
const toast = document.getElementById('toast');

/* ---- Helpers ---- */
function showToast(msg, type = 'success') {
  toast.textContent = msg;
  toast.className = `toast ${type}`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.add('hidden'), 3000);
}

function qtyClass(qty) {
  if (qty === 0) return 'low';
  if (qty < 5) return 'medium';
  return 'ok';
}

/* ---- API calls ---- */
async function apiFetch(url, opts = {}) {
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...opts });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Request failed (${res.status})`);
  }
  if (res.status === 204) return null;
  return res.json();
}

async function loadProducts() {
  const search = searchInput.value.trim();
  const category = categoryFilter.value;
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (category) params.set('category', category);
  products = await apiFetch(`/api/products?${params}`);
  renderProducts();
}

async function loadCategories() {
  const cats = await apiFetch('/api/categories');
  const datalist = document.getElementById('categoryList');
  categoryFilter.innerHTML = `<option value="">${t('allCategories')}</option>`;
  cats.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = translateCategory(c);
    categoryFilter.appendChild(opt);
    const dlOpt = document.createElement('option');
    dlOpt.value = c;
    datalist.appendChild(dlOpt);
  });
}

/* ---- Render ---- */
function renderProducts() {
  productGrid.innerHTML = '';
  if (products.length === 0) {
    emptyState.classList.remove('hidden');
    statsBar.textContent = '';
    return;
  }
  emptyState.classList.add('hidden');
  statsBar.textContent = t('statsText', products.length);

  products.forEach(p => {
    const desc = translateDesc(p.description);
    const category = translateCategory(p.category);
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = p.id;
    card.innerHTML = `
      <div class="card-header">
        <span class="card-title">${escHtml(p.name)}</span>
        <div class="card-actions">
          <button class="btn-icon delete" title="${t('deleteAriaLabel')}" data-id="${p.id}" data-name="${escHtml(p.name)}">🗑️</button>
        </div>
      </div>
      <span class="category-badge">${escHtml(category)}</span>
      ${desc ? `<p class="card-description">${escHtml(desc)}</p>` : ''}
      <div class="card-footer">
        <span class="card-price">€${parseFloat(p.price).toFixed(2)}</span>
        <div class="qty-control">
          <button class="qty-btn dec" data-id="${p.id}" aria-label="${t('decAriaLabel')}">−</button>
          <span class="qty-value ${qtyClass(p.quantity)}">${p.quantity}</span>
          <button class="qty-btn inc" data-id="${p.id}" aria-label="${t('incAriaLabel')}">+</button>
        </div>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ---- Event delegation ---- */
productGrid.addEventListener('click', async (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  // Delete button
  if (btn.classList.contains('delete')) {
    deleteTargetId = parseInt(btn.dataset.id);
    document.getElementById('deleteMessage').innerHTML = t('deleteMessage', escHtml(btn.dataset.name));
    deleteModal.classList.remove('hidden');
    return;
  }

  // Quantity buttons
  const id = parseInt(btn.dataset.id);
  const card = btn.closest('.product-card');
  const qtyEl = card.querySelector('.qty-value');
  let qty = parseInt(qtyEl.textContent);

  if (btn.classList.contains('inc')) qty += 1;
  if (btn.classList.contains('dec')) {
    if (qty <= 0) return;
    qty -= 1;
  }

  try {
    const updated = await apiFetch(`/api/products/${id}/quantity`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity: qty }),
    });
    qtyEl.textContent = updated.quantity;
    qtyEl.className = `qty-value ${qtyClass(updated.quantity)}`;
    // Update in local array
    const idx = products.findIndex(p => p.id === id);
    if (idx !== -1) products[idx].quantity = updated.quantity;
  } catch (err) {
    showToast(err.message, 'error');
  }
});

/* ---- Add Product ---- */
document.getElementById('openAddModal').addEventListener('click', () => {
  addForm.reset();
  addModal.classList.remove('hidden');
  document.getElementById('prodName').focus();
});
const closeAdd = () => addModal.classList.add('hidden');
document.getElementById('closeAddModal').addEventListener('click', closeAdd);
document.getElementById('cancelAdd').addEventListener('click', closeAdd);
addModal.addEventListener('click', e => { if (e.target === addModal) closeAdd(); });

addForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const body = {
    name: document.getElementById('prodName').value.trim(),
    category: document.getElementById('prodCategory').value.trim(),
    quantity: parseInt(document.getElementById('prodQuantity').value),
    price: parseFloat(document.getElementById('prodPrice').value),
    description: document.getElementById('prodDescription').value.trim(),
  };
  try {
    await apiFetch('/api/products', { method: 'POST', body: JSON.stringify(body) });
    closeAdd();
    await loadCategories();
    await loadProducts();
    showToast(t('toastAdded', body.name));
  } catch (err) {
    showToast(err.message, 'error');
  }
});

/* ---- Delete Product ---- */
const closeDelete = () => { deleteModal.classList.add('hidden'); deleteTargetId = null; };
document.getElementById('closeDeleteModal').addEventListener('click', closeDelete);
document.getElementById('cancelDelete').addEventListener('click', closeDelete);
deleteModal.addEventListener('click', e => { if (e.target === deleteModal) closeDelete(); });

document.getElementById('confirmDelete').addEventListener('click', async () => {
  if (deleteTargetId == null) return;
  const id = deleteTargetId;
  const product = products.find(p => p.id === id);
  closeDelete();
  try {
    await apiFetch(`/api/products/${id}`, { method: 'DELETE' });
    await loadProducts();
    showToast(t('toastDeleted', product?.name || ''));
  } catch (err) {
    showToast(err.message, 'error');
  }
});

/* ---- Search / Filter ---- */
let searchTimer;
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(loadProducts, 250);
});
categoryFilter.addEventListener('change', loadProducts);

/* ---- Language ---- */
document.getElementById('langSelect').addEventListener('change', async (e) => {
  currentLang = e.target.value;
  await loadCategories();
  applyLanguage();
});

/* ---- Init ---- */
(async () => {
  await loadCategories();
  await loadProducts();
})();
