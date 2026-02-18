import React, { useEffect, useState } from "react";
import "./Rewards.css";
import { useNavigate } from "react-router-dom";

function Rewards() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);     
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [remainingPoints, setRemainingPoints] = useState(0);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    console.log("🔥 REWARDS PAGE — LOADED USER:", savedUser);

    if (savedUser) {
      setUser(savedUser);

      fetch(`http://127.0.0.1:5001/get_points/${savedUser.user_id}`)
        .then(res => res.json())
        .then(data => {
          console.log("🔥 REWARDS PAGE — POINTS:", data);
          setPoints(data.points);
          setRemainingPoints(data.points);
        })
        .catch(err => console.log(err));
    }
  }, []);

  // Load rewards (from ingredients table)
  useEffect(() => {
    fetch("http://127.0.0.1:5001/ingredients")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.log("Error fetching rewards:", err));
  }, []);

  // Total selected points
  const getTotal = () => {
    return selected.reduce((sum, item) => sum + item.points_required, 0);
  };

  // Add or remove selected items
  const toggleSelect = (item) => {
    const already = selected.some((i) => i.ingredient_id === item.ingredient_id);

    if (already) {
      setSelected(selected.filter((i) => i.ingredient_id !== item.ingredient_id));
      setRemainingPoints(remainingPoints + item.points_required);
      return;
    }

    if (item.points_required > remainingPoints) return;

    setSelected([...selected, item]);
    setRemainingPoints(remainingPoints - item.points_required);
  };

  // NEXT: Save and go to pickup screen
  const handleNext = () => {
    localStorage.setItem("selected_rewards", JSON.stringify(selected));
    navigate("/pickup"); 
  };

  return (
    <div className="rewards-page">

      {/* POINTS BAR */}
      <div className="points-bar">
        <img src="/assets/Star (2) 3.png" className="points-icon" alt="star" />
        <span className="points-text">{points} Points</span>
      </div>

      {/* TITLE */}
      <h2 className="rewards-title">BelMawjud Rewards</h2>

      {/* LIST OF ITEMS */}
      <div className="rewards-list">
        {items.map((item) => {
          const isSelected = selected.some((i) => i.ingredient_id === item.ingredient_id);
          const isDisabled = item.points_required > remainingPoints && !isSelected;

          return (
            <div
              key={item.ingredient_id}
              className={`reward-row ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
              onClick={() => {
                if (!isDisabled || isSelected) {
                  toggleSelect(item);
                }
              }}
            >
              <span className="reward-name">{item.name}</span>

              <div className="reward-points-box">
                <span className="reward-points">{item.points_required}</span>
                <img src="/assets/Star (2) 3.png" className="reward-star" alt="star" />
              </div>
            </div>
          );
        })}
      </div>

      {/* NEXT BUTTON */}
      <button className="next-btn" onClick={handleNext}>
        Next
      </button>

    </div>
  );
}

export default Rewards;
