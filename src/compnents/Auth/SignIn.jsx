import React, { useState } from "react";
import { Link, redirect } from "react-router-dom";
import { auth } from "../../firebase/init";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignIn({ setUser , displayOperation }) {

  const [error , setError] = useState(false)

  function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        displayOperation("you are now signed in" , true)
        setError(false)
      })
      .catch((error) => {
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
          <p className="block--note">welcome back</p>
          <h3 className="block--header">Sign in to rhycon</h3>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              signIn(event.target[0].value, event.target[1].value);
            }}
            className="block--form"
          >
            <input
              className="block--form__input"
              type="email"
              placeholder="enter your email"
            />
            <input
              className="block--form__input form__input--password"
              type="password"
              placeholder="enter your password"
            />
            <Link to='/passwordreset' className="block--change-method form__input--forget">
                Forget Password
            </Link>
            <input
              className="block--form__input block--form__submit"
              type="submit"
            />
            {error && <p className="error">check your email or password</p>}
          </form>
          <p className="block--change-method">
            not a member <Link to='/signup' className="purple">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
