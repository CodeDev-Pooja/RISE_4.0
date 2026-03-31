// =============================================
// SmartMeal Utility Functions
// =============================================

function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle', warning: 'fa-exclamation-triangle' };
  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon"><i class="fas ${icons[type] || icons.success}"></i></div>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

function showLoading(msg = '') {
  if (document.getElementById('loading-spinner')) return;
  const el = document.createElement('div');
  el.id = 'loading-spinner';
  el.className = 'spinner-overlay';
  el.innerHTML = `<div class="spinner-ring"></div>${msg ? `<p style="color:var(--text-mid);font-size:0.9rem;font-weight:500;">${msg}</p>` : ''}`;
  document.body.appendChild(el);
}

function hideLoading() {
  document.getElementById('loading-spinner')?.remove();
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(amount);
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function getCurrentDateTime() {
  return new Date().toISOString();
}

function debounce(fn, wait) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone);
}

function isUserLoggedIn() {
  const u = localStorage.getItem('smartmeal_user');
  return u ? JSON.parse(u) : null;
}

function isAdminLoggedIn() {
  return localStorage.getItem('smartmeal_admin') === 'true';
}

function requireAuth() {
  if (!isUserLoggedIn()) { window.location.href = 'login.html'; return false; }
  return true;
}

function requireAdmin() {
  if (!isAdminLoggedIn()) { window.location.href = '../admin/login.html'; return false; }
  return true;
}

window.logout = function() {
  localStorage.removeItem('smartmeal_user');
  showToast('Logged out successfully', 'info');
  setTimeout(() => window.location.href = 'index.html', 900);
};

// Star renderer
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  let stars = '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half);
  return `<span class="stars">${stars}</span>`;
}

// Badge color map
function getCategoryColor(cat) {
  const map = { 'Vegan': '#06D6A0', 'High Protein': '#EF476F', 'Keto': '#118AB2', 'Healthy': '#FF6B35', 'Low Calorie': '#9B5DE5' };
  return map[cat] || '#888';
}

// Product card builder (shared across pages)
function buildProductCard(p) {
  const inWish = typeof isInWishlist === 'function' ? isInWishlist(p.id) : false;
  const badgeHTML = p.badge ? `<div class="product-badge">${p.badge}</div>` : '';
  return `
    <div class="col-sm-6 col-lg-4">
      <div class="product-card" id="pcard-${p.id}">
        <div class="product-img-wrap">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          ${badgeHTML}
          <button class="product-wishlist ${inWish ? 'liked' : ''}" onclick="handleWishlist('${p.id}', this)" title="Wishlist">
            <i class="fa${inWish ? 's' : 'r'} fa-heart"></i>
          </button>
        </div>
        <div class="product-body">
          <div class="product-category-tag">${p.category}</div>
          <h5 class="product-name">${p.name}</h5>
          <p class="product-desc">${p.description}</p>
          <div class="product-rating">
            ${renderStars(p.rating)}
            <span class="rating-count">(${p.reviews})</span>
          </div>
          <div class="product-meta">
            <span class="meta-item"><i class="fas fa-fire"></i> ${p.calories} kcal</span>
            <span class="meta-item"><i class="fas fa-dumbbell"></i> ${p.protein}g protein</span>
            <span class="meta-item"><i class="fas fa-clock"></i> ${p.prepTime}m</span>
          </div>
          <div class="product-footer">
            <span class="product-price">${formatCurrency(p.price)}</span>
            <button class="btn-add-cart" onclick="addToCart('${p.id}', 1)">
              <i class="fas fa-cart-plus"></i> Add
            </button>
          </div>
        </div>
      </div>
    </div>`;
}

function handleWishlist(productId, btn) {
  const isNowLiked = toggleWishlist(productId);
  btn.classList.toggle('liked', isNowLiked);
  btn.innerHTML = `<i class="fa${isNowLiked ? 's' : 'r'} fa-heart"></i>`;
}
