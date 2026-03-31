// =============================================
// SmartMeal Auth Logic
// =============================================

function initializeAdmin() {
  const users = getAllUsers();
  if (!users.some(u => u.email === 'admin@smartmeal.com')) {
    users.push({
      id: generateId(), fullname: 'Administrator', email: 'admin@smartmeal.com',
      password: 'admin123', phone: '0000000000', dietaryPreference: 'None',
      role: 'admin', createdAt: getCurrentDateTime()
    });
    localStorage.setItem('smartmeal_users', JSON.stringify(users));
  }
  // Add demo user
  if (!users.some(u => u.email === 'user@smartmeal.com')) {
    users.push({
      id: generateId(), fullname: 'Demo User', email: 'user@smartmeal.com',
      password: 'password123', phone: '9876543210', dietaryPreference: 'Healthy',
      role: 'user', createdAt: getCurrentDateTime()
    });
    localStorage.setItem('smartmeal_users', JSON.stringify(users));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initializeAdmin();

  // Login
  document.getElementById('loginForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember')?.checked;

    const user = getAllUsers().find(u => u.email === email && u.password === password && u.role !== 'admin');
    if (user) {
      localStorage.setItem('smartmeal_user', JSON.stringify({ id: user.id, fullname: user.fullname, email: user.email, phone: user.phone, dietaryPreference: user.dietaryPreference }));
      if (remember) localStorage.setItem('smartmeal_remember', email);
      showToast('🎉 Welcome back, ' + user.fullname.split(' ')[0] + '!');
      setTimeout(() => window.location.href = 'dashboard.html', 1000);
    } else {
      // Check admin
      const admin = getAllUsers().find(u => u.email === email && u.password === password && u.role === 'admin');
      if (admin) {
        localStorage.setItem('smartmeal_admin', 'true');
        showToast('Redirecting to admin panel...');
        setTimeout(() => window.location.href = 'admin/dashboard.html', 900);
      } else {
        showToast('Invalid email or password', 'error');
        document.getElementById('password').value = '';
      }
    }
  });

  // Auto-fill remembered email
  const remembered = localStorage.getItem('smartmeal_remember');
  if (remembered) {
    const emailEl = document.getElementById('email');
    if (emailEl) { emailEl.value = remembered; document.getElementById('remember').checked = true; }
  }

  // Register
  document.getElementById('registerForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const dietaryPreference = document.getElementById('dietaryPreference').value;

    if (!validateEmail(email)) { showToast('Please enter a valid email', 'error'); return; }
    if (password.length < 6) { showToast('Password must be at least 6 characters', 'error'); return; }
    if (password !== confirmPassword) { showToast('Passwords do not match', 'error'); return; }
    if (!document.getElementById('terms').checked) { showToast('Please accept the Terms of Service', 'error'); return; }

    const users = getAllUsers();
    if (users.find(u => u.email === email)) { showToast('Email already registered. Please login.', 'error'); return; }

    const newUser = { id: generateId(), fullname, email, phone, password, dietaryPreference, role: 'user', createdAt: getCurrentDateTime() };
    users.push(newUser);
    localStorage.setItem('smartmeal_users', JSON.stringify(users));
    showToast('🎉 Account created! Redirecting to login...');
    setTimeout(() => window.location.href = 'login.html', 1400);
  });
});
