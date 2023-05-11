import React from "react";
import { Link } from "react-router-dom";
import { signUpUser } from "../../functions/auth";

function SignUp() {
  return (
    <div className="auth-container">
      <div className="modal">
        <figure className="modal--block modal--figure">
          <img
            className="modal--block__img"
            src="https://media.discordapp.net/attachments/1045402320252444693/1094942562801954846/unnamed_2.jpg?width=604&height=604"
          />
        </figure>
        <div className="modal--block modal--content">
          <p className="block--note">welcome</p>
          <h3 className="block--header">Sign Up to rhycon</h3>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              signUpUser(event.target[0].value, event.target[1].value);
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
