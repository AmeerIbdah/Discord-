import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleRegister}>
        <div className="auth-logo">
         <img src="/discord-logo.svg" alt="Discord Clone Logo" />
        </div>
        <h1>Create Account</h1>
        <p>Join the chat and start messaging.</p>

        {error && <div className="error">{error}</div>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Register</button>

        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
}

export default Register;