# Ref!ex — Next-Gen Luxury E-Commerce Experience ⚡

A high-performance modern e-commerce web application built with **React 19**, **Vite**, **Tailwind CSS**, and **Lucide Icons**. Ref!ex delivers an ultra-smooth luxury electronics shopping experience complete with stateful cart management, favorites wishlist, real-time product filtering, quick preview modals, coupon engines, and interactive checkout.

---

## ✨ Features & Enhancements

### 🛍️ E-Commerce Engine
- **Stateful Shopping Cart**: Slide-out drawer with real-time price calculations, quantity modification, item removal, and persistent storage (`localStorage`).
- **Wishlist & Saved Items**: Save favorite products with 1-click heart toggles and easily "Move to Cart".
- **Dynamic Promo Codes**: Real-time coupon application (`REFLEX20` for 20% discount, `WELCOME10` for 10% discount) with visual tags and auto-calculations.
- **Quick Look Product Modal**: Detailed popover with specifications, stock check, high-resolution galleries, and direct add-to-cart controls.
- **Seamless Checkout Flow**: Complete checkout modal with shipping address, payment method selection (Credit Card, Apple/Google Pay, Cash on Delivery), and celebration confetti animation!
- **Dynamic Product Catalog**: 12 curated flagship devices across Computers, Audio, Wearables, Phones, and Accessories.
- **Real-time Search & Multi-Filter**: Filter by category pills, search query, max price slider, and in-stock toggle.
- **Sorting Options**: Sort by Featured, Price (Low to High), Price (High to Low), or Customer Ratings.

### 🎨 Visual & UI/UX Design
- **Ultra-Modern Typography**: Integrated **Plus Jakarta Sans** and **Inter** from Google Fonts.
- **Curated Color System**: Custom indigo & violet palette configured directly into `tailwind.config.js`.
- **Theme Switcher**: Smooth **Dark / Light mode** toggle with persistent storage and system preference detection.
- **Micro-Animations & Glassmorphism**: Frosted glass navigation bars (`backdrop-blur`), subtle hover lift effects, and floating badges.
- **Instant Toast Notification System**: Clean floating toasts for actions (cart additions, favorites, coupons, orders).
- **VIP Account Simulation**: 1-click sign-in demo account to test customer profiles.
- **Trust Pillars & Newsletter**: Authenticity guarantees, 2-year warranty badges, express delivery indicators, and functional newsletter signup.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation
```bash
npm install
```

### Run Locally (Development Server)
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
```

---

## 📁 Project Architecture

```
E-Commerce-website/
├── index.html                     # Entry HTML with Google Fonts & SEO tags
├── package.json                   # Dependencies (React 19, Lucide, Confetti)
├── tailwind.config.js             # Custom primary palette, darkMode 'class'
├── src/
│   ├── index.jsx                  # Main application entry point & root renderer
│   ├── style.css                  # Custom scrollbars, glassmorphism utilities
│   ├── context/
│   │   └── ECommerceContext.jsx   # Global state for Cart, Wishlist, Theme & Filters
│   ├── data/
│   │   └── products.js            # Curated catalog with specs, images, & pricing
│   └── Component/
│       ├── Header.jsx             # Sticky glassmorphic navbar with search & badges
│       ├── Hero.jsx               # Hero banner, featured preview & trust pillars
│       ├── ProductLayout.jsx      # Product grid with category tabs & filter bar
│       ├── ProductCard.jsx        # Modern card with badges, ratings, quick view
│       ├── Footer.jsx             # Brand footer, newsletter form, payment badges
│       └── modals/
│           ├── CartDrawer.jsx     # Slide-over cart with calculations & coupons
│           ├── WishlistDrawer.jsx # Slide-over saved favorites drawer
│           ├── QuickLookModal.jsx # Comprehensive product specification modal
│           ├── CheckoutModal.jsx  # Interactive checkout & celebration order flow
│           ├── AuthModal.jsx      # Account sign-in & demo VIP profile
│           └── ToastContainer.jsx # Floating micro-interaction toast notifications
```

---

## 🏷️ Demo Coupon Codes

| Coupon Code | Discount |
| :--- | :--- |
| `REFLEX20` | **20% OFF** entire cart |
| `WELCOME10` | **10% OFF** entire cart |

Enjoy building and customizing Ref!ex! 🎉
