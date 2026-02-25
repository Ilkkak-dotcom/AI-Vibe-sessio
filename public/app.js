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
  categoryFilter.innerHTML = '<option value="">All Categories</option>';
  cats.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = c;
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
  statsBar.textContent = `${products.length} product${products.length !== 1 ? 's' : ''}`;

  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = p.id;
    card.innerHTML = `
      <div class="card-header">
        <span class="card-title">${escHtml(p.name)}</span>
        <div class="card-actions">
          <button class="btn-icon delete" title="Delete product" data-id="${p.id}" data-name="${escHtml(p.name)}">🗑️</button>
        </div>
      </div>
      <span class="category-badge">${escHtml(p.category)}</span>
      ${p.description ? `<p class="card-description">${escHtml(p.description)}</p>` : ''}
      <div class="card-footer">
        <span class="card-price">€${parseFloat(p.price).toFixed(2)}</span>
        <div class="qty-control">
          <button class="qty-btn dec" data-id="${p.id}" aria-label="Decrease quantity">−</button>
          <span class="qty-value ${qtyClass(p.quantity)}">${p.quantity}</span>
          <button class="qty-btn inc" data-id="${p.id}" aria-label="Increase quantity">+</button>
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
    document.getElementById('deleteProductName').textContent = btn.dataset.name;
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
    showToast(`"${body.name}" added successfully!`);
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
    showToast(`"${product?.name || 'Product'}" deleted.`);
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

/* ---- Init ---- */
(async () => {
  await loadCategories();
  await loadProducts();
})();
