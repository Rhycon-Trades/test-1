import React, { useEffect, useState } from "react";
import Testimonial from "../ui/Testimonial";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Testimonials({ testimonials }) {
  const slider = document.getElementById('testimonials-placeholder')
  const vw = window.innerWidth
  const maxWidth = window.innerWidth > 1000 ? 100 : 300
  const [position , setPosition] = useState(0)

  useEffect(() => {
    slider !== null && (slider.style.right = position.toString() + "vw")
  }, [position])

  function slideLeft(){
    if(position !== 0){
      vw > 1000? setPosition(position - 100) : setPosition(position - 100)
    }
  }

  function slideRight(){
    if(position !== maxWidth){
      vw > 1000? setPosition(position + 100) : setPosition(position + 100)
    }
  }
  return (
    <section id="testimonials">
      <h2 className="section-title">
        Our Customers are&nbsp;<span className="purple">Satisfied</span>{" "}
      </h2>
      <div id="testimonials-placeholder">
        <div className="testimonials-wrapper">
          {testimonials != null ? (
            testimonials
              .slice(0, 4)
              .map((testimonial) => (
                <Testimonial testimonial={testimonial} key={testimonial.id} />
              ))
          ) : (
            <>
              <div className="testimonial">
                <figure className="testimonial--img">
                  <span className="skeleton-img" />
                </figure>
                <div className="testimonial--content">
                  <span className="skeleton-line-header"> </span>
                  <span className="skeleton-line" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="testimonials--arrows">
        <button onClick={slideLeft} className="testimonial__arrow">
          <FontAwesomeIcon icon='fa fa-arrow-left' />
        </button>
        <button onClick={slideRight} className="testimonial__arrow">
          <FontAwesomeIcon icon='fa fa-arrow-right' />
        </button>
      </div>
    </section>
  );
}

export default Testimonials;
