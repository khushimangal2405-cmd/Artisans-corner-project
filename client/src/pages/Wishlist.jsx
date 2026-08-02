import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { Link } from "react-router-dom";
function Wishlist() {
  const { wishlist } = useContext(WishlistContext);

  return (
    <div style={{ padding: "30px" }}>
      <h1>❤️ My Wishlist</h1>

      {wishlist.length === 0 ? (
        <h3>No items in Wishlist</h3>
      ) : (
        wishlist.map((item) => (
          <div key={item._id} style={{ marginBottom: "20px" }}>
            <h2>{item.name}</h2>

            <img
              src={`http://127.0.0.1:5000/uploads/${item.image}`}
              alt={item.name}
              width="200"
            />

            <h3>₹{item.price}</h3>

            <hr />
          </div>
        ))
      )}
      <br />

<Link to="/">
  <button>⬅ Back to Home</button>
</Link>
    </div>
  );
}

export default Wishlist;