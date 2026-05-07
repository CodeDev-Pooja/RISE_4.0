# SmartMeal 🍽️

**Eat Smart, Live Better** — A personalized healthy food delivery web application.

---

## 📋 Project Overview

SmartMeal is a full-featured food delivery platform designed to make healthy eating accessible and convenient. The application provides personalized meal recommendations based on dietary preferences, real-time order tracking, and a seamless checkout experience.

**Tagline:** Fuel your body with purpose.

---

## ✨ Key Features

### User Features
- 🔐 **User Authentication** — Secure login and registration system
- 🛒 **Shopping Cart** — Add/remove items with real-time updates
- 📋 **Menu Browsing** — Filter meals by category, search, and sort by price/rating
- 💰 **Smart Checkout** — Multi-step checkout with multiple payment methods
- 🎟️ **Promo Codes** — Apply discount codes (SMART15, VEGAN10, WELCOME20)
- 📦 **Order Tracking** — View order history and status
- ❤️ **Wishlist** — Save favorite meals for later
- 👤 **User Dashboard** — Manage profile and dietary preferences
- 🚚 **Delivery Info** — Free delivery on orders above $25

### Admin Features
- 📊 **Admin Dashboard** — Manage products and orders
- 🔑 **Admin Authentication** — Secure admin login
- 📝 **Order Management** — View and update order statuses

### Dietary Categories
- 🥗 Vegan
- 💪 High Protein
- 🥑 Keto
- ❤️ Healthy
- 🔥 Low Calorie

---

## 🏗️ Project Structure

```
RISE_4.0/
├── index.html                 # Homepage with featured meals
├── menu.html                  # Full menu with filters
├── cart.html                  # Shopping cart
├── checkout.html              # Multi-step checkout
├── login.html                 # User login
├── register.html              # User registration
├── dashboard.html             # User dashboard
├── admin/                     # Admin panel
│   ├── login.html            # Admin login
│   ├── dashboard.html        # Admin dashboard
│   └── a.html                # Admin utilities
├── css/
│   └── style.css             # Global styles
├── js/
│   ├── main.js               # Main application logic
│   ├── auth.js               # Authentication logic
│   ├── cart.js               # Cart management
│   ├── utils.js              # Utility functions
│   ├── admin.js              # Admin functionality
│   ├── i.js                  # Additional utilities
│   └── components/
│       ├── navbar.js         # Navigation component
│       ├── footer.js         # Footer component
│       └── f.js              # Footer utilities
├── services/
│   ├── api.js                # API service
│   ├── ap.js                 # Additional API functions
│   └── storage.js            # LocalStorage management
└── data/                     # JSON data files
    ├── products.json         # Product/meal data
    ├── users.json            # User accounts
    ├── orders.json           # Order history
    └── v.json                # Additional data
```

---

## 🛠️ Technologies Used

### Frontend
- **HTML5** — Semantic markup
- **CSS3** — Modern styling with custom properties (CSS variables)
- **JavaScript (ES6+)** — Client-side logic
- **Bootstrap 5.3** — Responsive UI framework
- **Font Awesome 6.5** — Icon library

### Storage & Data
- **LocalStorage** — Client-side data persistence
- **JSON** — Static data files

### Design Patterns
- **Responsive Design** — Mobile-first approach
- **Component-Based Architecture** — Reusable navbar and footer
- **Service Layer** — Separation of concerns

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No backend server required (works with static files)

### Installation

1. **Clone or download the project:**
   ```bash
   git clone <repository-url>
   cd RISE_4.0
   ```

2. **Open in browser:**
   - Option A: Double-click `index.html` to open directly
   - Option B: Use a local server (recommended)
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx http-server
     ```

3. **Access the application:**
   - Open `http://localhost:8000` (if using server)
   - or open `file:///path/to/RISE_4.0/index.html` (if opening directly)

---

## 📖 Usage Guide

### For Users

1. **Register/Login**
   - Click "Sign up free" on the homepage
   - Or use demo credentials (see below)

2. **Browse Menu**
   - Click "Browse Menu" or navigate to `menu.html`
   - Filter by category or search for meals
   - Sort by price, rating, or calories

3. **Add to Cart**
   - Click the "Add to Cart" button on any meal card
   - Specify quantity if needed

4. **Checkout**
   - Review cart items and use promo codes for discounts
   - Enter delivery address
   - Choose payment method (COD, Card, or UPI)
   - Place order

5. **Track Orders**
   - Go to Dashboard to view order history
   - Track order status (pending, processing, delivered)

### For Admins

