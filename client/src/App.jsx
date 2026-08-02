import { useEffect, useState, useContext } from "react";
import { useRef } from "react";
import { CartContext } from "./context/CartContext";
import { WishlistContext } from "./context/WishlistContext";
import axios from "axios";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import "./App.css";
import { Link } from "react-router-dom";
function App() {
  const [products, setProducts] = useState([]);
 const { wishlist, addToWishlist } = useContext(WishlistContext);
const { cart, addToCart } = useContext(CartContext);
const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");
const [darkMode, setDarkMode] = useState(false);
const productsRef = useRef(null);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log("Error fetching products:", error);
      });
  }, []);
 return (
       <div className={darkMode ? "dark container" : "container"}>
      <Navbar
  cartCount={cart.reduce((t, i) => t + i.qty, 0)}
  wishlistCount={wishlist.length}
  darkMode={darkMode}
  setDarkMode={setDarkMode}
/>
<div className="hero">
  <div className="hero-content">
    <h1>🎨 Artisan's Corner</h1>

    <p>
      Discover beautiful handmade products crafted with love by skilled artisans.
    </p>

   <button
  className="shop-btn"
  onClick={() =>
    productsRef.current.scrollIntoView({
      behavior: "smooth",
    })
  }
>
  🛍️ Explore Collection
</button>
  </div>
</div>
          
  <div className="top-controls">
  <input
    type="text"
    placeholder="🔍 Search products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="search-box"
  />

  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="category-filter"
  >
    <option value="All">All Categories</option>
    <option value="Home Decor">Home Decor</option>
  </select>
</div>
{/*<Cart cart={cart} setCart={setCart} /> */}
      <div className="products" id="products" ref={productsRef}>
       {products
  .filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  })
  .map((product) => (
          <div className="product-card" key={product._id}>

          <img
  src={`http://127.0.0.1:5000/uploads/${product.image}`}
  alt={product.name}
  className="product-image"
/>
            <h2>{product.name}</h2>

<p className="category">{product.category}</p>

<div
  className="rating"
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    width: "100%",
  }}
>
  <span>⭐⭐⭐⭐⭐</span>
  <span className="rating-text">(4.8)</span>
</div>
<h3>₹{product.price}</h3>

<p className="stock">
{product.stock > 0 ? "✅ In Stock" : "❌ Out of Stock"}
</p>

<p className="description">
{product.description}
</p>

<div className="btn-group">
 <button className="cart-btn" onClick={() => addToCart(product)}>
  🛒 Add to Cart
</button>
  <button
  className="wishlist-btn"
  onClick={() => {
    addToWishlist(product);
  }}
>
  ❤️ Wishlist
</button>

  <Link
  to="/product"
  state={product}
  style={{ textDecoration: "none" }}
>
  <button className="details-btn">
  👁 View Details
</button>
</Link>
</div>

          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}
export default App;