import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Sidebar({ user, channel, displaySideBar }) {
  const [checked, setChecked] = useState(1);
  const [profileDisplay, setProfileDisplay] = useState(false);

  useEffect(() => {
    if (profileDisplay) {
      setProfileDisplay(false);
    }
  }, [displaySideBar]);

  useEffect(() => {
    if (channel === "intro") {
      setChecked(1);
    } else if (channel === "faq") {
      setChecked(2);
    } else if (channel === "announcements") {
      setChecked(3);
    } else if (channel === "results") {
      setChecked(4);
    } else if (channel === "general") {
      setChecked(5);
    } else if (channel === "begginer") {
      setChecked(6);
    } else if (channel === "ask") {
      setChecked(7);
    } else if (channel === "claim") {
      setChecked(8);
    } else if (channel === "polls") {
      setChecked(9);
    } else if (channel === "invites") {
      setChecked(10);
    }
  }, [channel]);

  return (
    <aside className={`sidebar ${!displaySideBar && "sidebar-invisible"}`}>
      <figure className="sidebar--logo">
        <img src="https://cdn.discordapp.com/attachments/1088531111942037534/1091012283309760552/logo.png" />
      </figure>
      <div className="sidebar--content">
        <ul className="sidebar--channels">
          <li className="sidebar--channels__items">
            <h6 className="channels__header">Main Menu</h6>
            <button
              className={`channels__btn ${
                checked === 1 && "channels__btn-checked"
              }`}
            >
              <Link to="/app/intro">Introduction</Link>
            </button>
            <button
              className={`channels__btn ${
                checked === 2 && "channels__btn-checked"
              }`}
            >
              <Link to="/app/faq">faq</Link>
            </button>
            <button
              className={`channels__btn ${
                checked === 3 && "channels__btn-checked"
              }`}
            >
              <Link to="/app/announcements">announcements</Link>
            </button>
            <button
              className={`channels__btn ${
                checked === 4 && "channels__btn-checked"
              }`}
            >
              <Link to="/app/results">results</Link>
            </button>
          </li>
          <li className="sidebar--channels__items">
            <h6 className="channels__header">Text channels</h6>
            <button
              className={`channels__btn ${
                checked === 5 && "channels__btn-checked"
              }`}
            >
              <Link to="/app/general">General chat</Link>
            </button>
            <button
              className={`channels__btn ${
                checked === 6 && "channels__btn-checked"
              }`}
            >
              <Link to="/app/begginer">begginer 's chat</Link>
            </button>
            <button
              className={`channels__btn ${
                checked === 7 && "channels__btn-checked"
              }`}
            >
              <Link to="/app/ask">ask a mentor</Link>
            </button>
          </li>
          <li className="sidebar--channels__items">
            <h6 className="channels__header">interactive</h6>
            <button
              className={`channels__btn ${
                checked === 8 && "channels__btn-checked"
              }`}
            >
              <Link to="/app/claim">claim roles</Link>
            </button>
            <button
              className={`channels__btn ${
                checked === 9 && "channels__btn-checked"
              }`}
            >
              <Link to="/app/polls">polls</Link>
            </button>
            <button
              className={`channels__btn ${
                checked === 10 && "channels__btn-checked"
              }`}
            >
              <Link to="/app/invites">check invites</Link>
            </button>
          </li>
        </ul>
        <div className="sidebar--user">
          <div className="sidebar--user__content">
            <div
              onClick={() => setProfileDisplay(!profileDisplay)}
              className="sidebar--user__info"
            >
              <figure className="user--logo">
                <img src={user.photoUrl} />
              </figure>
              <p className="user--name">{user && user.displayName}</p>
            </div>
          </div>
          <button className="user--settings">
            <FontAwesomeIcon icon="fa fa-gear" />
          </button>
          {profileDisplay && (
            <div className="user--profile">
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
                  <h5 className="block__section--mini-title">
                    Rhycon member since
                  </h5>
                  <p>{user && user.creationTime}</p>
                </div>
                <div className="profile--block__section">
                  <h5 className="block__section--mini-title">Ranks</h5>
                  <ul className="roles">
                    {user.founder && <li className="role"> <span className="role--circle" style={{backgroundColor:"#ffffff",}}></span> Founder</li>}
                    {user.admin && <li className="role"> <span className="role--circle" style={{backgroundColor:"rgb(194, 124, 14)",}}> </span>Admin</li>}
                    {user.analyst && <li className="role"> <span className="role--circle" style={{backgroundColor:"rgb(0, 122, 255)",}}> </span> Rhycon Analyst</li>}
                    {user.support && <li className="role"> <span className="role--circle" style={{backgroundColor:"rgb(255, 0, 0)",}}> </span> Support</li>}
                    {user.blue_badge_trader && (
                      <li className="role"> <span className="role--circle" style={{backgroundColor:"rgb(8, 188, 231)",}}> </span> Blue Badge Trader</li>
                    )}
                    {user.premium_signals && (
                      <li className="role"> <span className="role--circle" style={{backgroundColor:"rgb(194, 124, 14)",}}> </span> Premium Signals</li>
                    )}
                    {user.premium_trader && (
                      <li className="role"> <span className="role--circle" style={{backgroundColor:"rgb(158, 31, 229)",}}> </span> Premium Trader</li>
                    )}
                    {user.booster && <li className="role"> <span className="role--circle" style={{backgroundColor:"rgb(244, 127, 255)",}}> </span> Rhycon Booster</li>}
                    {user.crypto && <li className="role"> <span className="role--circle" style={{backgroundColor:"rgb(46, 204, 113)",}}> </span> Crypto</li>}
                    {user.stocks && <li className="role"> <span className="role--circle" style={{backgroundColor:"rgb(46, 204, 113)",}}> </span> Stocks</li>}
                    {user.forex && <li className="role"> <span className="role--circle" style={{backgroundColor:"rgb(233, 30, 99)",}}> </span> Forex</li>}
                    {user.free_signals && (
                      <li className="role"> <span className="role--circle" style={{backgroundColor:"rgb(255, 215, 0)",}}> </span> Free Signals</li>
                    )}
                    {user.marketing && <li className="role"> <span className="role--circle" style={{backgroundColor:"rgb(255, 44, 33)",}}> </span> Marketing</li>}
                    {user.free_member && <li className="role"> <span className="role--circle" style={{backgroundColor:"rgb(26, 227, 29)",}}> </span> Free Member</li>}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
