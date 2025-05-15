import logo from './logo.svg';
import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import AdminDashboard from "./pages/AdminPanel";
import Navbar from "./components/Navbar";
import PrivateRoute from "./routes/PrivateRoute";
import OrderHistory from "./pages/OrderHistory";
import { SearchProvider } from "./context/SearchContext"; // ✅ Import

function App() {
  return (
    <SearchProvider> {/* ✅ Wrap entire app */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/cart"
          element={
            <PrivateRoute allowedRoles={["user", "admin"]}>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <PrivateRoute allowedRoles={["user", "admin"]}>
              <OrderHistory />
            </PrivateRoute>
          }
        />
      </Routes>
    </SearchProvider>
  );
}

export default App;
