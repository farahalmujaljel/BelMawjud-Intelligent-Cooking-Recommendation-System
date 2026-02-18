import React, { useState } from "react";
import "./Help.css";
import { useNavigate } from "react-router-dom";

function Help() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    if (!email || !msg) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5001/submit_help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message: msg }),
      });

      const data = await res.json();

      if (data.status === "success") {
        setSuccess("Your message has been sent! We will contact you soon.");
        setEmail("");
        setMsg("");
      } else {
        alert("Error sending message.");
      }
    } catch (error) {
      console.log("HELP ERROR:", error);
    }
  };

  return (
    <div className="help-page">

      {/* POINTS BAR */}
      <div className="help-points-bar">
        <img src="/assets/Star (2) 3.png" className="points-icon" alt="star" />
        <span className="points-text">{user?.points} Points</span>
      </div>

      <h2 className="help-title">Help</h2>

      <div className="help-box">

        {/* ABOUT THE APP */}
        <div className="help-section-title">About the App</div>

        <p className="help-text">
          <b>BelMawjud</b> is a smart recipe app that helps you cook with the
          ingredients you already have at home. Simply select ingredients, get
          recipe suggestions, and start cooking. Every time you complete a
          recipe, upload an image, and rate it, you will earn 200 points that
          can be used in the rewards section.
        </p>

        {/* FAQ */}
        <div className="help-section-title">FAQ (Frequently Asked Questions)</div>

        <p className="faq-q"><b>Q1: What can I do with my points?</b></p>
        <p className="faq-a">
          Points can be used to buy cooking ingredients in the BelMawjud Rewards section.
        </p>

        <p className="faq-q"><b>Q2: Are all recipes free to view?</b></p>
        <p className="faq-a">
          Yes, all recipes are free and available for every user.
        </p>

        <p className="faq-q"><b>Q3: Do I need to upload an image to earn points?</b></p>
        <p className="faq-a">
          Yes, uploading an image and rating the recipe are required to get the 200 points.
        </p>

        <p className="faq-q"><b>Q4: How can I contact support if I face an issue?</b></p>
        <p className="faq-a">
          You can reach the BelMawjud team through the Contact Us section at the bottom of this page.
        </p>

        {/* CONTACT SUPPORT */}
        <div className="help-section-title">Contact Support</div>

        <input
          type="email"
          className="help-input"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          className="help-textarea"
          placeholder="Message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />

        {success && <p className="success-msg">{success}</p>}

        <div className="help-buttons">
          <button className="help-back" onClick={() => navigate("/profile")}>
            Back
          </button>

          <button className="help-submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Help;
