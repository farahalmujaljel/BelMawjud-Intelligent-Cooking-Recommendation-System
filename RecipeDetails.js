import React, { useEffect, useState } from "react";
import "./RecipeDetails.css";
import { useLocation, useNavigate } from "react-router-dom";

function RecipeDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const recipeId = location.state?.recipe_id;

  const [data, setData] = useState({
    recipe: null,
    ingredients: [],
    instructions: [],
  });

  useEffect(() => {
    if (!recipeId) return;

    fetch(`http://127.0.0.1:5001/recipe_details/${recipeId}`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("ERROR:", err));
  }, [recipeId]);

  if (!data.recipe) return <h2 className="loading">Loading...</h2>;

  const { recipe, ingredients, instructions } = data;
  console.log("Country from DB:", recipe.origin_country);
const countryMap = {
  USA: "US",
  Italy: "IT",
  India: "IN",
  France: "FR",
  Japan: "JP",
  China: "CN",
  Mexico: "MX",
  Saudi: "SA",
  KSA: "SA",
  Germany: "DE",
  Spain: "ES",
};

const countryCode = countryMap[recipe.origin_country] || recipe.origin_country;



  return (
    <div className="details-page">

      <h2 className="details-title">Recipes</h2>

      <div className="details-card">

        {/* -------- القسم العلوي (الصورة + التقييم + العلم + العنوان) -------- */}
        <div className="top-header">
          <div className="text-side">
            <h3 className="recipe-title">{recipe.name}</h3>

         <div className="rating-column">
  <span className="rating">⭐ {recipe.rating_avg}</span>

  <img
    src={`https://flagsapi.com/${countryCode}/flat/48.png`}
    className="flag"
    alt="flag"
  />
</div>

          </div>

          <img
            src={recipe.image_url}

            className="image-top-right"
            alt=""
          />
        </div>

        {/* -------- Ingredients -------- */}
        <div className="section">
          <strong>Ingredients :</strong>
          <ul className="ingredients-list">
            {ingredients.map((ing) => (
              <li key={ing.ingredient_id}>{ing.name}</li>
            ))}
          </ul>
        </div>

        {/* -------- Steps -------- */}
        <div className="section">
          <strong>How it's made :</strong>
          <div className="steps-text">
            {instructions.map((step) => (
              <p key={step.step_number}>
                <b>{step.step_number}.</b> {step.description}
              </p>
            ))}
          </div>
        </div>

        {/* --------time -------- */}
        <div className="time-row">
  <img 
    src="/assets/time 3.png" 
    alt="time" 
    className="time-icon" 
  />
  <span>{recipe.prep_time} mins</span>
</div>



      </div>

      <div className="buttons-row">
  <button className="action-btn" onClick={() => navigate(-1)}>
    Back
  </button>


  <button
    className="action-btn"
    onClick={() =>
      navigate("/evaluation", { state: { recipe_id: recipeId } })
    }
  >
    Next
  </button>
</div>

    </div>
  );
}

export default RecipeDetails;
