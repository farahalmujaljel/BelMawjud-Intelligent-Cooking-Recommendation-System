import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const navigate = useNavigate();

  // Helpers
  const containsArabic = (value) => /[\u0600-\u06FF]/.test(value);
  const validateEmailFormat = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSignUp = async () => {
    let valid = true;

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmError("");

    // NAME VALIDATION
    if (!fullName.trim()) {
      setNameError("Full name is required");
      valid = false;
    } else if (containsArabic(fullName)) {
      setNameError("Name cannot contain Arabic letters");
      valid = false;
    }

    // EMAIL VALIDATION
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (containsArabic(email)) {
      setEmailError("Email cannot contain Arabic letters");
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

    // CONFIRM PASSWORD
    if (!confirm) {
      setConfirmError("Please confirm your password");
      valid = false;
    } else if (confirm !== password) {
      setConfirmError("Passwords do not match");
      valid = false;
    }

    if (!valid) return;

    // SEND TO BACKEND
    try {
      const response = await axios.post("http://127.0.0.1:5001/register", {
        name: fullName,
        email,
        password,
      });

      alert("Account Created Successfully!");
      navigate("/signin");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration failed, please try again."
      );
    }
  };

  return (
    <div className="signup-container">
      <img
        src="/assets/BelMawjudLogo 4.png"
        alt="logo"
        className="signup-logo"
      />

      <h2 className="signup-title">Create Your Account</h2>

      <div className="signup-form">

        {/* FULL NAME */}
        <input
          type="text"
          placeholder="Full Name"
          className={`input-box ${nameError ? "error-border" : ""}`}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        {nameError && <p className="error-text">{nameError}</p>}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email Address"
          className={`input-box ${emailError ? "error-border" : ""}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="error-text">{emailError}</p>}

        {/* PASSWORD */}
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`input-box password-input ${
              passwordError ? "error-border" : ""
            }`}
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

        {/* CONFIRM PASSWORD */}
        <div className="password-wrapper">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            className={`input-box password-input ${
              confirmError ? "error-border" : ""
            }`}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <img
            src="/assets/PasswordInvisible 2.png"
            alt="eye"
            className="eye-icon"
            onClick={() => setShowConfirm(!showConfirm)}
          />
        </div>
        {confirmError && <p className="error-text">{confirmError}</p>}

        <button className="signup-btn" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default SignUp;
