// =============================================
// SmartMeal Main JS
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  // Scroll to top button
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('show', window.scrollY > 400);
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    document.querySelector('.smartmeal-nav')?.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Initialize admin account
  if (typeof initializeAdmin === 'function') initializeAdmin();
});
