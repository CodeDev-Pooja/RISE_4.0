// =============================================
// SmartMeal Admin Logic
// =============================================

function adminLogout() {
  localStorage.removeItem('smartmeal_admin');
  window.location.href = 'login.html';
}

function renderAdminStats() {
  const products = getAllProducts();
  const orders = getAllOrders();
  const users = getAllUsers().filter(u => u.role !== 'admin');
  const revenue = orders.reduce((s, o) => s + (o.total || 0), 0);

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('totalProducts', products.length);
  set('totalOrders', orders.length);
  set('totalUsers', users.length);
  set('totalRevenue', new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(revenue));
}

function renderProductsTable() {
  const products = getAllProducts();
  const container = document.getElementById('productsTable');
  if (!container) return;

  if (products.length === 0) {
    container.innerHTML = '<p style="color:var(--text-light);text-align:center;padding:30px;">No products found.</p>';
    return;
  }

  container.innerHTML = `
    <table class="admin-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Category</th>
          <th>Price</th>
          <th>Calories</th>
          <th>Rating</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${products.map(p => `
          <tr>
            <td>
              <div style="display:flex;align-items:center;gap:10px;">
                <img src="${p.image}" style="width:40px;height:40px;border-radius:8px;object-fit:cover;flex-shrink:0;">
                <div>
                  <div style="font-weight:600;font-size:0.88rem;">${p.name}</div>
                  <div style="font-size:0.75rem;color:var(--text-light);max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${p.description}</div>
                </div>
              </div>
            </td>
            <td><span style="background:var(--primary-light);color:var(--primary);padding:3px 10px;border-radius:99px;font-size:0.75rem;font-weight:600;">${p.category}</span></td>
            <td style="font-weight:700;">$${p.price.toFixed(2)}</td>
            <td>${p.calories} kcal</td>
            <td>⭐ ${p.rating} <span style="color:var(--text-light);font-size:0.75rem;">(${p.reviews})</span></td>
            <td>
              <div style="display:flex;gap:6px;">
                <button class="btn-admin-sm btn-edit" onclick="editProduct('${p.id}')"><i class="fas fa-edit"></i> Edit</button>
                <button class="btn-admin-sm btn-delete" onclick="deleteProduct('${p.id}')"><i class="fas fa-trash"></i> Del</button>
              </div>
            </td>
          </tr>`).join('')}
      </tbody>
    </table>`;
}

