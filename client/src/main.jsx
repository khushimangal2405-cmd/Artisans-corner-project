import React from "react";
import CartProvider from "./context/CartContext";
import Cart from "./components/Cart.jsx";
import CartPage from "./pages/CartPage.jsx";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import WishlistProvider from "./context/WishlistContext";
import Wishlist from "./pages/Wishlist";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";
import Orders from "./pages/Order";
import SellerDashboard from "./pages/SellerDashboard";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <CartProvider>
  <WishlistProvider>
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<App />} />
        <Route path="/product" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<CartPage />} />
       <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route
  path="/dashboard/seller"
  element={<SellerDashboard />}
/>
      </Routes>
     </BrowserRouter>
     <ToastContainer
  position="top-right"
  autoClose={2000}
/>
  </WishlistProvider>
</CartProvider>
</React.StrictMode>
);