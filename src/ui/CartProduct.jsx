import React from "react";

function CartProduct({product , cart , setCart}) {
  
  function removeItem(){
   setCart(cart.filter((item) => item.id != product.id))
  }
  return (
    <div className="cart--table__column">
      <div className="table--column__info">
        <figure className="column--info__img">
          <img src={product.ImgUrl} />
        </figure>
        <div className="column--info__display">
          <h4 className="info--display__title">{product.title}</h4>
          <button onClick={removeItem} className="info--display__btn">remove</button>
        </div>
      </div>
      <p className="table--column__price">${(product.salePrice || product.originalPrice).toFixed(2)}</p>
    </div>
  );
}

export default CartProduct;
