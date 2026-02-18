import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../screens/SignIn.css";
import axios from "axios";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Validation helpers
  const containsArabic = (value) => /[\u0600-\u06FF]/.test(value);
  const validateEmailFormat = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const containsCapital = (value) => /[A-Z]/.test(value);

  const handleSignIn = async () => {
    let valid = true;

    setEmailError("");
    setPasswordError("");

    // EMAIL VALIDATION
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (containsArabic(email)) {
      setEmailError("Email cannot contain Arabic letters");
      valid = false;
    } else if (!containsCapital(email)) {
      setEmailError("Email must contain at least 1 capital letter (A-Z)");
      valid = false;
    } else if (!validateEmailFormat(email)) {
      setEmailError("Enter a valid email address");
      valid = false;
    }

    // PASSWORD VALIDATION
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    }

    if (!valid) return;

    // ============================
    // REAL LOGIN REQUEST
    // ============================
    try {
      const response = await axios.post("http://127.0.0.1:5001/login", {
        email: email,
        password: password,
      });

      if (response.data.status === "success") {
        const user = response.data.user;

        // Save user data + ID correctly
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("user_id", user.user_id);

        alert("Login Successful!");

        navigate("/home");
      } else {
        alert(response.data.message || "Invalid email or password");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed, please check your credentials"
      );
    }
  };

  return (
    <div className="signin-container">
      {/* LOGO */}
      <img
        src="/assets/BelMawjudLogo 4.png"
        alt="logo"
        className="signin-logo"
      />

      <h1 className="signin-title">Sign In</h1>

      {/* EMAIL FIELD */}
      <input
        type="text"
        placeholder="Email Address"
        className={`input-box ${emailError ? "error-border" : ""}`}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailError && <p className="error-text">{emailError}</p>}

      {/* PASSWORD FIELD */}
      <div className="password-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className={`input-box ${passwordError ? "error-border" : ""}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <img
          src="/assets/PasswordInvisible 2.png"
          alt="eye"
          className="eye-icon"
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>
      {passwordError && <p className="error-text">{passwordError}</p>}

      {/* BUTTON */}
      <button className="signin-btn" onClick={handleSignIn}>
        Sign In
      </button>

      {/* OR */}
      <p className="or-text">Or sign in with</p>

      <div className="social-container">
        <img src="/assets/Facebook (2) 3.png" className="social-icon" alt="fb" />
        <img src="/assets/Google (2) 3.png" className="social-icon" alt="google" />
        <img src="/assets/Apple (2) 3.png" className="social-icon" alt="apple" />
      </div>

      <p className="signup-text">
        Don’t have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default SignIn;
