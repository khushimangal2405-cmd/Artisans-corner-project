import { Link } from "react-router-dom";
function Cart({ cart, setCart }) {
  const increaseQty = (index) => {
  const updatedCart = [...cart];
  updatedCart[index].qty += 1;

  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

  const decreaseQty = (index) => {
    const updatedCart = [...cart];

    if (updatedCart[index].qty > 1) {
  updatedCart[index].qty -= 1;

  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
}
  };

  const removeItem = (index) => {
  const updatedCart = cart.filter((_, i) => i !== index);

  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="cart-container">
      <h2>🛒 Shopping Cart</h2>
      <p className="cart-count">
🛒 Items: {cart.reduce((sum, item) => sum + item.qty, 0)}
</p>
      {cart.length === 0 ? (
       <div className="empty-cart">
  <h2>🛒 Your Cart is Empty</h2>
  <p>Add some beautiful handmade products!</p>

  <Link to="/">
    <button className="back-home-btn">
      ⬅ Continue Shopping
    </button>
  </Link>
</div>
      ) : (
        <>
          {cart.map((item, index) => (
           <div className="cart-item" key={index}>

  <img
    src={`http://127.0.0.1:5000/uploads/${item.image}`}
    alt={item.name}
    className="cart-image"
  />

  <div className="cart-info">

   <h3>{item.name}</h3>
    <p className="cart-price">₹{item.price}</p>

    <div className="qty-box">
      <button
        className="qty-btn"
        onClick={() => decreaseQty(index)}
      >
        -
      </button>

      <span className="qty-number">
        {item.qty}
      </span>

      <button
        className="qty-btn"
        onClick={() => increaseQty(index)}
      >
        +
      </button>
    </div>

  </div>

  <button
    className="remove-btn"
    onClick={() => removeItem(index)}
  >
    ❌ Remove
  </button>

</div>
          ))}
          <div className="cart-summary">

  <h2 className="cart-total">
    Total: ₹{total}
  </h2>

  <Link to="/checkout">
    <button className="checkout-btn">
      ✅ Proceed to Checkout
    </button>
  </Link>

</div>
        </>
      )}
    </div>
  );
}

export default Cart;