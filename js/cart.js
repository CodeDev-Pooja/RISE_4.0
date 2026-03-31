// =============================================
// SmartMeal Cart Logic
// =============================================

function addToCart(productId, quantity = 1) {
  const product = getAllProducts().find(p => p.id == productId);
  if (!product) { showToast('Product not found', 'error'); return; }

  let cart = getCart();
  const existing = cart.find(item => item.id == productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category, quantity });
  }
  saveCart(cart);
  updateCartBadge();
  showToast(`🛒 ${product.name} added!`);
}

function removeFromCart(productId) {
  saveCart(getCart().filter(item => item.id != productId));
  updateCartBadge();
  renderCart();
  showToast('Item removed', 'info');
}

function updateQuantity(productId, newQty) {
  if (newQty < 1) { removeFromCart(productId); return; }
  let cart = getCart();
  const item = cart.find(i => i.id == productId);
  if (item) { item.quantity = newQty; saveCart(cart); renderCart(); updateCartBadge(); }
}

function getCartTotal() {
  return getCart().reduce((t, i) => t + i.price * i.quantity, 0);
}

function getCartCount() {
  return getCart().reduce((t, i) => t + i.quantity, 0);
}

function updateCartBadge() {
  const count = getCartCount();
  document.querySelectorAll('.cart-count-badge').forEach(el => {
    el.textContent = count;
    el.classList.toggle('show', count > 0);
  });
  // legacy support
  const old = document.getElementById('cartCount');
  if (old) { old.textContent = count; old.style.display = count > 0 ? 'flex' : 'none'; }
}

function renderCart() {
  const container = document.getElementById('cartItems');
  if (!container) return;

  const cart = getCart();
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon"><i class="fas fa-shopping-basket"></i></div>
        <h5 style="font-weight:700;color:var(--text-dark);margin-bottom:8px;">Your cart is empty</h5>
        <p style="color:var(--text-light);font-size:0.9rem;margin-bottom:24px;">Add some delicious meals to get started!</p>
        <a href="menu.html" class="btn-add-cart" style="text-decoration:none;display:inline-flex;">
          <i class="fas fa-utensils"></i> Browse Menu
        </a>
      </div>`;
    updateSummary();
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-cat">${item.category || ''}</div>
        <div style="font-size:0.82rem;color:var(--text-light);margin-top:3px;">${formatCurrency(item.price)} each</div>
      </div>
      <div class="qty-control">
        <button class="qty-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})"><i class="fas fa-minus"></i></button>
        <span class="qty-display">${item.quantity}</span>
        <button class="qty-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})"><i class="fas fa-plus"></i></button>
      </div>
      <div class="cart-item-price">${formatCurrency(item.price * item.quantity)}</div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" title="Remove"><i class="fas fa-times"></i></button>
    </div>`).join('');

  updateSummary();
}

function updateSummary() {
  const cart = getCart();
  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 25 ? 0 : 4.99;
  const discount = parseFloat(sessionStorage.getItem('sm_discount') || '0');
  const total = Math.max(0, subtotal + deliveryFee - discount);

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('subtotal', formatCurrency(subtotal));
  set('deliveryFee', deliveryFee === 0 ? 'FREE 🎉' : formatCurrency(deliveryFee));
  set('total', formatCurrency(total));
  set('discountRow', discount > 0 ? `-${formatCurrency(discount)}` : '');

  const discountSection = document.getElementById('discountSection');
  if (discountSection) discountSection.style.display = discount > 0 ? 'flex' : 'none';

  // Checkout page order summary
  const orderSummary = document.getElementById('orderSummary');
  if (orderSummary) {
    orderSummary.innerHTML = `
      ${cart.map(i => `
        <div class="summary-row">
          <span>${i.name} × ${i.quantity}</span>
          <span>${formatCurrency(i.price * i.quantity)}</span>
        </div>`).join('')}
      <div class="summary-row">
        <span>Delivery</span>
        <span>${deliveryFee === 0 ? '<span style="color:var(--success);font-weight:600;">FREE</span>' : formatCurrency(deliveryFee)}</span>
      </div>
      ${discount > 0 ? `<div class="summary-row" style="color:var(--success)"><span>Discount</span><span>-${formatCurrency(discount)}</span></div>` : ''}
      <div class="summary-row total">
        <span>Total</span>
        <span>${formatCurrency(total)}</span>
      </div>`;
  }
}

