<div align="center">

# 📱 SRB Mobile Shop

### *Premium Smartphones & Accessories — Reimagined for the Web*

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-FF0080?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br />

<p align="center">
  <strong>🔥 A blazing-fast, fully responsive e-commerce storefront for mobile phones & accessories built with the latest Next.js 16, React 19, and cutting-edge UI technologies.</strong>
</p>

<br />

[🌐 Live Demo](#-live-demo) • [✨ Features](#-features) • [🛠️ Tech Stack](#️-tech-stack) • [🚀 Quick Start](#-quick-start) • [📁 Architecture](#-project-architecture) • [🤝 Contributing](#-contributing)

</div>

---

## 🎬 Preview

<div align="center">

| 🏠 Homepage | 🛍️ Shop Page |
|:---:|:---:|
| ![Home](https://img.shields.io/badge/Hero_Section-Gradient_Banner-blueviolet?style=flat-square) | ![Shop](https://img.shields.io/badge/Product_Grid-Advanced_Filters-blue?style=flat-square) |

| 📦 Product Detail | 🛒 Cart Page |
|:---:|:---:|
| ![Product](https://img.shields.io/badge/Image_Gallery-Variant_Picker-orange?style=flat-square) | ![Cart](https://img.shields.io/badge/Coupon_System-Order_Summary-green?style=flat-square) |

| 🏷️ Deals & Bundles | 📞 Contact Page |
|:---:|:---:|
| ![Deals](https://img.shields.io/badge/Flash_Sales-Bundle_Combos-red?style=flat-square) | ![Contact](https://img.shields.io/badge/Contact_Form-FAQ_Section-teal?style=flat-square) |

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🏪 Storefront & Catalog
- 🔍 **Intelligent Search** — Debounced search with brand & category filters  
- 🎨 **50+ Products** — Flagship, Budget, Accessories & Refurbished categories  
- 🏷️ **14+ Brands** — Apple, Samsung, Google, OnePlus, Xiaomi, Nothing & more  
- 📊 **Advanced Filtering** — Price range slider, RAM, storage, 5G, and feature filters  
- 🔀 **Sort Options** — By price, rating, and newest arrivals  
- 📱 **Grid & List Views** — Toggle between layout modes  

</td>
<td width="50%">

### 🛒 Shopping Experience
- 🛍️ **Dynamic Cart** — Add/remove items, quantity controls, save for later  
- 🎟️ **Coupon System** — Multiple promo codes with validation logic  
- 💰 **Price Breakdown** — Subtotal, discounts, delivery, and tax calculations  
- 🔥 **Flash Sale Countdown** — Real-time countdown timers on deals  
- 📦 **Bundle Deals** — Phone + accessory combo offers with extra discounts  
- ❤️ **Wishlist** — Save favorite products for later  

</td>
</tr>
<tr>
<td width="50%">

### 🎨 UI & Design
- 🌓 **Dark/Light/System Theme** — Seamless theme switching with `next-themes`  
- ✨ **60fps Animations** — Framer Motion page transitions & micro-interactions  
- 🎭 **AOS Scroll Animations** — Reveal-on-scroll effects throughout  
- 📐 **Pixel-Perfect Components** — Built with Radix UI + shadcn/ui  
- 📱 **Fully Responsive** — Mobile-first design, looks stunning on all devices  
- 🎨 **Dynamic Brand Colors** — Unique color accents per phone brand  

</td>
<td width="50%">

### ⚡ Performance & DX
- 🚀 **React 19** — Latest concurrent features & React Compiler  
- ⚡ **Next.js 16 App Router** — Server components & streaming  
- 🔄 **TanStack Query** — Smart data fetching, caching & state management  
- 📝 **React Hook Form + Zod** — Type-safe form validation  
- 🧩 **TypeScript Strict Mode** — End-to-end type safety  
- 🎯 **Skeleton Loaders** — Graceful loading states everywhere  

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:---|:---|:---|
| **Framework** | Next.js 16.1 | App Router, SSR, File-based routing |
| **UI Library** | React 19.2 | Concurrent rendering, React Compiler |
| **Language** | TypeScript 5.x | Static typing, strict mode |
| **Styling** | Tailwind CSS 4.x | Utility-first styling, dark mode |
| **Components** | shadcn/ui + Radix UI | Accessible, composable primitives |
| **Animations** | Framer Motion 12 | Layout animations, gestures, variants |
| **Scroll FX** | AOS (Animate on Scroll) | Intersection-based reveal animations |
| **State** | TanStack Query 5 | Server state, caching, devtools |
| **Forms** | React Hook Form + Zod | Validation, error handling |
| **Icons** | Lucide React | 1000+ beautiful SVG icons |
| **Carousel** | Embla Carousel | Touch-friendly, accessible sliders |
| **Theming** | next-themes | Dark/Light/System mode support |
| **Utilities** | clsx, tailwind-merge, CVA | Class merging & variant management |

</div>

---

## 📁 Project Architecture

```
srb-mobile-shop/
├── 📂 src/
│   ├── 📂 app/                    # Next.js App Router pages
│   │   ├── 🏠 page.tsx            # Homepage — Hero, categories, carousels
│   │   ├── 📄 layout.tsx          # Root layout — Navbar, footer, providers
│   │   ├── 🎨 globals.css         # Global styles & Tailwind directives
│   │   ├── ✨ animations.css       # Custom CSS animations
│   │   ├── 📂 shop/               # 🛍️ Product catalog with filters
│   │   ├── 📂 product/[id]/       # 📦 Dynamic product detail pages
│   │   ├── 📂 cart/               # 🛒 Shopping cart & checkout
│   │   ├── 📂 deals/             # 🏷️ Flash sales, bundles & offers
│   │   ├── 📂 about/             # 🏢 Company story & team
│   │   └── 📂 contact/           # 📞 Contact form, FAQ & locations
│   │
│   ├── 📂 components/            # Reusable UI components
│   │   ├── 🧭 Navbar.tsx          # Sticky nav with mobile drawer
│   │   ├── 🃏 ProductCard.tsx     # Product card with hover actions
│   │   ├── 🔍 SearchBar.tsx       # Debounced search with suggestions
│   │   ├── 🌓 ThemeToggle.tsx     # Dark/Light/System mode switcher
│   │   ├── ⏳ LoadingStates.tsx   # Skeleton loaders & shimmer effects
│   │   ├── 🔌 providers.tsx       # QueryClient, Theme, AOS providers
│   │   └── 📂 ui/                # shadcn/ui component library
│   │       ├── accordion, avatar, badge, button, card
│   │       ├── carousel, checkbox, dialog, dropdown-menu
│   │       ├── form, input, label, select, sheet
│   │       ├── slider, table, toast, toaster
│   │       └── ... (18+ components)
│   │
│   ├── 📂 types/                 # TypeScript interfaces
│   │   └── index.ts              # Product, Cart, Order, User, Review types
│   │
│   ├── 📂 lib/                   # Utilities & data
│   │   ├── mockData.ts           # 50+ products with full specs & images
│   │   └── utils.ts              # cn() helper & utility functions
│   │
│   └── 📂 hooks/                 # Custom React hooks
│       └── use-toast.ts          # Toast notification hook
│
├── 📄 next.config.ts             # Next.js configuration
├── 📄 components.json            # shadcn/ui configuration
├── 📄 tsconfig.json              # TypeScript configuration
├── 📄 postcss.config.mjs         # PostCSS + Tailwind config
└── 📄 package.json               # Dependencies & scripts
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 18.17
- **npm** ≥ 9.x (or yarn/pnpm/bun)

### Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/supun-ravidu/SRB-Mobile-Shop.git

# 2️⃣ Navigate to the project
cd SRB-Mobile-Shop

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start the development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser 🎉

### Available Scripts

| Command | Description |
|:---|:---|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Create optimized production build |
| `npm run start` | Serve the production build locally |

---

## 🗺️ Page Routes

| Route | Page | Description |
|:---|:---|:---|
| `/` | 🏠 Home | Hero banner, category cards, featured products, brand showcase, flash sale timers |
| `/shop` | 🛍️ Shop | Full product catalog with advanced filters, search, sort & grid/list toggle |
| `/product/[id]` | 📦 Product | Image carousel, color/storage picker, specs tabs, related products |
| `/cart` | 🛒 Cart | Cart management, coupon codes, price breakdown, suggested products |
| `/deals` | 🏷️ Deals | Flash sales, bundle combos, category deals, biggest savers, countdown timers |
| `/about` | 🏢 About | Company story, animated stats, team section, milestones, store locations |
| `/contact` | 📞 Contact | Contact form with validation, FAQ accordion, store info, social links |

---

## 🧩 Component Highlights

### 🃏 ProductCard
> Interactive card with hover-reveal action buttons (Quick View, Add to Cart, Wishlist), dynamic brand-colored badges, discount tags, rating stars, and skeleton loading states.

### 🔍 SearchBar
> Debounced search input with real-time product suggestions, category/brand dropdown filters, and keyboard navigation — all powered by TanStack Query.

### 🧭 Navbar
> Sticky header with glassmorphism backdrop blur, responsive mobile sheet drawer, brand dropdown, cart badge counter, user avatar menu, and animated theme toggle.

### 🏷️ Deals Page
> Multi-section deals layout featuring flash sale countdown timers, curated bundle combos (phone + accessories), category-specific deals, and a "Biggest Savers" showcase.

---

## 🎨 Design System

```
🎨 Colors
├── Primary         → Brand blue (customizable via CSS variables)
├── Backgrounds     → Adaptive light/dark with zinc palette
├── Gradients       → violet→purple, emerald→green, orange→red, blue→cyan
└── Brand Colors    → Dynamic per manufacturer (Apple gray, Samsung blue, etc.)

🔤 Typography
├── Font            → Inter (Google Fonts, variable weight)
├── Headings        → font-semibold, tracking-tight
└── Body            → text-muted-foreground, antialiased

✨ Motion
├── Page Transitions → Framer Motion fade/slide variants
├── Hover Effects    → scale, y-translate, color transitions
├── Scroll Reveals   → AOS fade-up with 700ms duration
└── Micro-interactions → Button press, cart add, wishlist toggle
```

---

## 📊 Data Model

```typescript
Product {
  id, name, brand, category
  price, originalPrice, discountPercentage
  rating, reviewCount, description
  image, images[], inStock, stockCount
  isNew, isSale, isFeatured
  specs: { display, processor, ram, storage, camera, battery, os, 5G, ... }
  colors: [{ name, hex, image }]
  storageOptions: [{ size, price }]
}

CartItem    { product, quantity, selectedColor, selectedStorage }
Order       { id, items[], totalAmount, status, shippingAddress, tracking }
User        { id, name, email, addresses[], wishlist[] }
Review      { id, productId, rating, title, comment, helpful }
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

```bash
# Fork the repo, then:
git checkout -b feature/amazing-feature
git commit -m "feat: add amazing feature"
git push origin feature/amazing-feature
# Open a Pull Request 🎉
```

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 🌟 Star this repo if you found it useful!

**Built with ❤️ by [Supun Ravidu](https://github.com/supun-ravidu)**

<br />

[![GitHub Stars](https://img.shields.io/github/stars/supun-ravidu/SRB-Mobile-Shop?style=social)](https://github.com/supun-ravidu/SRB-Mobile-Shop)
[![GitHub Forks](https://img.shields.io/github/forks/supun-ravidu/SRB-Mobile-Shop?style=social)](https://github.com/supun-ravidu/SRB-Mobile-Shop/fork)

</div>
