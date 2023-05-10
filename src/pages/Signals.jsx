import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function Signals({product , cart , getProduct}) {
  return (
    <div className='aboutProduct-container'>
        <div className="signals">
            <div className="signals--main">
                <p className="purple signals--main__sub-header">
                    About our signals
                </p>
                <h3 className="signals--main__header">
                    All you need to know about the signals
                </h3>
                <div className="signals__features">
                    <div className="signals__feature">
                        <FontAwesomeIcon icon='fa fa-user' className='signals--icon' />
                    <h4 className="signals--title">Premium signals</h4>
                    <p className="signals--description">Recive signals from proffesinal analyists</p>
                    </div>
                    <div className="signals__feature">
                        <FontAwesomeIcon icon='fa fa-graduation-cap' className='signals--icon' />
                    <h4 className="signals--title">Begginer friendly</h4>
                    <p className="signals--description">simple steps to follow to place each trade</p>
                    </div>
                    <div className="signals__feature">
                        <FontAwesomeIcon icon='fa fa-dollar' className='signals--icon' />
                    <h4 className="signals--title">Maximize ROI</h4>
                    <p className="signals--description">Your 1 week gain will give you access to lot's of profitable trades</p>
                    </div>
                    <div className="signals__feature">
                        <FontAwesomeIcon icon='fa fa-unlock' className='signals--icon' />
                    <h4 className="signals--title">Premium trading room</h4>
                    <p className="signals--description">Unlock the ability to talk to experienced traders</p>
                    </div>
                </div>
            </div>
            <div className="signals--sec">
                <figure className='signals--sec__img'>
                    <img src="https://cdn.discordapp.com/attachments/1088531111942037534/1105913068766122086/IMG_1517.png" alt="" />
                </figure>
                <div className="signals--sec__price">{product.salePrice !== undefined && (product.salePrice || product.originalPrice).toFixed(2)}</div>
                {cart.find((item) => item.id == product.id) ? (
                <Link to="/cart" className="product__button secondary__button">
                  <button className="product__button secondary__button">
                    Check Cart
                  </button>{" "}
                </Link>
              ) : (
                <button
                  onClick={() => getProduct(product)}
                  className="product__button secondary__button"
                >
                  add to cart
                </button>
              )}
            </div>
        </div>
    </div>
  )
}

export default Signals