import React from 'react'
import stripe from '../img/stripe.png'
import discord from '../img/discord.png'
import tradingview from '../img/tradingview.svg'
import forbes from '../img/forbes.png'


function Trusted() {
  return (
    <section id="trusted">
        <div className="trusted-container">
            <h6>Trusted By Thousands Of People</h6>
            <ul className="trusted__logos">
                <li className="trusted__logo">
                    <img src={stripe} />
                </li>
                <li className="trusted__logo">
                    <img src={discord} />
                </li>
                <li className="trusted__logo">
                    <img src={tradingview} />
                </li>
                <li className="trusted__logo">
                    <img src={forbes} />
                </li>
            </ul>
        </div>
    </section>
  )
}

export default Trusted