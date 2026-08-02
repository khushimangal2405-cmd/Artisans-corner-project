import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="orders-container">

      <h2 className="orders-title">
  📦 My Orders
</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div className="order-card" key={index}>

            <h3>Order #{index + 1}</h3>

            <p>👤 Name: {order.name}</p>

            <p>📍 Address: {order.address}</p>

            <p>📞 Phone: {order.phone}</p>

            <p>💰 Total: ₹{order.totalAmount}</p>

           <p className="order-status">
  🟢 {order.status || "Pending"}
</p>
<p>📅 Ordered On: {order.orderDate}</p>

<p>🚚 Expected Delivery: {order.deliveryDate}</p>
<h4>Products:</h4>

{order.products?.map((item, i) => (
  <div
    key={i}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "15px",
      margin: "10px 0",
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "10px",
    }}
  >
    <img
      src={`http://127.0.0.1:5000/uploads/${item.image}`}
      alt={item.name}
      style={{
        width: "80px",
        height: "80px",
        objectFit: "cover",
        borderRadius: "10px",
      }}
    />

    <div>
      <h4>{item.name}</h4>
      <p>Qty: {item.qty}</p>
      <p>Price: ₹{item.price}</p>
    </div>
  </div>
))}
          </div>
        ))
      )}
<Link to="/">
  <button className="home-btn">
    🏠 Back to Home
  </button>
</Link>
    </div>
  );
}

export default Orders;