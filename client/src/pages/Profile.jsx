import { Link } from "react-router-dom";
function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profile-container">

      <div className="profile-card">
        <h2>👤 My Profile</h2>

        {user ? (
          <>
            <h3>{user.name}</h3>
            <p>📧 {user.email}</p>

            <Link to="/cart">
              <button>View Cart</button>
            </Link>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.reload();
              }}
            >
              Logout
            </button>
            <Link to="/">
  <button>⬅️ Back to Home</button>
</Link>
          </>
        ) : (
          <p>Please Login First</p>
        )}

      </div>

    </div>
  );
}

export default Profile;