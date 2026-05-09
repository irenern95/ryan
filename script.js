/* ============================================================
   script.js – RyanShop Ecommerce Website
   ============================================================ */

'use strict';

// ──────────────────────────────────────────────
// 1. PRODUCT DATA
// ──────────────────────────────────────────────
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'electronics',
    price: 79.99,
    emoji: '🎧',
    description: 'High-quality wireless headphones with 30-hour battery life.'
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    category: 'electronics',
    price: 129.99,
    emoji: '⌨️',
    description: 'Tactile mechanical keyboard with RGB backlight.'
  },
  {
    id: 3,
    name: 'Smartwatch',
    category: 'electronics',
    price: 199.99,
    emoji: '⌚',
    description: 'Feature-rich smartwatch with health monitoring.'
  },
  {
    id: 4,
    name: 'Classic T-Shirt',
    category: 'clothing',
    price: 19.99,
    emoji: '👕',
    description: '100% cotton, available in multiple colours.'
  },
  {
    id: 5,
    name: 'Running Shoes',
    category: 'clothing',
    price: 89.99,
    emoji: '👟',
    description: 'Lightweight running shoes with memory-foam insole.'
  },
  {
    id: 6,
    name: 'Denim Jacket',
    category: 'clothing',
    price: 59.99,
    emoji: '🧥',
    description: 'Timeless denim jacket for every occasion.'
  },
  {
    id: 7,
    name: 'JavaScript: The Good Parts',
    category: 'books',
    price: 24.99,
    emoji: '📘',
    description: 'A must-read for every JavaScript developer.'
  },
  {
    id: 8,
    name: 'Clean Code',
    category: 'books',
    price: 34.99,
    emoji: '📗',
    description: 'Learn how to write readable, maintainable code.'
  },
  {
    id: 9,
    name: 'Portable Charger',
    category: 'electronics',
    price: 39.99,
    emoji: '🔋',
    description: '20,000 mAh power bank with fast-charge support.'
  },
  {
    id: 10,
    name: 'The Pragmatic Programmer',
    category: 'books',
    price: 44.99,
    emoji: '📙',
    description: 'Practical advice for professional developers.'
  },
  {
    id: 11,
    name: 'Winter Scarf',
    category: 'clothing',
    price: 49.99,
    emoji: '🧣',
    description: 'Cosy knitted scarf, perfect for cooler weather.'
  },
  {
    id: 12,
    name: 'USB-C Hub',
    category: 'electronics',
    price: 34.99,
    emoji: '🖥️',
    description: '7-in-1 USB-C hub for all your connectivity needs.'
  }
];

// ──────────────────────────────────────────────
// 2. STATE
// ──────────────────────────────────────────────
let cart = [];          // Array of { product, quantity }
let activeCategory = 'all';

// ──────────────────────────────────────────────
// 3. HELPERS
// ──────────────────────────────────────────────
function formatPrice(amount) {
  return amount.toFixed(2);
}

function findCartItem(productId) {
  return cart.find(item => item.product.id === productId);
}

// ──────────────────────────────────────────────
// 4. CART OPERATIONS
// ──────────────────────────────────────────────
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = findCartItem(productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  updateCartUI();
  openCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.product.id !== productId);
  updateCartUI();
}

function changeQuantity(productId, delta) {
  const item = findCartItem(productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    updateCartUI();
  }
}

function cartTotal() {
  return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

function cartItemCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// ──────────────────────────────────────────────
// 5. RENDER – PRODUCTS
// ──────────────────────────────────────────────
function renderProducts(category) {
  const grid = document.getElementById('productGrid');
  const filtered = category === 'all'
    ? products
    : products.filter(p => p.category === category);

  grid.innerHTML = filtered.map(product => `
    <article class="product-card" data-id="${product.id}">
      <div class="product-img" aria-label="${product.name} image">${product.emoji}</div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
      </div>
      <div class="product-footer">
        <span class="product-price">$${formatPrice(product.price)}</span>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    </article>
  `).join('');
}

// ──────────────────────────────────────────────
// 6. RENDER – CART
// ──────────────────────────────────────────────
function updateCartUI() {
  const cartItemsEl = document.getElementById('cartItems');
  const cartCountEl = document.getElementById('cartCount');
  const cartTotalEl = document.getElementById('cartTotal');

  // Update badge count
  cartCountEl.textContent = cartItemCount();

  // Update total
  cartTotalEl.textContent = formatPrice(cartTotal());

  // Render cart items
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '';
    return;
  }

  cartItemsEl.innerHTML = cart.map(item => `
    <li class="cart-item" data-id="${item.product.id}">
      <span class="cart-item-emoji">${item.product.emoji}</span>
      <div class="cart-item-details">
        <p class="cart-item-name">${item.product.name}</p>
        <p class="cart-item-price">$${formatPrice(item.product.price)} each</p>
        <div class="cart-item-controls">
          <button class="qty-btn" data-action="decrease" data-id="${item.product.id}">−</button>
          <span class="qty-value">${item.quantity}</span>
          <button class="qty-btn" data-action="increase" data-id="${item.product.id}">+</button>
          <button class="remove-item" data-id="${item.product.id}" aria-label="Remove ${item.product.name}">🗑</button>
        </div>
      </div>
    </li>
  `).join('');
}

// ──────────────────────────────────────────────
// 7. CART SIDEBAR OPEN / CLOSE
// ──────────────────────────────────────────────
function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartSidebar').setAttribute('aria-hidden', 'false');
  document.getElementById('overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartSidebar').setAttribute('aria-hidden', 'true');
  document.getElementById('overlay').classList.remove('active');
  document.body.style.overflow = '';
}

// ──────────────────────────────────────────────
// 8. EVENT DELEGATION
// ──────────────────────────────────────────────
function attachEventListeners() {
  // Open / close cart
  document.getElementById('cartToggle').addEventListener('click', openCart);
  document.getElementById('closeCart').addEventListener('click', closeCart);
  document.getElementById('overlay').addEventListener('click', closeCart);

  // Keyboard close (Escape)
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCart();
  });

  // Add to cart (delegated from product grid)
  document.getElementById('productGrid').addEventListener('click', e => {
    const btn = e.target.closest('.add-to-cart');
    if (!btn) return;
    addToCart(Number(btn.dataset.id));
  });

  // Cart item controls (delegated from cart sidebar)
  document.getElementById('cartItems').addEventListener('click', e => {
    const id = Number(e.target.dataset.id);
    if (!id) return;

    if (e.target.classList.contains('remove-item')) {
      removeFromCart(id);
    } else if (e.target.dataset.action === 'increase') {
      changeQuantity(id, 1);
    } else if (e.target.dataset.action === 'decrease') {
      changeQuantity(id, -1);
    }
  });

  // Category filters
  document.querySelector('.filters').addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    activeCategory = btn.dataset.category;
    renderProducts(activeCategory);
  });

  // Checkout button
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert(`Thank you for your order! Total: $${formatPrice(cartTotal())}\n\nThis is a demo – no real payment is processed.`);
    cart = [];
    updateCartUI();
    closeCart();
  });

  // Contact form
  document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const feedback = document.getElementById('formFeedback');
    const form = e.target;

    // Basic validation
    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      feedback.textContent = 'Please fill in all fields.';
      feedback.className = 'form-feedback error';
      return;
    }

    // Simulate submission
    feedback.textContent = `Thanks ${name}! We'll be in touch at ${email}.`;
    feedback.className = 'form-feedback success';
    form.reset();
  });
}

// ──────────────────────────────────────────────
// 9. INIT
// ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(activeCategory);
  updateCartUI();
  attachEventListeners();
});
