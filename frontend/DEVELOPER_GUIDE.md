# Mya Oro - Developer Guide 💎

Welcome to the **Mya Oro** frontend project! This guide will help you understand the project structure and how to continue developing it.

## 🚀 Getting Started

### Prerequisites

- Node.js installed.

### Installation

```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`.

---

## 📂 Project Structure

The project is built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

```text
src/
├── assets/             # Static assets
│   ├── fonts/          # Local fonts (Satoshi, Space Grotesk)
│   └── images/         # Organized by category (products, hero, ui, etc.)
├── components/         # Reusable UI components
│   ├── layout/         # Navbar, Footer, MainLayout
│   ├── home/           # Components specific to the Home page
│   ├── products/       # Product grid, filters, cards
│   ├── cart/           # Cart logic and components
│   ├── personal/       # Mya Personal configuration components
│   └── ui/             # Generic small components (Buttons, Inputs, Pagination)
├── context/            # Global state (ShopContext for Cart logic)
├── data/               # Mock data (products, reviews) - Edit this to add items!
├── hooks/              # Custom hooks (e.g., usePageTitle)
├── pages/              # Main page views (Home, About, Products, Cart)
├── types/              # TypeScript interfaces (Product, Review)
└── App.tsx             # Main router configuration
```

---

## 🛠️ How To...

### 1. Add New Products

Go to `src/data/mockData.ts`.
Add a new object to the `products` array:

```typescript
{
    id: 25,
    img: yourNewImageImport,
    name: "Nuovo Anello",
    price: "100€",
    category: "Fidanzamento"
}
```

_Note: Make sure to import the image first at the top of the file!_

### 2. Add a New Page

1. Create a new file in `src/pages/NewPage.tsx`.
2. Open `src/App.tsx`.
3. Import the page (lazy load recommended) and add a `<Route />`:
   ```tsx
   const NewPage = lazy(() => import("./pages/NewPage"));
   // ... inside Routes
   <Route path="/new-page" element={<NewPage />} />;
   ```

### 3. Change Images

Images are stored in `src/assets/images/`.

- **Products**: `src/assets/images/products/`
- **Hero/Banners**: `src/assets/images/hero/`
- **UI/Icons**: `src/assets/images/ui/`

When adding an image, import it in the component where you need it:

```tsx
import myImage from "../../assets/images/products/my-image.jpg";
```

### 4. Global Styles & Colors

Tailwind is used for most styling.

- **Colors**: Defined in `tailwind.config.js` (e.g., `text-gold-500`, `bg-dark-gray-800`).
- **Fonts**: Configured globally. Use `font-serif` for headers and `font-sans` for body text.

---

## 💡 Key Features Implemented

- **Routing**: `react-router-dom` handles navigation (`/products`, `/cart`, etc.).
- **Cart System**: `ShopContext` manages the cart state globally. You can use accessing `useShop()` in any component.
- **Scroll To Top**: Already implemented globally in `MainLayout`.
- **Lazy Loading**: Pages are lazy-loaded for performance.

## 🤝 Contribution Tips

- Always create reusable components in `src/components/ui/` if used in multiple places.
- Keep `App.tsx` clean by putting page logic inside the `src/pages/` files.
