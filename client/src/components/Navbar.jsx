import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
function Navbar({ cartCount, wishlistCount, darkMode, setDarkMode }) {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <nav className="navbar">
      <h2>🎨 Artisan's Corner</h2>

      <ul>
      <li>
  <Link to="/">Home</Link>
</li>

<li>
  <a
    href="#products"
  >
    Products
  </a>
</li>
       <li>
  <Link to="/wishlist">
    ❤️ Wishlist ({wishlistCount})
  </Link>
</li>
       <li>
  <Link to="/cart">
    🛒 Cart ({cartCount})
  </Link>
</li>
<li>
  <Link to="/orders">📦 My Orders</Link>
</li>
<li>
  <Link to="/dashboard/seller">
    Seller Dashboard
  </Link>
</li>
        <li>
  <button
    className="mode-btn"
    onClick={() => setDarkMode(!darkMode)}
  >
    {darkMode ? "☀️" : "🌙"}
  </button>
</li>
       {user ? (
  <>
    <li className="user-profile">
      <Link to="/profile" className="profile-icon">
        <FaUserCircle size={28} />
      </Link>
    </li>

    <li>👤 {user.name}</li>

    <li>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.reload();
        }}
      >
        Logout
      </button>
    </li>
  </>
) : (
  <li>
    <Link to="/login">Login</Link>
  </li>
)}
      </ul>
    </nav>
  );
}

export default Navbar;