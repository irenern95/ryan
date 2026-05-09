# RyanShop – Ecommerce Website

A clean, fully-functional ecommerce storefront built with plain **HTML**, **CSS**, and **JavaScript** — no frameworks or build tools required.

## Features

- 🛍️ **Product catalogue** with 12 sample products across three categories (Electronics, Clothing, Books)
- 🔍 **Category filtering** — instantly filter products by category
- 🛒 **Shopping cart sidebar** — add items, adjust quantities, and remove products
- 💳 **Checkout flow** — cart total calculation and a mock checkout confirmation
- 📬 **Contact form** — client-side validation with user feedback
- 📱 **Responsive design** — works on mobile, tablet, and desktop

## Project Structure

```
ryan/
├── index.html   # Main HTML page (header, hero, products, contact, footer, cart sidebar)
├── style.css    # All styles (layout, components, responsive breakpoints)
├── script.js    # Product data, cart logic, UI rendering, event handling
└── README.md    # This file
```

## Getting Started

No installation needed. Just open `index.html` in any modern browser:

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

Or serve it with any static file server, for example:

```bash
npx serve .
# then visit http://localhost:3000
```

## How to Customise

| What you want to change | Where to look |
|---|---|
| Add / remove products | `products` array in `script.js` |
| Change colours / fonts | CSS custom properties at the top of `style.css` |
| Add a new page section | `index.html` + matching styles in `style.css` |
| Extend cart logic (e.g. discounts) | cart functions in `script.js` |
| Connect a real payment gateway | Replace the mock `checkoutBtn` handler in `script.js` |

## License

MIT
