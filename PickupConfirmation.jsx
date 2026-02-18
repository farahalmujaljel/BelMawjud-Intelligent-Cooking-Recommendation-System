import React from "react";
import { useNavigate } from "react-router-dom";
import "./PickupConfirmation.css";

function PickupConfirmation() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="confirm-wrapper">

      {/* TOP POINTS BAR LIKE HOME */}
      <div className="top-bar">
        <img src="/assets/Star (2) 3.png" className="top-star" alt="star" />
        <span className="top-points">{user?.points || 0} Points</span>
      </div>

      {/* TITLE */}
      <h2 className="confirm-title">Pickup Confirmation</h2>

      {/* WHITE BOX CARD */}
      <div className="confirm-card">
        
        <img
          src="/assets/confirmed4.png"
          className="confirm-icon"
          alt="confirmed"
        />

        <h3 className="confirm-header">Pickup Confirmed</h3>
        <p className="confirm-thanks">Thank you for your order!</p>

        <p className="confirm-note">
          Please come to collect your ingredients at the chosen Farm Superstores location.
        </p>
      </div>

      {/* BOTTOM NAV */}
<div className="bottom-nav">

  {/* HOME */}
  <div className="nav-item" onClick={() => navigate("/home")}>
    <img src="/assets/HomeSelected 3.png" alt="home" />
    <span>Home</span>
  </div>

  {/* RECIPES */}
  <div className="nav-item" onClick={() => navigate("/recipes")}>
    <img src="/assets/RecipesSelected 4.png" alt="recipes" />
    <span>Recipes</span>
  </div>

  {/* REWARDS */}
  <div className="nav-item" onClick={() => navigate("/rewards")}>
    <img src="/assets/BelMawjudRewardsSelected 3.png" alt="rewards" />
    <span>Rewards</span>
  </div>

  {/* PROFILE */}
  <div className="nav-item" onClick={() => navigate("/profile")}>
    <img src="/assets/ProfileSelected 2.png" alt="profile" />
    <span>Profile</span>
  </div>

</div>


    </div>
  );
}

export default PickupConfirmation;
