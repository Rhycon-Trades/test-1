import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Footer() {
  const path = useLocation().pathname.toString()
  return (
    <>
    {!path.includes("/app") && <footer>
      <div className="footer-container">
        <div className="footer--main">
          <div className="footer--trades">
            <Link to="/">
              <figure id="footer__logo">
                <img src="https://cdn.discordapp.com/attachments/1088531111942037534/1091012283309760552/logo.png" />
              </figure>
            </Link>
            <ul className="footer__social">
              <li>
                <a
                  className="footer--social__link"
                  href="https://discord.gg/JffHSeneAQ"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={"fa-brands fa-discord"} />
                </a>
              </li>
              <li>
                <a
                  className="footer--social__link"
                  href="https://instagram.com/rhycon.official?igshid=YmMyMTA2M2Y="
                  target="_blank"
                >
                  <FontAwesomeIcon icon={"fa-brands fa-instagram"} />
                </a>
              </li>
              <li>
                <a
                  className="footer--social__link"
                  href="https://youtube.com/@RhyconTrades"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={"fa-brands fa-youtube"} />
                </a>
              </li>
            </ul>
          </div>
          
          <div className="footer--links">
            <ul className="footer--link__block">
              <h5>Navigation</h5>
              <li className="footer__link">
                <Link className="link" to="/">
                  Home
                </Link>
              </li>
              <li className="footer__link">
                <Link className="link" to="/products">
                  indicators
                </Link>
              </li>
              <li className="footer__link">
                <Link className="link" to="">
                  Courses
                </Link>
              </li>
            </ul>
            <ul className="footer--link__block">
              <h5>Company</h5>
              <li className="footer__link">
                <Link className="link" to="/terms">
                  Terms of services
                </Link>
              </li>
              <li className="footer__link">
                <Link className="link" to="/about">
                  About us
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer--newsletter">
            <h5>Sign up for our newsletter</h5>
            <form action="">
              <input type="email" placeholder="enter your email" name="email" />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
        <div className="copyright">
          <p className="copyright__text">Copyright © 2023 </p>
          <button className="copyright__btn">
            <a className="copyright__btn--text" href="https://discord.gg/XHpZ7xutQN">
              made by webzone
            </a>
          </button>
        </div>
      </div>
    </footer>}
    </>
  );
}

export default Footer;
