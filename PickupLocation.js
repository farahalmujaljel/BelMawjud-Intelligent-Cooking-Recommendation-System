import React, { useEffect, useState } from "react";
import "./PickupLocation.css";
import { useNavigate } from "react-router-dom";

function PickupLocation() {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);

  // ==== LOAD USER POINTS ====
  const [points, setPoints] = useState(600); // default
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      fetch(`http://127.0.0.1:5001/get_points/${user.user_id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.points !== undefined) {
            setPoints(data.points);
          }
        })
        .catch((err) => console.log("POINTS ERROR:", err));
    }
  }, []);

  // ==== LOAD BRANCHES ====
  useEffect(() => {
    fetch("http://127.0.0.1:5001/branches")
      .then((res) => res.json())
      .then((data) => {
        console.log("🔥 RAW BRANCHES FROM BACKEND:", data);

        if (Array.isArray(data)) {
          setBranches(data);
        } else {
          console.log("❌ Backend did NOT return an array!");
          setBranches([]);
        }
      })
      .catch((err) => console.error("Branches error:", err));
  }, []);

  // ==== PLACE ORDER ====
  const handlePlaceOrder = async () => {
    if (!selectedBranch) {
      alert("Please select a pickup location.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const selectedRewards =
      JSON.parse(localStorage.getItem("selected_rewards")) || [];

    const totalCost = selectedRewards.reduce(
      (sum, item) => sum + item.points_required,
      0
    );

    try {
      const res = await fetch("http://127.0.0.1:5001/place_order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.user_id,
          total_cost: totalCost,
        }),
      });

      const data = await res.json();

      if (data.status === "success") {

        const updatedUser = { ...user, points: data.new_points };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        localStorage.setItem("selected_branch", selectedBranch);

        navigate("/pickup-confirmation");
      } else {
        alert("Order failed. Not enough points.");
      }
    } catch (err) {
      console.log("Order error:", err);
    }
  };

  return (
    <div className="pickup-page">
      {/* POINTS BAR */}
      <div className="pickup-points-bar">
        <img src="/assets/Star (2) 3.png" alt="star" className="star-icon" />
        <span className="points-text">{points} Points</span>
      </div>

      <h2 className="pickup-title">Select Pickup Location</h2>

      <p className="pickup-subtitle">
        Select the nearest Farm Superstores to pickup your ingredients
      </p>

      {/* Branch Cards */}
      <div className="branches-container">
        {branches.length === 0 && (
          <p className="no-branches">No branches found.</p>
        )}

        {branches.map((branch) => (
          <label key={branch.branch_id} className="branch-card">
            <input
              type="radio"
              name="branch"
              value={branch.branch_id}
              checked={selectedBranch === branch.branch_id}
              onChange={() => setSelectedBranch(branch.branch_id)}
            />

            <div className="branch-info">
              <h3 className="branch-name">{branch.name}</h3>

              <p className="branch-location">
                {branch.street}, {branch.city}
              </p>

              <p className="branch-time">
                🕒 {branch.open_time?.slice(0, 5)} - {branch.close_time?.slice(0, 5)}
              </p>
            </div>
          </label>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="pickup-buttons">
        <button className="pickup-back" onClick={() => navigate("/rewards")}>
          Back
        </button>

        <button className="pickup-place" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default PickupLocation;
