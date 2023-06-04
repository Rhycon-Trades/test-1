import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Operation from "../ui/Operation";

function NAv({ user }) {
  const [menu, setMenu] = useState(false);
  const path = (useLocation().pathname).toString()
  const [loading , setLoading] = useState(true)

  useEffect(() => {
    if(user || user === null){
      setLoading(false)
    }
  },[user])

  function openMenu() {
    setMenu(!menu);
  }

  return (
    <>
      {!path.includes("/app") && <nav>
        <div className="container navbar">
          <Link to="/" className="logo-wrapper">
            <img src="https://cdn.discordapp.com/attachments/1088531111942037534/1091012283309760552/logo.png" />
          </Link>
          <ul className="nav--links">
            <li className="nav--link">
              <Link to="/">Home</Link>
            </li>
            <li className="nav--link">
              <Link to="/products">Products </Link>
            </li>
            <li className="nav--link">
              <Link to="/cart">
                <FontAwesomeIcon icon="fa fa-shopping-cart" />
              </Link>
            </li>
            <li className={`nav--link nav--link__btn ${loading && 'nav--link-loading'}`}>
              { loading ? ("") :
              user ? (
                <Link to="/app/intro">Open App</Link>
              ) : (
                <Link to="/signin">Sign Up</Link>
              )}
            </li>
          </ul>
          <div className="mobile-nav">
            <button className="mobile-nav--btn">
              {user ? (
                <Link to="/app/intro">Open App</Link>
              ) : (
                <Link to="/signin">Sign Up</Link>
              )}
            </button>
            <button onClick={openMenu} className="menu-btn">
              <FontAwesomeIcon
                icon={`${menu ? "fa fa-xmark" : "fa fa-bars"}`}
              />
            </button>
          </div>
        </div>
      </nav>}

      {menu && (
        <ul className="menu">
          <li onClick={openMenu} className="nav--link">
            <Link to="/">Home</Link>
          </li>
          <li onClick={openMenu} className="nav--link">
            <Link to="/products">Products </Link>
          </li>
          <li onClick={openMenu} className="nav--link">
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      )}

    </>
  );
}

export default NAv;
