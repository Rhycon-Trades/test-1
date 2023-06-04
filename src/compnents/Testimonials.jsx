import React, { useEffect, useState } from "react";
import Testimonial from "../ui/Testimonial";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDoc, collection } from "firebase/firestore";
import Operation from './../ui/Operation'
import { db } from "../firebase/init";

function Testimonials({ testimonials, user }) {
  const slider = document.getElementById("testimonials-placeholder");
  const [displayReview, setDisplayReview] = useState(false);
  const vw = window.innerWidth;
  const maxWidth = window.innerWidth > 1000 ? 100 : 300;
  const [position, setPosition] = useState(0);
  const [displayOperation, setDisplayOperation] = useState(false);
  const [operationState, setOperationState] = useState(true);
  const [operationMessage, setOperationMessage] = useState("");

  useEffect(() => {
    slider !== null && (slider.style.right = position.toString() + "vw");
  }, [position]);

  function slideLeft() {
    if (position !== 0) {
      vw > 1000 ? setPosition(position - 100) : setPosition(position - 100);
    }
  }

  function slideRight() {
    if (position !== maxWidth) {
      vw > 1000 ? setPosition(position + 100) : setPosition(position + 100);
    }
  }

  function isReview() {
    if (user) {
      setDisplayReview(true);
    } else {
      window.location.pathname = "/signin";
    }
  }

  async function addTestimonial(event) {
    event.preventDefault();
    await addDoc(collection(db, "testimonials"), {
      name: user.displayName,
      description: event.target[1].value,
      rating: event.target[0].value,
      display: false,
    }).then(() => {
      setDisplayReview(false);
      setDisplayOperation(true)
      setOperationMessage('review have been sent')
      setOperationState(true)
    }).catch(() => {
      setDisplayReview(false);
      setDisplayOperation(true)
      setOperationMessage('unable to send review')
      setOperationState(false)
    })
  }

  return (
    <>
      <section id="testimonials">
        <h2 className="section-title">
          Our Customers are&nbsp;<span className="purple">Satisfied</span>{" "}
        </h2>
        <div id="testimonials-placeholder">
          <div className="testimonials-wrapper">
            {testimonials != null ? (
              testimonials
                .slice(0, 4)
                .map(
                  (testimonial) =>
                    testimonial.display && (
                      <Testimonial
                        testimonial={testimonial}
                        key={testimonial.id}
                      />
                    )
                )
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
            <FontAwesomeIcon icon="fa fa-arrow-left" />
          </button>
          <button onClick={() => isReview()} className="testimonial--arrow">
            write a review
          </button>
          <button onClick={slideRight} className="testimonial__arrow">
            <FontAwesomeIcon icon="fa fa-arrow-right" />
          </button>
        </div>
      </section>
      {displayReview && (
        <div className="review--write">
          <button
            className="popup--mark"
            onClick={() => setDisplayReview(false)}
          >
            <FontAwesomeIcon icon="fa fa-xmark" />
          </button>
          <div className="review__user">
            <profile className="review__user--profile-img">
              <img src={user.photoUrl} alt="" />
            </profile>
            <h5 className="review__user--profile">{user.displayName}</h5>
            <p className="review__user--note">Your voice fuels our success</p>
          </div>
          <form
            onSubmit={(event) => addTestimonial(event)}
            className="review__form"
          >
            <p className="review__form--title">Rating</p>
            <input
              required
              className="review__form--input"
              type="number"
              min={"0"}
              max={"5"}
              step={"0.5"}
              placeholder="5"
            />
            <p className="review__form--title">review</p>
            <textarea
              required
              className="review__form--input form--input-text"
              type="text"
            />
            <input
              type="submit"
              value="Submit Review"
              style={{
                borderRadius: "10px",
                resize: "none",
                height: "40px",
                padding: "8px 0",
              }}
            />
          </form>
        </div>
      )}
      {
        displayOperation && <Operation message={operationMessage} setOperation={setDisplayOperation} success={operationState} />
      }
    </>
  );
}

export default Testimonials;
