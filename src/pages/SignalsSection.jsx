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
    <figure className='feature--img'>
        <img src="" alt="" />
    </figure>
    </main>
  )
}

export default SignalsSection