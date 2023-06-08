import React, { useEffect, useState } from "react";
import CartProduct from "../ui/CartProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import CheckOut from "../ui/CheckOut";

function Cart({cart , setCart , user}) {
  const [totalPrice , setTotalPrice] = useState(0)

  useEffect(() => {
    let tempPrice = 0
    cart.map((item) => tempPrice += (item.salePrice !== null ? item.salePrice : item.originalPrice))
    setTotalPrice(tempPrice)
  }, [] [cart])
  

  return (
    <main>
      <div className="cart-container">
        <h2 className="cart-title">Cart</h2>
        <div className="cart">
          <div className="cart--bar">
            <h4 className="cart--bar__title">Product</h4>
            <h4 className="cart--bar__title">Price</h4>
          </div>
          <div className="cart--table">
                {cart.map((item) => <CartProduct cart={cart} setCart={setCart} product={item} key={item.id}/>)}
          </div>
        </div>
        {
          totalPrice > 0 ?
        <div className="cart--price">
          <p className="cart--price__sub">Subtotal <span>${(totalPrice * 0.9).toFixed(2)}</span></p>
          <p className="cart--price__sub">Tax <span>${(totalPrice * 0.1).toFixed(2)}</span></p>
          <h4 className="cart--price__sub cart--price__total">Total <span>${totalPrice.toFixed(2)}</span></h4>
          {user ? <CheckOut cart={cart} setCart={setCart} user={user} totalPrice={totalPrice} /> : <>
            <button className="cart--btn"><Link to='/signin'>Sign in</Link></button>
            <p className="cart--warning">Sign in required</p>
          </>}
        </div> : 
          <div className="cart--empty">
            <h2 className="cart--empty__header">cart is empty</h2>
            <FontAwesomeIcon className="cart--empty__logo" icon='fa fa-cart-shopping' />
            <Link to='/products'>
              <button>browse products</button>
            </Link>
          </div>
        }
      </div>
    </main>
  );
}

export default Cart;
