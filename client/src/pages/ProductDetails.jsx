import { useLocation, Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { useEffect, useState } from "react";
import axios from "axios";
function ProductDetails() {
  const { state } = useLocation();
  const { addToCart } = useContext(CartContext);
const { addToWishlist } = useContext(WishlistContext);
const [reviews, setReviews] = useState([]);
const [reviewData, setReviewData] = useState({
  userName: "",
  rating: "",
  comment: "",
});
console.log(state);
useEffect(() => {
  if(state){
    axios
      .get(`http://127.0.0.1:5000/api/reviews/${state._id}`)
      .then((res)=>setReviews(res.data))
      .catch((err)=>console.log(err));
  }
}, [state]);
  if (!state) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h2>Product Not Found</h2>
        <Link to="/">⬅ Back to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      <h1>{state.name}</h1>

      <img
        src={`http://127.0.0.1:5000/uploads/${state.image}`}
        alt={state.name}
        style={{
          width: "300px",
          borderRadius: "10px",
        }}
      />

      <h2>₹{state.price}</h2>
<div
  className="product-rating"
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    width: "100%",
  }}
>
  <span>⭐⭐⭐⭐⭐</span>
  <span>(4.8)</span>
</div>
      <p>{state.description}</p>

      <h3>Category: {state.category}</h3>

      <h3>Stock: {state.stock}</h3>
<button
  onClick={() => addToCart(state)}
  style={{ marginRight: "10px" }}
>
  🛒 Add To Cart
</button>

<button
  onClick={() => addToWishlist(state)}
>
  ❤️ Wishlist
</button>
<br /><br />
<h2>⭐ Customer Reviews</h2>

{reviews.length === 0 ? (
  <p>No reviews yet</p>
) : (
  reviews.map((review) => (
    <div key={review._id} style={{
      border:"1px solid #ddd",
      padding:"10px",
      margin:"10px auto",
      width:"80%",
      borderRadius:"10px"
    }}>
      <h4>{review.userName}</h4>
      <p>⭐ {review.rating}/5</p>
      <p>{review.comment}</p>
    </div>
  ))
)}

<h3>Add Your Review</h3>

<input
  placeholder="Your Name"
  value={reviewData.userName}
  onChange={(e)=>
    setReviewData({
      ...reviewData,
      userName:e.target.value
    })
  }
/>

<br/>

<input
  placeholder="Rating (1-5)"
  value={reviewData.rating}
  onChange={(e)=>
    setReviewData({
      ...reviewData,
      rating:e.target.value
    })
  }
/>

<br/>

<textarea
  placeholder="Write Review"
  value={reviewData.comment}
  onChange={(e)=>
    setReviewData({
      ...reviewData,
      comment:e.target.value
    })
  }
/>

<br/>

<button
  onClick={async () => {
    try {
      await axios.post(
        "http://127.0.0.1:5000/api/reviews/add",
        {
          productId: state._id,
          userName: reviewData.userName,
          rating: reviewData.rating,
          comment: reviewData.comment,
        }
      );

      alert("Review Added Successfully");

      setReviewData({
        userName: "",
        rating: "",
        comment: "",
      });

      const res = await axios.get(
        `http://127.0.0.1:5000/api/reviews/${state._id}`
      );

      setReviews(res.data);

    } catch (error) {
      console.log(error);
    }
  }}
>
  Submit Review
</button>
      <Link to="/">
        <button>⬅ Back</button>
      </Link>
    </div>
  );
}

export default ProductDetails;