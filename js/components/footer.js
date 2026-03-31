// =============================================
// SmartMeal Footer Component
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;

  placeholder.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="row g-5">
          <div class="col-md-4">
            <div class="footer-brand">
              <div class="brand-icon" style="width:34px;height:34px;background:linear-gradient(135deg,var(--primary),#FF8C5A);border-radius:9px;display:flex;align-items:center;justify-content:center;color:white;font-size:0.95rem;flex-shrink:0;">
                <i class="fas fa-fire-flame-curved"></i>
              </div>
              SmartMeal
            </div>
            <p class="footer-desc">Personalized healthy food delivery built around your lifestyle and nutritional goals.</p>
            <div class="footer-socials">
              <a href="#" class="social-btn"><i class="fab fa-instagram"></i></a>
              <a href="#" class="social-btn"><i class="fab fa-twitter"></i></a>
              <a href="#" class="social-btn"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social-btn"><i class="fab fa-youtube"></i></a>
            </div>
          </div>
          <div class="col-6 col-md-2">
            <div class="footer-heading">Quick Links</div>
            <ul class="footer-links">
              <li><a href="index.html"><i class="fas fa-chevron-right fa-xs"></i> Home</a></li>
              <li><a href="menu.html"><i class="fas fa-chevron-right fa-xs"></i> Menu</a></li>
              <li><a href="cart.html"><i class="fas fa-chevron-right fa-xs"></i> Cart</a></li>
              <li><a href="login.html"><i class="fas fa-chevron-right fa-xs"></i> Login</a></li>
            </ul>
          </div>
          <div class="col-6 col-md-2">
            <div class="footer-heading">Categories</div>
            <ul class="footer-links">
              <li><a href="menu.html?cat=Vegan"><i class="fas fa-chevron-right fa-xs"></i> Vegan</a></li>
              <li><a href="menu.html?cat=Keto"><i class="fas fa-chevron-right fa-xs"></i> Keto</a></li>
              <li><a href="menu.html?cat=High+Protein"><i class="fas fa-chevron-right fa-xs"></i> Protein</a></li>
              <li><a href="menu.html?cat=Healthy"><i class="fas fa-chevron-right fa-xs"></i> Healthy</a></li>
            </ul>
          </div>
          <div class="col-md-4">
            <div class="footer-heading">Contact Us</div>
            <ul class="footer-links">
              <li><a href="mailto:hello@smartmeal.com"><i class="fas fa-envelope"></i> hello@smartmeal.com</a></li>
              <li><a href="tel:+918000000000"><i class="fas fa-phone"></i> +91 800-000-0000</a></li>
              <li><a href="#"><i class="fas fa-map-marker-alt"></i> Delhi, India</a></li>
            </ul>
            <div style="margin-top:16px;background:rgba(255,255,255,0.06);border-radius:12px;padding:12px 14px;">
              <div style="font-size:0.78rem;color:rgba(255,255,255,0.5);margin-bottom:4px;">Delivery Hours</div>
              <div style="font-size:0.85rem;color:rgba(255,255,255,0.8);font-weight:500;">Daily 8:00 AM – 10:30 PM</div>
            </div>
          </div>
        </div>
        <hr class="footer-divider">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 footer-bottom">
          <span>© ${new Date().getFullYear()} SmartMeal. All rights reserved.</span>
          <div class="d-flex gap-4">
            <a href="#" style="color:rgba(255,255,255,0.4);font-size:0.82rem;">Privacy Policy</a>
            <a href="#" style="color:rgba(255,255,255,0.4);font-size:0.82rem;">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>`;
});
