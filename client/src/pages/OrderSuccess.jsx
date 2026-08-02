import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="success-page">

      <div className="success-card">
        <div className="success-icon">
          ✅
        </div>

        <h1>Order Placed Successfully!</h1>

        <p>
          Thank you for shopping with Artisan's Corner ❤️
        </p>

        <p>
          Your handmade products will be delivered soon.
        </p>

        <Link to="/">
          <button className="home-btn">
            🏠 Continue Shopping
          </button>
        </Link>

      </div>

    </div>
  );
}

export default OrderSuccess;