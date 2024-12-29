import React, { useState } from "react";
import { auth, database } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import "../Styles/LoginPage.css"; // Reusing the same CSS

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Register user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save to Firebase Database
      await set(ref(database, `acc/${user.uid}`), {
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      alert("Registration successful!");
      navigate("/"); // Redirect to Login Page
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLoginNavigation = () => {
    navigate("/"); // Navigate to Login Page
  };

  return (
    <div className="Wrapper">
      <h1 className="pageTitle">Register</h1>
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

        <button className="loginbutt" onClick={handleRegister}>
          Register
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p className="registerText">
          Already have an account?{" "}
          <span className="registerLink" onClick={handleLoginNavigation}>
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
