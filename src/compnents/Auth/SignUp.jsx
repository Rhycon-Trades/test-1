import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, redirect } from "react-router-dom";
import { auth } from "../../firebase/init";

function SignUp({ setUser , displayOperation }) {

  const [error , setError] = useState(false)

  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        displayOperation("your account have been created" , true)
        setError(false)
        
      })
      .catch((error) => {
        setError(error.message);
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
          <p className="block--note">welcome</p>
          <h3 className="block--header">Sign Up to rhycon</h3>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              signUp(event.target[0].value, event.target[1].value);
            }}
            className="block--form"
          >
            <input
              className="block--form__input"
              type="email"
              placeholder="enter your email"
            />
            <input
              className="block--form__input"
              type="password"
              placeholder="enter a password"
            />
            <input
              className="block--form__input block--form__submit"
              type="submit"
            />
            {error && <p className="error">an error ocured</p>}
          </form>
          <p className="block--change-method">
            Already a member <Link to='/signin' className="purple">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