function renderOrdersTable() {
  const orders = getAllOrders().reverse();
  const container = document.getElementById('ordersTable');
  if (!container) return;

  if (orders.length === 0) {
    container.innerHTML = '<p style="color:var(--text-light);text-align:center;padding:30px;">No orders yet.</p>';
    return;
  }

  const statusColors = { pending: '#FFD166', processing: '#118AB2', delivered: '#06D6A0', cancelled: '#EF476F' };

  container.innerHTML = `
    <table class="admin-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Items</th>
          <th>Total</th>
          <th>Payment</th>
          <th>Status</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${orders.map(o => `
          <tr>
            <td style="font-family:monospace;font-weight:600;color:var(--primary);font-size:0.82rem;">#${o.id.toUpperCase().slice(0,8)}</td>
            <td>
              <div style="font-weight:600;font-size:0.85rem;">${o.userName}</div>
              <div style="font-size:0.75rem;color:var(--text-light);">${o.address?.substring(0,30)}...</div>
            </td>
            <td style="font-size:0.82rem;color:var(--text-mid);">${o.items?.length || 0} item(s)</td>
            <td style="font-weight:700;">$${(o.total || 0).toFixed(2)}</td>
            <td style="font-size:0.82rem;">${o.paymentMethod}</td>
            <td>
              <select class="filter-select" style="padding:4px 8px;font-size:0.75rem;border-radius:6px;" onchange="updateOrderStatus('${o.id}', this.value)">
                ${['pending','processing','delivered','cancelled'].map(s => `<option value="${s}" ${o.status===s?'selected':''}>${s.charAt(0).toUpperCase()+s.slice(1)}</option>`).join('')}
              </select>
            </td>
            <td style="font-size:0.78rem;color:var(--text-light);">${new Date(o.createdAt).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</td>
            <td>
              <button class="btn-admin-sm btn-delete" onclick="deleteOrder('${o.id}')"><i class="fas fa-trash"></i></button>
            </td>
          </tr>`).join('')}
      </tbody>
    </table>`;
}

function editProduct(productId) {
  const products = getAllProducts();
  const p = products.find(pr => pr.id === productId);
  if (!p) return;

  document.getElementById('productId').value = p.id;
  document.getElementById('productName').value = p.name;
  document.getElementById('productPrice').value = p.price;
  document.getElementById('productCategory').value = p.category;
  document.getElementById('productImage').value = p.image;
  document.getElementById('productDescription').value = p.description;
  document.getElementById('productCalories').value = p.calories || '';
  document.getElementById('productProtein').value = p.protein || '';
  document.getElementById('productModalTitle').textContent = 'Edit Product';

  const modal = new bootstrap.Modal(document.getElementById('productModal'));
  modal.show();
}

function resetProductForm() {
  document.getElementById('productId').value = '';
  document.getElementById('productForm').reset();
  document.getElementById('productModalTitle').textContent = 'Add Product';
}

function saveProduct() {
  const id = document.getElementById('productId').value;
  const name = document.getElementById('productName').value.trim();
  const price = parseFloat(document.getElementById('productPrice').value);
  const category = document.getElementById('productCategory').value;
  const image = document.getElementById('productImage').value.trim() || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400';
  const description = document.getElementById('productDescription').value.trim();
  const calories = parseInt(document.getElementById('productCalories').value) || 350;
  const protein = parseInt(document.getElementById('productProtein').value) || 15;

  if (!name || !price || !category) {
    showToast('Please fill in all required fields', 'error');
    return;
  }

  let products = getAllProducts();
  if (id) {
    const idx = products.findIndex(p => p.id === id);
    if (idx > -1) {
      products[idx] = { ...products[idx], name, price, category, image, description, calories, protein };
      showToast('Product updated!');
    }
  } else {
    products.push({
      id: generateId(), name, price, category, image, description,
      calories, protein, carbs: 30, fat: 10, rating: 4.5, reviews: 0, prepTime: 20, badge: null
    });
    showToast('Product added!');
  }

  localStorage.setItem('smartmeal_products', JSON.stringify(products));
  bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
  renderProductsTable();
  renderAdminStats();
}

function deleteProduct(productId) {
  if (!confirm('Delete this product?')) return;
  const products = getAllProducts().filter(p => p.id !== productId);
  localStorage.setItem('smartmeal_products', JSON.stringify(products));
  renderProductsTable();
  renderAdminStats();
  showToast('Product deleted', 'info');
}

function deleteOrder(orderId) {
  if (!confirm('Delete this order?')) return;
  const orders = getAllOrders().filter(o => o.id !== orderId);
  localStorage.setItem('smartmeal_orders', JSON.stringify(orders));
  renderOrdersTable();
  renderAdminStats();
  showToast('Order deleted', 'info');
}

function updateOrderStatus(orderId, newStatus) {
  const orders = getAllOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    localStorage.setItem('smartmeal_orders', JSON.stringify(orders));
    showToast(`Order status updated to "${newStatus}"`);
  }
}

function showAdminSection(section) {
  document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none');
  document.getElementById(section + 'Section').style.display = 'block';
  document.querySelectorAll('.admin-nav-item').forEach(n => n.classList.remove('active'));
  document.querySelector(`[data-section="${section}"]`)?.classList.add('active');

  if (section === 'products') renderProductsTable();
  if (section === 'orders') renderOrdersTable();
  if (section === 'dashboard') renderAdminStats();
}

function renderUsersTable() {
  const users = getAllUsers().filter(u => u.role !== 'admin');
  const container = document.getElementById('usersTable');
  if (!container) return;

  if (users.length === 0) {
    container.innerHTML = '<p style="color:var(--text-light);text-align:center;padding:30px;">No users registered yet.</p>';
    return;
  }

  container.innerHTML = `
    <table class="admin-table">
      <thead>
        <tr><th>Name</th><th>Email</th><th>Phone</th><th>Diet Pref</th><th>Joined</th><th>Orders</th></tr>
      </thead>
      <tbody>
        ${users.map(u => {
          const orders = getAllOrders().filter(o => o.userId === u.id);
          return `
            <tr>
              <td style="font-weight:600;">${u.fullname}</td>
              <td>${u.email}</td>
              <td>${u.phone || '—'}</td>
              <td><span style="background:var(--primary-light);color:var(--primary);padding:2px 8px;border-radius:99px;font-size:0.75rem;">${u.dietaryPreference || 'None'}</span></td>
              <td style="font-size:0.8rem;color:var(--text-light);">${new Date(u.createdAt).toLocaleDateString()}</td>
              <td style="font-weight:700;">${orders.length}</td>
            </tr>`;
        }).join('')}
      </tbody>
    </table>`;
}

document.addEventListener('DOMContentLoaded', () => {
  if (!isAdminLoggedIn()) { window.location.href = 'login.html'; return; }
  renderAdminStats();
  initializeAdmin();
});
