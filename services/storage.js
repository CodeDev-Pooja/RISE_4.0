// =============================================
// SmartMeal Storage Service
// localStorage wrapper with default data
// =============================================

const SM_KEYS = {
  products: 'smartmeal_products',
  cart: 'smartmeal_cart',
  users: 'smartmeal_users',
  orders: 'smartmeal_orders',
  user: 'smartmeal_user',
  admin: 'smartmeal_admin',
  wishlist: 'smartmeal_wishlist'
};

const DEFAULT_PRODUCTS = [
  {
    id: '1', name: 'Quinoa Buddha Bowl', price: 12.99, category: 'Vegan',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
    description: 'Fresh quinoa, roasted vegetables, avocado, chickpeas, and house tahini dressing.',
    calories: 380, protein: 14, carbs: 52, fat: 12, rating: 4.9, reviews: 342, prepTime: 20, badge: 'bestseller'
  },
  {
    id: '2', name: 'Grilled Chicken Breast', price: 15.99, category: 'High Protein',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&q=80',
    description: 'Herb-marinated chicken breast, steamed broccoli, brown rice, and lemon dressing.',
    calories: 480, protein: 48, carbs: 38, fat: 14, rating: 4.8, reviews: 218, prepTime: 25, badge: 'popular'
  },
  {
    id: '3', name: 'Keto Cauliflower Rice Bowl', price: 14.99, category: 'Keto',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
    description: 'Cauliflower rice, sautéed kale, avocado, boiled eggs, and olive oil dressing.',
    calories: 320, protein: 18, carbs: 12, fat: 24, rating: 4.7, reviews: 176, prepTime: 20, badge: null
  },
  {
    id: '4', name: 'Superfood Green Salad', price: 11.99, category: 'Healthy',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80',
    description: 'Baby kale, spinach, blueberries, walnuts, pumpkin seeds, and balsamic glaze.',
    calories: 260, protein: 10, carbs: 30, fat: 14, rating: 4.6, reviews: 149, prepTime: 15, badge: null
  },
  {
    id: '5', name: 'Protein Power Bowl', price: 16.99, category: 'High Protein',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80',
    description: 'Grass-fed beef, boiled eggs, quinoa, mixed greens, and sriracha mayo.',
    calories: 560, protein: 52, carbs: 42, fat: 18, rating: 4.9, reviews: 287, prepTime: 30, badge: 'new'
  },
  {
    id: '6', name: 'Plant-Based Burger', price: 13.99, category: 'Vegan',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80',
    description: 'Beyond Meat patty, lettuce, tomato, pickles, and chipotle vegan mayo.',
    calories: 420, protein: 22, carbs: 48, fat: 16, rating: 4.5, reviews: 203, prepTime: 20, badge: null
  },
  {
    id: '7', name: 'Avocado Toast Deluxe', price: 10.99, category: 'Healthy',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=400&q=80',
    description: 'Multigrain toast, smashed avocado, cherry tomatoes, microgreens, and everything bagel seasoning.',
    calories: 340, protein: 12, carbs: 44, fat: 18, rating: 4.7, reviews: 195, prepTime: 10, badge: 'new'
  },
  {
    id: '8', name: 'Keto Salmon & Greens', price: 18.99, category: 'Keto',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80',
    description: 'Grilled Atlantic salmon, asparagus, zucchini noodles, and lemon butter sauce.',
    calories: 440, protein: 38, carbs: 8, fat: 30, rating: 4.8, reviews: 164, prepTime: 25, badge: 'premium'
  },
  {
    id: '9', name: 'Low-Cal Veggie Wrap', price: 9.99, category: 'Low Calorie',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&q=80',
    description: 'Whole wheat wrap with hummus, cucumber, bell peppers, spinach, and tzatziki.',
    calories: 240, protein: 10, carbs: 36, fat: 8, rating: 4.5, reviews: 122, prepTime: 10, badge: null
  },
  {
    id: '10', name: 'Greek Protein Bowl', price: 14.99, category: 'High Protein',
    image: 'https://images.unsplash.com/photo-1529059997568-3d847b1154f0?w=400&q=80',
    description: 'Grilled chicken, falafel, tzatziki, quinoa tabbouleh, and pita chips.',
    calories: 510, protein: 44, carbs: 50, fat: 16, rating: 4.6, reviews: 198, prepTime: 25, badge: null
  },
  {
    id: '11', name: 'Mango Chia Pudding', price: 7.99, category: 'Vegan',
    image: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?w=400&q=80',
    description: 'Coconut milk chia pudding topped with fresh mango, granola, and mint.',
    calories: 290, protein: 8, carbs: 42, fat: 12, rating: 4.8, reviews: 276, prepTime: 5, badge: 'popular'
  },
  {
    id: '12', name: 'Cauliflower Keto Tacos', price: 13.49, category: 'Keto',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80',
    description: 'Cauliflower tortillas filled with spiced chicken, jalapeño, and lime crema.',
    calories: 290, protein: 24, carbs: 10, fat: 20, rating: 4.6, reviews: 142, prepTime: 25, badge: null
  }
];

function getAllProducts() {
  const stored = localStorage.getItem(SM_KEYS.products);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(SM_KEYS.products, JSON.stringify(DEFAULT_PRODUCTS));
  return DEFAULT_PRODUCTS;
}

function getCart() {
  const c = localStorage.getItem(SM_KEYS.cart);
  return c ? JSON.parse(c) : [];
}

function saveCart(cart) {
  localStorage.setItem(SM_KEYS.cart, JSON.stringify(cart));
}

function getAllUsers() {
  const u = localStorage.getItem(SM_KEYS.users);
  return u ? JSON.parse(u) : [];
}

function getAllOrders() {
  const o = localStorage.getItem(SM_KEYS.orders);
  return o ? JSON.parse(o) : [];
}

function getWishlist() {
  const w = localStorage.getItem(SM_KEYS.wishlist);
  return w ? JSON.parse(w) : [];
}

function saveWishlist(list) {
  localStorage.setItem(SM_KEYS.wishlist, JSON.stringify(list));
}

function toggleWishlist(productId) {
  let list = getWishlist();
  const idx = list.indexOf(productId);
  if (idx > -1) {
    list.splice(idx, 1);
    showToast('Removed from wishlist', 'info');
  } else {
    list.push(productId);
    showToast('❤️ Added to wishlist!', 'success');
  }
  saveWishlist(list);
  return list.includes(productId);
}

function isInWishlist(productId) {
  return getWishlist().includes(productId);
}
