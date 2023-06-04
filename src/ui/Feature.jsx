import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Feature({ typeIsAccurate }) {
  return (
    <div className="feature">
      <span className="feature__logo">
        <FontAwesomeIcon
          icon={`${
            typeIsAccurate ? " fa fa-magnifying-glass" : "fa fa-wallet"
          }`}
        />
      </span>
      <h3 className="feature__header">
        {typeIsAccurate
          ? "Accurate Indicator: Trustworthy Results"
          : "Affordable Solutions: Budget friendly"}
      </h3>
      <p className="features__para">
        {typeIsAccurate
          ? "Our accurate indicator provides trustworthy results that you can depend on. With our expert analysis and attention to detail, you can be confident that you're getting the most accurate data possible."
          : " Maximize your resources with our budget-friendly solutions. Our experienced team will work with you to find the most cost-effective solutions that exceed your expectations."}
      </p>
    </div>
  );
}

export default Feature;
