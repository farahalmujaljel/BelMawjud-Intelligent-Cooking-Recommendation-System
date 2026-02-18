import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Evaluation.css";

function Evaluation() {
  const location = useLocation();
  const navigate = useNavigate();
  const recipeId = location.state?.recipe_id;
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const preview = image ? URL.createObjectURL(image) : null;

  const [points, setPoints] = useState(0);         
  const [showEarned, setShowEarned] = useState(false);
  useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("user"));
  if (saved) setUser(saved);
}, []);

  const [user, setUser] = useState(null);

  // -------------------------------
  // Load user & fetch real points
  // -------------------------------
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);

    if (savedUser) {
      fetch(`http://127.0.0.1:5001/get_points/${savedUser.user_id}`)
        .then((res) => res.json())
        .then((data) => setPoints(data.points))
        .catch((err) => console.log("Error loading points:", err));
    }
  }, []);

  // -------------------------------
  // Handle image upload
  // -------------------------------
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    
  };

  // -------------------------------
  // Handle Submit
  // -------------------------------
  const handleSubmit = async () => {
  console.log("HANDLE SUBMIT CLICKED");

  const formData = new FormData();


  if (rating > 0) {
    formData.append("rating", rating);
  }

  
  formData.append("user_id", user.user_id);
  formData.append("recipe_id", recipeId);


  if (image) {
    formData.append("image", image);
  }

  try {
    const res = await fetch("http://127.0.0.1:5001/submit_evaluation", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("SERVER RESPONSE:", data);

    const earned = data.earned || 0;

    if (earned > 0) {
      alert(`Thank you! You earned +${earned} points 🎉`);

      const updatedUser = { ...user, points: user.points + earned };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setPoints(updatedUser.points);

    } else {
      alert("Your evaluation was submitted successfully.");
    }

  } catch (err) {
    console.log("ERROR SUBMITTING:", err);
    alert("Something went wrong.");
  }
};






  return (
    <div className="eval-page">
      
      {/* POINTS BANNER */}
      <div className="points-banner">
  ⭐ {user?.points ?? 0} Points
</div>


      <h2 className="eval-title">Upload and Rate</h2>

      <div className="upload-card">
        
        {/* UPLOAD BOX */}
        <label className="upload-box">
          <div className="upload-text">UPLOAD OR<br />DROP IMAGE</div>
          <input type="file" onChange={handleImageChange} />
          {preview && (
  <img src={preview} alt="preview" className="preview-img" />
)}
        </label>
        


        {/* RATING */}
        <div className="rate-text">Rate the recipe</div>

        <div className="stars">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              className={num <= rating ? "star filled" : "star"}
              onClick={() => setRating(num)}
            >
              ★
            </span>
          ))}
        </div>

        {/* SUBMIT */}
        <button className="submit-btn" onClick={handleSubmit}>
   Save & Submit
</button>


        {/* SHOW EARNED ONLY AFTER SUBMISSION */}
        {showEarned && (
          <p className="earned-text">
            You earned <span className="points">+200</span> points in BelMawjud Rewards
          </p>
        )}
      </div>

      {/* NAV BUTTONS */}
      <div className="nav-buttons">
        <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
        <button className="next-btn" onClick={() => navigate("/rewards")}>Next</button>
      </div>
    </div>
  );
}

export default Evaluation;
