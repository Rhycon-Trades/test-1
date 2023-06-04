import React from "react";

function Profile({ user , className }) {
  return (
    <div className={`user--profile ${className}`}>
      <div className="sidebar--user__content user--profile__info">
        <figure className="user--logo user--profile__logo">
          <img src={user.photoUrl} />
        </figure>
        <p className="user--name user--profile__name">
          {user && user.displayName}
        </p>
      </div>
      <div className="user--profile__block">
        <div className="profile--block__section">
          <h5>Email</h5>
          <p>{user && user.email}</p>
        </div>
        <div className="profile--block__section">
          <h5 className="block__section--mini-title">Rhycon member since</h5>
          <p>{user && user.creationTime}</p>
        </div>
        <div className="profile--block__section">
          <h5 className="block__section--mini-title">Ranks</h5>
          <ul className="roles">
            {user.founder && (
              <li className="role">
                {" "}
                <span
                  className="role--circle"
                  style={{ backgroundColor: "#ffffff" }}
                ></span>{" "}
                Founder
              </li>
            )}
            {user.admin && (
              <li className="role">
                {" "}
                <span
                  className="role--circle"
                  style={{ backgroundColor: "rgb(194, 124, 14)" }}
                >
                  {" "}
                </span>
                Admin
              </li>
            )}
            {user.analyst && (
              <li className="role">
                {" "}
                <span
                  className="role--circle"
                  style={{ backgroundColor: "rgb(0, 122, 255)" }}
                >
                  {" "}
                </span>{" "}
                Rhycon Analyst
              </li>
            )}
            {user.support && (
              <li className="role">
                {" "}
                <span
                  className="role--circle"
                  style={{ backgroundColor: "rgb(255, 0, 0)" }}
                >
                  {" "}
                </span>{" "}
                Support
              </li>
            )}
            {user.blue_badge_trader && (
              <li className="role">
                {" "}
                <span
                  className="role--circle"
                  style={{ backgroundColor: "rgb(8, 188, 231)" }}
                >
                  {" "}
                </span>{" "}
                Blue Badge Trader
              </li>
            )}
            {user.premium_signals && (
              <li className="role">
                {" "}
                <span
                  className="role--circle"
                  style={{ backgroundColor: "rgb(194, 124, 14)" }}
                >
                  {" "}
                </span>{" "}
                Premium Signals
              </li>
            )}
            {user.premium_trader && (
              <li className="role">
                {" "}
                <span
                  className="role--circle"
                  style={{ backgroundColor: "rgb(158, 31, 229)" }}
                >
                  {" "}
                </span>{" "}
                Premium Trader
              </li>
            )}
            {user.booster && (
              <li className="role">
                {" "}
                <span
                  className="role--circle"
                  style={{ backgroundColor: "rgb(244, 127, 255)" }}
                >
                  {" "}
                </span>{" "}
                Rhycon Booster
              </li>
            )}
            {user.crypto && (
              <li className="role">
                {" "}
                <span
                  className="role--circle"
                  style={{ backgroundColor: "rgb(46, 204, 113)" }}
                >
                  {" "}
                </span>{" "}
                Crypto
              </li>
            )}
            {user.stocks && (
              <li className="role">
                {" "}
                <span
                  className="role--circle"
                  style={{ backgroundColor: "rgb(46, 204, 113)" }}
                >
                  {" "}
                </span>{" "}
                Stocks
              </li>
            )}
            {user.forex && (
              <li className="role">
                {" "}
                <span
                  className="role--circle"
                  style={{ backgroundColor: "rgb(233, 30, 99)" }}
                >
                  {" "}
                </span>{" "}
                Forex
              </li>
            )}
            {user.free_signals && (
              <li className="role">
                {" "}
                <span
                  className="role--circle"
                  style={{ backgroundColor: "rgb(255, 215, 0)" }}
                >
                  {" "}
                </span>{" "}
                Free Signals
              </li>
            )}
            {user.marketing && (
              <li className="role">
                {" "}
                <span
                  className="role--circle"
                  style={{ backgroundColor: "rgb(255, 44, 33)" }}
                >
                  {" "}
                </span>{" "}
                Marketing
              </li>
            )}
            {user.free_member && (
              <li className="role">
                {" "}
                <span
                  className="role--circle"
                  style={{ backgroundColor: "rgb(26, 227, 29)" }}
                >
                  {" "}
                </span>{" "}
                Free Member
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
