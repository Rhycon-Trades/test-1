import React, { useEffect, useState } from "react";
import ProductFeature from "../ui/ProductFeature";
import { Link, useParams } from "react-router-dom";

function AboutProduct({ products, cart }) {
  const [product, setProduct] = useState(false);
  const [features, setFeatures] = useState([]);
  const [reload, setReload] = useState(false);
  const [badgePrice , setBadgePrice] = useState(7.99)

  useEffect(() => {
  setProduct({...product , originalPrice: badgePrice})
  },[badgePrice])

  const url = useParams().nameInUrl;
  useEffect(() => {
    if (products != null) {
      const item = products.find((item) => item.nameInUrl === url);
      setProduct(item);
    }
  }, [products]);

  useEffect(() => {
    if (product) {
      const arr = [];
      for (
        let i = 1;
        eval("product.feature" + i.toString()) != undefined;
        i++
      ) {
        arr.push(eval("product.feature" + i.toString()));
        setFeatures(arr);
      }
    }
  }, [product]);

  function getProduct(item) {
    cart.push(item);
    setReload(!reload);
  }

  return (
    <main>
      <div className="aboutProduct-container">
        <div className="product--about">
          <div className="about-container">
            <figure className="product--small-img">
              <img src={product.ImgUrl} />
            </figure>
            <h2 className="product--about__header">{product.title}</h2>
            <div className="product--secondary-info">
              <h3 className="product--secondary__price">
                {product &&
                  (product.salePrice != null ? (
                    <span>$ {product.salePrice.toFixed(2)}</span>
                  ) : (
                    <span>$ {product.originalPrice}</span>
                  ))}{" "}
              </h3>
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
          <div className="product--label">
            <figure className="product--label__img">
              <img src={product.ImgUrl} />
            </figure>
            <div className="product--label__info">
              <h3 className="product--label__price">
                {product &&
                  (product.salePrice != null ? (
                    <span>$ {product.salePrice.toFixed(2)}</span>
                  ) : (
                    <span>$ {product.originalPrice}</span>
                  ))}{" "}
              </h3>
              {cart.find((item) => item.id == product.id) ? (
                <Link to="/cart" className="product__button">
                  <button className="product__button">Check Cart</button>{" "}
                </Link>
              ) : (
                <button
                  onClick={() => getProduct(product)}
                  className="product__button"
                >
                  add to cart
                </button>
              )}
            </div>
          </div>
        </div>
        {url !== "badge" ? (
          <div className="product--table">
            {features.map((feature, _) => (
              <ProductFeature feature={feature} key={_} />
            ))}
          </div>
        ) : (
          <div className="product--subscriptions">
            <div className="subscriptions-wrap">
              <div className="product--subscription">
                <div className="product--subscription__info">
                  <h5 className="subscription__info--title">tier 1</h5>
                  <div className="subscription__info--price">7.99</div>
                  <button onClick={() => setBadgePrice(7.99)} className={`subscription__info--btn ${badgePrice === 7.99 && "info--btn__selected"}`}>
                    choose plan
                  </button>
                </div>
                <ul className="product--subscription__list">
                  <li className="subscription__list--item">
                    Full access to the indicator
                  </li>
                  <li className="subscription__list--item">
                    Rhycon trading manual
                  </li>
                  <li className="subscription__list--item">
                    Tier 1 Trader rank
                  </li>
                  <li className="subscription__list--item">
                    Access to BlueBadge tier 1 channel
                  </li>
                </ul>
              </div>
              <div className="product--subscription">
                <div className="product--subscription__info">
                  <h5 className="subscription__info--title">tier 2</h5>
                  <div className="subscription__info--price">12.99</div>
                  <button onClick={() => setBadgePrice(12.99)} className={`subscription__info--btn ${badgePrice === 12.99 && "info--btn__selected"}`}>
                    choose plan
                  </button>
                </div>
                <ul className="product--subscription__list">
                  <li className="subscription__list--item">
                    Full access to the indicator
                  </li>
                  <li className="subscription__list--item">
                    Rhycon trading manual
                  </li>
                  <li className="subscription__list--item">
                    Tier 1 Trader rank
                  </li>
                  <li className="subscription__list--item">
                    Access to BlueBadge tier 2 channel
                  </li>
                  <li className="subscription__list--item">
                    Premium calls and live classes
                  </li>
                </ul>
              </div>
              <div className="product--subscription">
                <div className="product--subscription__info">
                  <h5 className="subscription__info--title">tier 1</h5>
                  <div className="subscription__info--price">14.99</div>
                  <button onClick={() => setBadgePrice(14.99)} className={`subscription__info--btn ${badgePrice === 14.99 && "info--btn__selected"}`}>
                    choose plan
                  </button>
                </div>
                <ul className="product--subscription__list">
                  <li className="subscription__list--item">
                    Full access to the indicator
                  </li>
                  <li className="subscription__list--item">
                    Rhycon trading manual
                  </li>
                  <li className="subscription__list--item">
                    Tier 3 Trader rank
                  </li>
                  <li className="subscription__list--item">
                    Access to BlueBadge tier 3 channel
                  </li>
                  <li className="subscription__list--item">
                    Premium calls and live classes
                  </li>
                  <li className="subscription__list--item">
                    One-on-one trading support with our staff{" "}
                  </li>
                  <li className="subscription__list--item">
                  Full access to premium signals
                  </li>
                  <li className="subscription__list--item">
                  Information about Government Contracts
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default AboutProduct;
