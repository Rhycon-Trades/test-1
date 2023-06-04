import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function Question({faq}) {
    const [clicked , setClicked] = useState(false)

    function changeState(){
        setClicked(!clicked)
    }

  return (
    <li className="question">
      <h3 className="question__header">
        {faq.header}
        <button onClick={changeState} className="purple more">
          <FontAwesomeIcon icon={`${clicked ? "fa fa-minus" : "fa fa-plus"}`} />
        </button>
      </h3>
      <p className={`question__content ${clicked ? "show-question": "hide-question"}`}>
        {faq.description}
      </p>
    </li>
  );
}

export default Question;
