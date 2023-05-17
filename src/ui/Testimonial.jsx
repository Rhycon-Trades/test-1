import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Testimonial({ testimonial }) {
  const rating = testimonial.rating;

  return (
    <div className="testimonial">
      <div className="testimonial--content">
        <h3 className="testimonial__name">{testimonial.name}</h3>
        <p className="testimonial__rating">
          {rating && new Array(Math.floor(rating)).fill(0).map((_, index) => (
            <FontAwesomeIcon icon="fa fa-star" key={index} />
          ))}
          {rating != ~~rating && <FontAwesomeIcon icon="fa fa-star-half" />}
        </p>
        <p className="testimonial__description">{testimonial.description}</p>
      </div>
    </div>
  );
}

export default Testimonial;