function applyPromoCode() {
  const input = document.getElementById('promoInput');
  const code = input?.value.trim().toUpperCase();
  const codes = { 'SMART15': 0.15, 'VEGAN10': 0.10, 'WELCOME20': 0.20 };
  if (codes[code]) {
    const discount = getCartTotal() * codes[code];
    sessionStorage.setItem('sm_discount', discount.toFixed(2));
    showToast(`✅ Code "${code}" applied! ${Math.round(codes[code]*100)}% off.`, 'success');
    input.value = '';
    updateSummary();
  } else {
    showToast('Invalid promo code', 'error');
  }
}

function clearCart() {
  localStorage.removeItem('smartmeal_cart');
  sessionStorage.removeItem('sm_discount');
  updateCartBadge();
  if (document.getElementById('cartItems')) renderCart();
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  if (document.getElementById('cartItems')) renderCart();

  // Checkout btn
  document.getElementById('checkoutBtn')?.addEventListener('click', () => {
    if (getCart().length === 0) { showToast('Your cart is empty', 'error'); return; }
    window.location.href = 'checkout.html';
  });

  // Checkout form
  document.getElementById('checkoutForm')?.addEventListener('submit', e => {
    e.preventDefault();
    if (!isUserLoggedIn()) { showToast('Please login to place an order', 'error'); setTimeout(() => window.location.href = 'login.html', 1500); return; }
    if (getCart().length === 0) { showToast('Your cart is empty', 'error'); return; }

    const user = isUserLoggedIn();
    const address = document.getElementById('address')?.value;
    const city = document.getElementById('city')?.value;
    const zip = document.getElementById('zip')?.value;
    const phone = document.getElementById('phone')?.value;
    const payment = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'Cash on Delivery';

    const order = {
      id: generateId(),
      userId: user.id,
      userName: user.fullname,
      items: getCart(),
      subtotal: getCartTotal(),
      deliveryFee: getCartTotal() > 25 ? 0 : 4.99,
      discount: parseFloat(sessionStorage.getItem('sm_discount') || '0'),
      total: getCartTotal() + (getCartTotal() > 25 ? 0 : 4.99) - parseFloat(sessionStorage.getItem('sm_discount') || '0'),
      address: `${address}, ${city} ${zip}`,
      phone, paymentMethod: payment,
      status: 'pending',
      createdAt: getCurrentDateTime()
    };

    const orders = getAllOrders();
    orders.push(order);
    localStorage.setItem('smartmeal_orders', JSON.stringify(orders));
    clearCart();

    // Show success
    document.getElementById('checkoutForm').closest('.checkout-form-card').innerHTML = `
      <div class="text-center py-5">
        <div style="width:80px;height:80px;background:rgba(6,214,160,0.12);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:2rem;color:var(--success);">
          <i class="fas fa-check-circle"></i>
        </div>
        <h4 style="font-family:var(--font-display);font-weight:700;color:var(--text-dark);margin-bottom:8px;">Order Placed!</h4>
        <p style="color:var(--text-light);font-size:0.9rem;">Order ID: <strong style="color:var(--primary)">#${order.id.toUpperCase().slice(0,8)}</strong></p>
        <p style="color:var(--text-mid);font-size:0.88rem;margin-bottom:24px;">Estimated delivery: 25–35 minutes</p>
        <a href="dashboard.html" class="btn-checkout" style="max-width:220px;margin:0 auto;text-decoration:none;">View My Orders</a>
      </div>`;
  });
});
