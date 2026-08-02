import Cart from "../components/Cart";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CartPage() {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  return (
    <div>
      <Link to="/">
        ⬅ Back to Home
      </Link>

      <Cart cart={cart} setCart={setCart} />
    </div>
  );
}

export default CartPage;