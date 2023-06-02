import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "../ui/Profile";

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
              <Link className="channel__btn--link" to="/app/intro">Introduction {user.intro && <span className="mention-count">{ user.intro}</span>}</Link>
            </button>
            <button
              className={`channels__btn ${
                checked === 2 && "channels__btn-checked"
              }`}
            >
              <Link className="channel__btn--link" to="/app/faq">faq {user.faq &&<span className="mention-count">{ user.faq}</span>}</Link>
            </button>
            <button
              className={`channels__btn ${
                checked === 3 && "channels__btn-checked"
              }`}
            >
              <Link className="channel__btn--link" to="/app/announcements">announcements {user.announcements &&<span className="mention-count">{ user.announcements}</span>}</Link>
            </button>
            <button
              className={`channels__btn ${
                checked === 4 && "channels__btn-checked"
              }`}
            >
              <Link className="channel__btn--link" to="/app/results">results {user.results &&<span className="mention-count">{ user.results}</span>}</Link>
            </button>
          </li>
          <li className="sidebar--channels__items">
            <h6 className="channels__header">Text channels</h6>
            <button
              className={`channels__btn ${
                checked === 5 && "channels__btn-checked"
              }`}
            >
              <Link className="channel__btn--link" to="/app/general">General chat {user.general &&<span className="mention-count">{ user.general}</span>}</Link>
            </button>
            <button
              className={`channels__btn ${
                checked === 6 && "channels__btn-checked"
              }`}
            >
              <Link className="channel__btn--link" to="/app/begginer">begginer 's chat {user.begginer && <span className="mention-count">{user.begginer}</span>}</Link>
            </button>
            <button
              className={`channels__btn ${
                checked === 7 && "channels__btn-checked"
              }`}
            >
              <Link className="channel__btn--link" to="/app/ask">ask a mentor {user.ask &&<span className="mention-count">{ user.ask}</span>}</Link>
            </button>
          </li>
          <li className="sidebar--channels__items">
            <h6 className="channels__header">interactive</h6>
            <button
              className={`channels__btn ${
                checked === 8 && "channels__btn-checked"
              }`}
            >
              <Link className="channel__btn--link" to="/app/claim">claim roles {user.claim && <span className="mention-count">{user.claim}</span>}</Link>
            </button>
            <button
              className={`channels__btn ${
                checked === 9 && "channels__btn-checked"
              }`}
            >
              <Link className="channel__btn--link" to="/app/polls">polls {user.polls && <span className="mention-count">{user.polls}</span>}</Link>
            </button>
            <button
              className={`channels__btn ${
                checked === 10 && "channels__btn-checked"
              }`}
            >
              <Link className="channel__btn--link" to="/app/invites">check invites {user.invites &&<span className="mention-count">{user.invites}</span>}</Link>
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
            <Profile user={user} />
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
