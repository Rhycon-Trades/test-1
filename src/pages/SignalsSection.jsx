import React from 'react'
import { Link } from 'react-router-dom'

function SignalsSection() {
  return (
    <main style={{backgroundColor:'#f7f7f7'}} className="features-container">
    <div>
    <h2 className="section-title feature-title">
        Check out <b className="purple">the signals</b>
    </h2>
    <ul className="feature--list signalsChat--list">
        <li className="feature--list__item">
            <p>1st week <b className="purple">Free</b></p>
        </li>
        <li className="feature--list__item">
            <p>crypto, stocks and forex</p>
        </li>
        <li className="feature--list__item">
            <p><b className="purple">Affordable</b> price</p>
        </li>
        <li className="feature--list__item">
            <p><b className="purple">Professional</b> analyst</p>
        </li>
    </ul>
    <Link to='/signin'>
        <button className='features__btn'>Sign Up</button>
    </Link>
    </div>
    <figure className='feature--img chatsignals--img'>
        <img src="https://media.discordapp.net/attachments/1116431288132444160/1118625770844196894/IMG_1986.png" alt="" />
    </figure>
    </main>
  )
}

export default SignalsSection