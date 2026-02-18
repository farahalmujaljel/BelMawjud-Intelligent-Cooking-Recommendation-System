import React, { useEffect } from "react";
import "../screens/Splash.css";

function Splash() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/signin";
    }, 6000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="splash-container">
      <img
        src="/assets/BelMawjudLogo 4.png"
        alt="logo"
        className="splash-logo"
      />

      <p className="version-text">
        Version 1.0 | IAU Artificial Intelligence | Group 5
      </p>
    </div>
  );
}

export default Splash;
