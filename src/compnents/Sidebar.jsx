import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "../ui/Profile";
import AppNav from "./AppNav";

function Sidebar({
  user,
  channel,
  displaySideBar,
  tickets,
  isDark,
  setIsDark,
}) {
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
    } else if (channel === "crypto_channel") {
      setChecked(11);
    } else if (channel === "forex_channel") {
      setChecked(12);
    } else if (channel === "stocks_channel") {
      setChecked(13);
    } else if (channel === "free_signals_channel") {
      setChecked(14);
    } else if (channel === "premium") {
      setChecked(15);
    } else if (channel === "staff") {
      setChecked(16);
    } else {
      setChecked(0);
    }
  }, [channel]);

  return (
    <div
      className={`sidebars-wrapper ${!displaySideBar && "sidebar-invisible"}`}
    >
      <AppNav />
      <aside className={`sidebar`}>
        <figure className="sidebar--logo">
          <img src="https://cdn.discordapp.com/attachments/1088531111942037534/1091012283309760552/logo.png" />
        </figure>
        <div className="sidebar--content">
          <ul className="sidebar--channels">
            <li className="sidebar--channels__items">
              <h6 className="channels__header">
                <FontAwesomeIcon icon="fa fa-arrow-right" /> Main Menu
              </h6>
              <button
                className={`channels__btn ${
                  checked === 1 && "channels__btn-checked"
                }`}
              >
                <Link className="channel__btn--link" to="/app/intro">
                  Introduction{" "}
                  {user.intro && (
                    <span className="mention-count">{user.intro}</span>
                  )}
                </Link>
              </button>
              <button
                className={`channels__btn ${
                  checked === 2 && "channels__btn-checked"
                }`}
              >
                <Link className="channel__btn--link" to="/app/faq">
                  faq{" "}
                  {user.faq && (
                    <span className="mention-count">{user.faq}</span>
                  )}
                </Link>
              </button>
              <button
                className={`channels__btn ${
                  checked === 3 && "channels__btn-checked"
                }`}
              >
                <Link className="channel__btn--link" to="/app/announcements">
                  announcements{" "}
                  {user.announcements && (
                    <span className="mention-count">{user.announcements}</span>
                  )}
                </Link>
              </button>
              <button
                className={`channels__btn ${
                  checked === 4 && "channels__btn-checked"
                }`}
              >
                <Link className="channel__btn--link" to="/app/results">
                  results{" "}
                  {user.results && (
                    <span className="mention-count">{user.results}</span>
                  )}
                </Link>
              </button>
            </li>
            <li className="sidebar--channels__items">
              <h6 className="channels__header">
                <FontAwesomeIcon icon="fa fa-arrow-right" /> Text channels
              </h6>
              <button
                className={`channels__btn ${
                  checked === 5 && "channels__btn-checked"
                }`}
              >
                <Link className="channel__btn--link" to="/app/general">
                  General chat{" "}
                  {user.general && (
                    <span className="mention-count">{user.general}</span>
                  )}
                </Link>
              </button>
              <button
                className={`channels__btn ${
                  checked === 6 && "channels__btn-checked"
                }`}
              >
                <Link className="channel__btn--link" to="/app/begginer">
                  begginer 's chat{" "}
                  {user.begginer && (
                    <span className="mention-count">{user.begginer}</span>
                  )}
                </Link>
              </button>
              {(user.crypto || user.founder || user.admin) && (
                <button
                  className={`channels__btn ${
                    checked === 11 && "channels__btn-checked"
                  }`}
                >
                  <Link className="channel__btn--link" to="/app/crypto_channel">
                    crypto chat{" "}
                    {user.crypto_channel && (
                      <span className="mention-count">
                        {user.crypto_channel}
                      </span>
                    )}
                  </Link>
                </button>
              )}
              {(user.blue_badge_trader ||
                user.premium_signals ||
                user.premium_trader ||
                user.founder ||
                user.admin) && (
                <button
                  className={`channels__btn ${
                    checked === 15 && "channels__btn-checked"
                  }`}
                >
                  <Link className="channel__btn--link" to="/app/premium">
                    premium chat{" "}
                    {user.premium && (
                      <span className="mention-count">{user.premium}</span>
                    )}
                  </Link>
                </button>
              )}
              {(user.forex || user.founder || user.admin) && (
                <button
                  className={`channels__btn ${
                    checked === 12 && "channels__btn-checked"
                  }`}
                >
                  <Link className="channel__btn--link" to="/app/forex_channel">
                    forex chat{" "}
                    {user.forex_channel && (
                      <span className="mention-count">
                        {user.forex_channel}
                      </span>
                    )}
                  </Link>
                </button>
              )}
              {(user.stocks || user.founder || user.admin) && (
                <button
                  className={`channels__btn ${
                    checked === 13 && "channels__btn-checked"
                  }`}
                >
                  <Link className="channel__btn--link" to="/app/stocks_channel">
                    stocks chat{" "}
                    {user.stocks_channel && (
                      <span className="mention-count">
                        {user.stocks_channel}
                      </span>
                    )}
                  </Link>
                </button>
              )}
              {(user.free_signals || user.founder || user.admin) && (
                <button
                  className={`channels__btn ${
                    checked === 14 && "channels__btn-checked"
                  }`}
                >
                  <Link
                    className="channel__btn--link"
                    to="/app/free_signals_channel"
                  >
                    free_signals chat{" "}
                    {user.free_signals_channel && (
                      <span className="mention-count">
                        {user.free_signals_channel}
                      </span>
                    )}
                  </Link>
                </button>
              )}
              {(user.marketing || user.founder || user.admin) && (
                <button
                  className={`channels__btn ${
                    channel === 'marketing_chat' && "channels__btn-checked"
                  }`}
                >
                  <Link
                    className="channel__btn--link"
                    to="/app/marketing_chat"
                  >
                    Marketing chat{" "}
                    {user.free_signals_channel && (
                      <span className="mention-count">
                        {user.free_signals_channel}
                      </span>
                    )}
                  </Link>
                </button>
              )}
              <button
                className={`channels__btn ${
                  checked === 7 && "channels__btn-checked"
                }`}
              >
                <Link className="channel__btn--link" to="/app/ask">
                  ask a mentor{" "}
                  {user.ask && (
                    <span className="mention-count">{user.ask}</span>
                  )}
                </Link>
              </button>
              {tickets.length > 0 &&
                tickets.map((ticket) => {
                  if (
                    (ticket.uid1 === user.uid || user.founder || user.admin) &&
                    ticket.display
                  ) {
                    return (
                      <button
                        className={`channels__btn ${
                          channel === ticket.name && "channels__btn-checked"
                        }`}
                      >
                        <Link
                          className="channel__btn--link"
                          to={`/app/${ticket.name}`}
                        >
                          {ticket.name}{" "}
                          {user.ask && (
                            <span className="mention-count">
                              {eval("user." + ticket.name)}
                            </span>
                          )}
                        </Link>
                      </button>
                    );
                  }
                })}
            </li>
            <li className="sidebar--channels__items">
              <h6 className="channels__header">
                <FontAwesomeIcon icon="fa fa-arrow-right" /> interactive
              </h6>
              <button
                className={`channels__btn ${
                  checked === 8 && "channels__btn-checked"
                }`}
              >
                <Link className="channel__btn--link" to="/app/claim">
                  claim roles{" "}
                  {user.claim && (
                    <span className="mention-count">{user.claim}</span>
                  )}
                </Link>
              </button>
              <button
                className={`channels__btn ${
                  checked === 9 && "channels__btn-checked"
                }`}
              >
                <Link className="channel__btn--link" to="/app/polls">
                  polls{" "}
                  {user.polls && (
                    <span className="mention-count">{user.polls}</span>
                  )}
                </Link>
              </button>
            </li>
            {(user.free_signals || user.founder || user.admin) && (
              <li className="sidebar--channels__items">
                <h6 className="channels__header">
                  <FontAwesomeIcon icon="fa fa-arrow-right" /> Staff
                </h6>
                <button
                  className={`channels__btn ${checked === 16 && "staff"}`}
                >
                  <Link className="channel__btn--link" to="/app/staff">
                    staff room{" "}
                    {user.staff && (
                      <span className="mention-count">{user.staff}</span>
                    )}
                  </Link>
                </button>
              </li>
            )}
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
            <button onClick={() => setIsDark(!isDark)} className="user--theme">
              {isDark ? (
                <FontAwesomeIcon icon="fa fa-moon" />
              ) : (
                <FontAwesomeIcon icon={"fa fa-sun"} />
              )}
            </button>
            {profileDisplay && <Profile currentUser={user} user={user} />}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
