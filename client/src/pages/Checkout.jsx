import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
function Checkout() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
const { cart, setCart } = useContext(CartContext);
  const handleOrder = async (e) => {
    e.preventDefault();

    if (!name || !address || !phone) {
      toast.error("Please fill all details!");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:5000/api/orders/create", {
  user: JSON.parse(localStorage.getItem("user"))._id,

  products: cart.map((item) => ({
    productId: item._id,
    name: item.name,
    price: item.price,
    qty: item.qty,
  })),

  name,
  address,
  phone,

  totalAmount: cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  ),
});
const newOrder = {
  products: cart,
  name,
  address,
  phone,
  totalAmount: cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  ),
  status: "Pending",
  orderDate: new Date().toLocaleDateString(),
  deliveryDate: new Date(
    Date.now() + 5 * 24 * 60 * 60 * 1000
  ).toLocaleDateString(),
};
const oldOrders =
  JSON.parse(localStorage.getItem("orders")) || [];

localStorage.setItem(
  "orders",
  JSON.stringify([...oldOrders, newOrder])
);
setCart([]);
localStorage.removeItem("cart");
      toast.success("🎉 Order Placed Successfully!");

      setTimeout(() => {
        navigate("/success");
      }, 1500);

    } catch (error) {
      toast.error(error.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="checkout-container">
      <h2>🛒 Checkout</h2>

      <form onSubmit={handleOrder}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br /><br />

        <input
          type="tel"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br /><br />

        <button type="submit">
          ✅ Place Order
        </button>
      </form>

      <br />

      <Link to="/">
        <button>⬅ Back to Home</button>
      </Link>
    </div>
  );
}

export default Checkout;