import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/init";

function SignUp({displayOperation}) {

  const [error , setError] = useState(false)

  function changePassword(email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        displayOperation("an email have been sent to your inbox" , true)
        setError(false)
      })
      .catch(() => {
        setError(true)
      });
  };

  return (
    <div className="auth-container">
      <div className="modal">
        <figure className="modal--block modal--figure">
          <img
            className="modal--block__img"
            src="https://cdn.discordapp.com/attachments/1088531111942037534/1106309210200866956/RhyconTrades_the_real_world_with_a_portal_that_leads_to_a_room__c462b3a0-3e94-4e17-8674-ecf3e0f17ae3.png"
          />
        </figure>
        <div className="modal--block modal--content">
          <h3 className="block--header">Forget Password</h3>
          <p className="block--note">
            an email will be send to your inbox
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              changePassword(event.target[0].value);
            }}
            className="block--form"
          >
            <input
              className="block--form__input"
              type="email"
              placeholder="enter your email"
            />
            <input
              className="block--form__input block--form__submit"
              type="submit"
            />
            {error && <p className="error">This email doesn't exist</p>}
          </form>
          <p className="block--change-method">
            remember password? <Link to='/signin' className="purple">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
