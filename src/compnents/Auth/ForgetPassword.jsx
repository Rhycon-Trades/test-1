import React from "react";
import { Link } from "react-router-dom";
import { changePassword } from "../../functions/auth";

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
