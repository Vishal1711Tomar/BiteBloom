# 🍽️ BiteBloom – React Food Ordering App

**BiteBloom** is a modern food ordering web application built with **React.js**, featuring seamless user and admin experiences. Users can browse Indian dishes, add them to cart, place orders, and rate meals. Admins can manage the dish menu with full CRUD capabilities.

---

## 🚀 Features

### 👨‍🍳 User Functionalities
- 🔐 **Login / Signup** with user role assignment
- 🧾 **Password Encryption** for secure login
- 🍛 **Dish Listing** with name, image, price, and description
- 🛒 **Cart Functionality** (Add, Remove, Increase/Decrease Quantity)
- 📦 **Order Placement** from cart
- 🧾 **View Order History**
- 🔍 **Live Search** to filter dishes by name
- 📱 Responsive UI using **React Bootstrap**

### 🛠️ Admin Functionalities
- 🔐 **Admin Login**
- 📋 **View All Dishes**
- ➕ **Add New Dishes**
- ✏️ **Edit Existing Dishes**
- ❌ **Delete Dishes**
- 🧮 **Dish Price & Description**

### 📦 Data Management
- 📁 **db.json** as the mock database (via `json-server`)


---

## 🛠️ Tech Stack

- **Frontend**: React.js, React Router, React Context API, React Bootstrap
- **Backend**: JSON Server
- **State Management**: Context API + `useReducer`
- **Authentication**: Role-based access with encrypted passwords
- **Storage**: `localStorage` for sessions, cart, orders

---

## 🖼️ Screenshots

### 🏠 Home Page
![Home Page](assets/home)

### 🛒 Cart Page
![Cart Page](assets/cart.png)

### 🔐 Login Page
![Login Page](assets/login.png)

### 👨‍🍳 Admin Dashboard
![Admin Dashboard](assets/admin-dashboard.png)
