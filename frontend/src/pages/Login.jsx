import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", formData);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/chat");
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <div className="auth-logo">
     <img src="/discord-logo.svg" alt="Discord Clone Logo" />
    </div>
        <h1>Welcome Back</h1>
        <p>Login to continue chatting.</p>

        {error && <div className="error">{error}</div>}

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

        <button type="submit">Login</button>

        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;