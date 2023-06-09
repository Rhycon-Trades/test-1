import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

function Header({products}) {

  const [checked , setChecked] = useState(1)
  const [imgUrl , setImgUrl] = useState("")

  useEffect(() => {
    if(checked === 1){
      setImgUrl("https://cdn.discordapp.com/attachments/1088531111942037534/1105220070856196146/IMG_1498.png")
    }else if(checked === 2){
      setImgUrl("https://cdn.discordapp.com/attachments/1088531111942037534/1105214825249919107/unnamed_2-removebg-preview.png")
    }else if(checked === 3){
      setImgUrl("https://cdn.discordapp.com/attachments/1088531111942037534/1107795553393332367/IMG_1533.png")
    }
  },[checked])

  let product = null

  if(products !== null){
    if(checked === 1){
      product = products.find((item) => item.nameInUrl === 'RhyconCyclone')
    }else if(checked === 2){
      product = products.find((item) => item.nameInUrl === 'badge')
    }else if(checked === 3){
      product = products.find((item) => item.nameInUrl === 'signals')
    }
  }

  return (
    <header>
      <div className="container">
        <div className="header--content">
            <h1 className="header--content__title">
              Master the Art of <span className="purple">Investing:</span>
              <br /> <span className="purple">Professional</span> Tools for{" "}
              <span className="purple">Wealth</span> Building
            </h1>
            <div className="buy-container">
        <div className="buy--content">
          <div className="buy__table">
            <div className="buy__table--bar">
              <button onClick={() => setChecked(1)} className={`table--bar__btn ${checked != 1 && "low-lighted"}`}>Indicator</button>
              <button onClick={() => setChecked(2)} className={`table--bar__btn ${checked != 2 && "low-lighted"}`}>Blue badge</button>
              <button onClick={() => setChecked(3)} className={`table--bar__btn ${checked != 3 && "low-lighted"}`}>Signals</button>
            </div>
            <div className="buy__table--content">
            {
              (product !== null && checked === 1) && product.description
            }
            {
              checked === 3 && (
                <>
                <p>Unlock the Rhycon Signals exclusive trading room for unparalleled access to Crypto, Forex, and Stock signals.</p>
                <ul className="buy--list">
                  <li className="buy--list__item">
                    Our expert analysts will help you… 
                  </li>
                  <li className="buy--list__item">
                     Maximize your returns.
                  </li>
                  <li className="buy--list__item">
                    Offer real-time market analysis share cutting-edge strategies.
                  </li>
                  <li className="buy--list__item">
                  Access a community of like minded people 
                  </li>
                  <li className="buy--list__item">
                  Join us and embark on a journey towards unlimited potential.
                  </li>
                </ul>
                <p>join us and embark on a journey towards unlimited potential</p>
                </>
              )
            }
             {
              checked === 2 && (
                <>
                <p>If you want to enter the world of Trading, the Blue Badge Trader is the perfect opportunity for you. The plan is designed for people of all skill levels, and you get access to</p>
                <ul className="buy--list">
                  <li className="buy--list__item">
                  Signals 
                  </li>
                  <li className="buy--list__item">
                  Indicator
                  </li>
                  <li className="buy--list__item">
                  The Rhycon trading Manual 
                  </li>
                  <li className="buy--list__item">
                  Access to all the premium channels in the Chat Room, where you can connect with other traders and learn from experienced mentors.
 But that's not all. As a bonus, you'll receive a custom blue badge role on the server, giving you the chance to showcase your new knowledge and expertise. 

                  </li>
                  <li className="buy--list__item">
                  The Blue Badge Trader is a must-have for anyone looking to gain a competitive edge in the world of trading. So why wait? Sign up today and start your journey toward financial success.
                  </li>
                </ul>
                </>
              )
            }
            </div>
          </div>
          <Link className="buy__link" to={`/products/${product && product.nameInUrl}`}>
            <button className="buy__btn">Buy Now</button>
          </Link>
        </div>
        <div className="buy--img">
          <img src={imgUrl} />
        </div>
      </div>
          </div>
        </div>
    </header>
  );
}

export default Header;
