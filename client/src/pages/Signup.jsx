import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://127.0.0.1:5000/api/auth/signup",
        {
          name,
          email,
          password,
          role: "customer",
        }
      );

      alert("Signup Successful 🎉");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Signup failed"
      );
    }
  };

  return (
    <div style={{textAlign:"center", padding:"40px"}}>
      <h2>📝 Signup</h2>

      <form onSubmit={handleSignup}>

        <input
          placeholder="Enter Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Enter Email"
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Signup
        </button>

      </form>

      <br />

      <Link to="/login">
        Go to Login
      </Link>

    </div>
  );
}

export default Signup;