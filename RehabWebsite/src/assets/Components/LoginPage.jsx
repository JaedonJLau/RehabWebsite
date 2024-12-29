import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../Styles/LoginPage.css"; // Reusing the same CSS
import Spinner from "./Spinner"; // Import the Spinner component

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Track spinner state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner
    setError(""); // Clear previous errors
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // Redirect to HomePage
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false); // Hide spinner after operation
    }
  };

  const handleRegisterNavigation = () => {
    navigate("/register"); // Navigate to Registration Page
  };

  return (
    <div className="Wrapper">
      <h1 className="pageTitle">Log In</h1>
      <div className="Container">
        <h2>Email</h2>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <h2>Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <button className="loginbutt" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging In..." : "Login"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p className="registerText">
          Don’t have an account?{" "}
          <span
            className="registerLink"
            onClick={handleRegisterNavigation}
          >
            Register
          </span>
        </p>
      </div>

      {/* Spinner */}
      {loading && <Spinner />}
    </div>
  );
};

export default LoginPage;
