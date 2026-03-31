// =============================================
// SmartMeal Navbar Component
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  const placeholder = document.getElementById('navbar-placeholder');
  if (!placeholder) return;

  const user = isUserLoggedIn();
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const navLinks = [
    { href: 'index.html', label: 'Home', icon: 'fa-home' },
    { href: 'menu.html', label: 'Menu', icon: 'fa-utensils' },
  ];

  if (user) navLinks.push({ href: 'dashboard.html', label: 'My Account', icon: 'fa-user' });

  const linksHTML = navLinks.map(l => `
    <li class="nav-item">
      <a class="nav-link-item ${currentPage === l.href ? 'active' : ''}" href="${l.href}">
        <i class="fas ${l.icon} me-1 d-lg-none"></i>${l.label}
      </a>
    </li>`).join('');

  const authHTML = user ? `
    <li class="nav-item d-flex align-items-center gap-2">
      <span style="font-size:0.82rem;color:var(--text-light);white-space:nowrap;">Hi, ${user.fullname.split(' ')[0]}</span>
      <button class="btn-nav-login" onclick="logout()" style="background:transparent;border:1.5px solid var(--mid-gray);color:var(--text-mid);padding:7px 16px;">
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </li>` : `
    <li class="nav-item"><a class="btn-nav-login" href="login.html">Log In</a></li>
    <li class="nav-item ms-1"><a class="btn-nav-register" href="register.html">Sign Up</a></li>`;

  placeholder.innerHTML = `
    <nav class="smartmeal-nav navbar navbar-expand-lg">
      <div class="container">
        <a class="nav-brand navbar-brand" href="index.html">
          <div class="brand-icon"><i class="fas fa-fire-flame-curved"></i></div>
          SmartMeal
        </a>
        <div class="d-flex align-items-center gap-2 d-lg-none">
          <a class="nav-cart-btn" href="cart.html">
            <i class="fas fa-shopping-basket"></i>
            <span class="cart-badge cart-count-badge" id="cartCount">0</span>
          </a>
          <button class="navbar-toggler border-0 p-1" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-expanded="false">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav mx-auto gap-1">${linksHTML}</ul>
          <ul class="navbar-nav align-items-center gap-2">
            <li class="nav-item d-none d-lg-block">
              <a class="nav-cart-btn" href="cart.html">
                <i class="fas fa-shopping-basket"></i>
                <span class="cart-badge cart-count-badge" id="cartCount2">0</span>
              </a>
            </li>
            ${authHTML}
          </ul>
        </div>
      </div>
    </nav>`;

  if (typeof updateCartBadge === 'function') setTimeout(updateCartBadge, 50);

  // Sticky scroll effect
  window.addEventListener('scroll', () => {
    document.querySelector('.smartmeal-nav')?.classList.toggle('scrolled', window.scrollY > 40);
  });
});
