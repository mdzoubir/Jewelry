# Backend - Express API

A production-ready e-commerce REST API.

## 🚀 Key Features

### � Authentication (RBAC)
- **JWT** for stateless auth.
- **Roles**: `admin` vs `customer`.
- **Middleware**: `authenticateToken` (login required) and `authorize([roles])`.

### 📦 Product Catalog
- **Categories**: Hierarchical tree (parent/child).
- **Products**: Detailed records with slugs, prices, and images.
- **Secure Management**: Only Admins can modify catalog data.

### 🏭 Inventory System
- **Real-time Tracking**: Stock is tracked per product.
- **Atomic Operations**: Stock updates are atomic to prevent race conditions during ordering.
- **Access**: Public read, Admin write.

### � Shopping Cart
- **Persistent Storage**: Carts are stored in DB (`carts` + `cart_items`) linked to User ID.
- **Smart Logic**: Merges duplicate items, calculates totals dynamically.
- **Cascading**: Deleting a product automatically removes it from all carts.

### 💳 Order Processing (Transactional)
- **ACID Transactions**: Placing an order is an all-or-nothing operation.
    1.  Validate Stock.
    2.  Lock Price (snapshot).
    3.  Create Order.
    4.  Decrement Inventory.
    5.  Clear Cart.
- **Security**: Users can only access their own order history.

---

## 📡 API Reference

### 1. Users
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/users/register` | Public | Create account |
| `POST` | `/api/users/login` | Public | Login & Get Token |
| `GET` | `/api/users/profile` | Auth | Get current user info |
| `GET` | `/api/users` | **Admin** | List all users |

### 2. Categories
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/categories` | Public | List categories |
| `POST` | `/api/categories` | **Admin** | Create category |
| `PUT` | `/api/categories/:id` | **Admin** | Update category |
| `DELETE` | `/api/categories/:id` | **Admin** | Delete category |

### 3. Products
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Public | List products |
| `GET` | `/api/products/:id` | Public | Get product details |
| `POST` | `/api/products` | **Admin** | Create product |
| `PUT` | `/api/products/:id` | **Admin** | Update product |
| `DELETE` | `/api/products/:id` | **Admin** | Delete product |

### 4. Inventory
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/inventory/:id` | Public | Check stock level |
| `PUT` | `/api/inventory/:id` | **Admin** | Update stock level |

### 5. Carts
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/cart` | Auth | Get my cart |
| `POST` | `/api/cart/items` | Auth | Add item to cart |
| `PUT` | `/api/cart/items/:id` | Auth | Update item quantity |
| `DELETE` | `/api/cart/items/:id` | Auth | Remove item |
| `DELETE` | `/api/cart` | Auth | Clear entire cart |

### 6. Orders
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/orders` | Auth | **Place Order** (Transaction) |
| `GET` | `/api/orders` | Auth | List my orders |
| `GET` | `/api/orders/:id` | Owner/Admin | Get order details |
| `GET` | `/api/orders/admin/all` | **Admin** | List ALL orders |
| `PUT` | `/api/orders/:id/status`| **Admin** | Update status (e.g. 'shipped')|

---

## 🛠 Project Structure

```
src/
├── controllers/    # Request logic & business rules
├── models/         # Database queries & interfaces
├── routes/         # Express route definitions
├── middleware/     # Auth & Error handling
├── constants/      # Enums (Roles, etc.)
├── index.ts        # App Entry Point
└── db.ts           # MySQL Connection Pool
```