1. **Admin Login**
   - Navigate to `admin/login.html`
   - Use admin credentials (see below)

2. **Manage Dashboard**
   - View all orders and update statuses
   - Manage products

---

## 🎯 Demo Credentials

### Regular User
- **Email:** `user@smartmeal.com`
- **Password:** `password123`

### Admin
- **Email:** `admin@smartmeal.com`
- **Password:** `admin123`

### Promo Codes
- `SMART15` — 15% discount
- `VEGAN10` — 10% discount (Vegan meals)
- `WELCOME20` — 20% discount (New users)

---

## 📱 Key Pages

| Page | Path | Purpose |
|------|------|---------|
| Home | `index.html` | Landing page with featured meals |
| Menu | `menu.html` | Browse all meals with filters |
| Cart | `cart.html` | View and manage shopping cart |
| Checkout | `checkout.html` | Complete purchase |
| Login | `login.html` | User authentication |
| Register | `register.html` | New user signup |
| Dashboard | `dashboard.html` | User account and order history |
| Admin Login | `admin/login.html` | Admin authentication |
| Admin Dashboard | `admin/dashboard.html` | Admin panel |

---

## 💾 Data Structure

### Products (products.json)
```json
{
  "id": 1,
  "name": "Grilled Chicken Salad",
  "category": "Healthy",
  "price": 8.99,
  "calories": 350,
  "protein": 32,
  "rating": 4.5,
  "description": "...",
  "image": "..."
}
```

### Users (users.json)
```json
{
  "id": 1,
  "email": "user@smartmeal.com",
  "password": "password123",
  "fullname": "John Doe",
  "phone": "9876543210",
  "dietaryPreference": "Vegan"
}
```

### Orders (orders.json)
```json
{
  "id": 1,
  "userId": 1,
  "items": [...],
  "total": 25.50,
  "status": "delivered",
  "deliveryAddress": "...",
  "paymentMethod": "cod",
  "date": "2026-05-07"
}
```

---

## 🎨 Design Features

- **Modern UI** — Clean, minimalist design with accent colors
- **Responsive Layout** — Mobile, tablet, and desktop optimized
- **Smooth Animations** — Transitions and hover effects
- **Accessibility** — ARIA labels and semantic HTML
- **Dark/Light Mode Support** — CSS custom properties for theming
- **Loading States** — Spinner animations and skeleton screens

---

## 🔐 Security Features

- **256-bit SSL Encryption** — Displayed on checkout
- **Password Protection** — Secure authentication
- **LocalStorage Isolation** — Client-side data isolation
- **Input Validation** — Form validation before submission

---

## 🚧 Future Enhancements

- [ ] Backend API integration (Node.js/Express)
- [ ] Database (MongoDB/PostgreSQL)
- [ ] Real payment gateway integration (Stripe, PayPal)
- [ ] Real-time order tracking with maps
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Loyalty program/rewards
- [ ] AI-powered meal recommendations
- [ ] Multi-language support
- [ ] Restaurant/vendor management
- [ ] Analytics dashboard
- [ ] Push notifications

---

## 📂 File Descriptions

### JavaScript Files

| File | Purpose |
|------|---------|
| `main.js` | Core app initialization and utilities |
| `auth.js` | Login and registration logic |
| `cart.js` | Shopping cart management |
| `utils.js` | Helper functions (formatting, validation, etc.) |
| `admin.js` | Admin panel functionality |
| `navbar.js` | Navigation bar component logic |
| `footer.js` | Footer component logic |

### Service Files

| File | Purpose |
|------|---------|
| `storage.js` | LocalStorage wrapper and data management |
| `api.js` | API calls and data fetching |
| `ap.js` | Additional API utilities |

---

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ Frontend development with vanilla JavaScript
- ✅ Responsive web design
- ✅ Component-based architecture
- ✅ State management with localStorage
- ✅ Form handling and validation
- ✅ E-commerce workflow
- ✅ User authentication flow
- ✅ Admin dashboard functionality

---

## 📝 Notes

- All data is stored in browser's `localStorage`
- No backend server is required to run the application
- Each user session is isolated to the local browser
- Promo codes are hardcoded and can be modified in `cart.js`
- Payment methods are simulated (no real payment processing)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Improve documentation
- Optimize code

---

## 📄 License

This project is part of the RISE 4.0 Internship.

---

## 👨‍💻 Author

Created as a part of **RISE 4.0** web development internship program.

---

## 📞 Support

For issues or questions, please refer to the source files and comments within the code.

---

**Last Updated:** May 7, 2026

**Status:** ✅ Active Development
