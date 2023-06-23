import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { db } from "../firebase/init";
import Operation from "../ui/Operation";

function Footer() {
  const path = useLocation().pathname.toString()

  const [displayOperation , setDisplayOperation] = useState(false)
  const [operationMessage , setOperationMessage] = useState('')
  const [operationState , setOperationState] = useState(true)
  
  async function addEmail(event){
    event.preventDefault()
    const ref = query(
        collection(db, "mailingList"),
        where("email", "==", event.target[0].value)
      );
        const data = await getDocs(ref)
        const posts = await data.docs.map((doc) => ({...doc.data()}))
        if(Object.keys(posts).length === 0){
            const email = {email:event.target[0].value}
            addDoc(collection(db , 'mailingList'),email)
            setDisplayOperation(true)
            setOperationMessage("this email is now a member of our mailing list")
            setOperationState(true)
        }else{
            setDisplayOperation(true)
            setOperationMessage('This email is already used')
            setOperationState(false)
        }
}
  return (
    <>
    {(!path.includes("/app") && !path.includes('marketing') && !path.includes('invite') && !path.includes('learn') && window.location.pathname !== '/signals') && <footer>
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
            <form onSubmit={(event) => addEmail(event)}>
              <input type="email" required placeholder="enter your email" name="email" />
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
      {
        displayOperation && <Operation message={operationMessage} setOperation={setDisplayOperation} success={operationState} />
      }
    </footer>}
    </>
  );
}

export default Footer;
