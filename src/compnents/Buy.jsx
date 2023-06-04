import React, { useState } from "react";
import { Link } from "react-router-dom";

function Buy() {

  return (
    <section id="buy">
      <div className="buy--call">
      <h1 className="buy-title">What are you waiting for ?</h1>
      <p className="buy__para">Don't let valuable opportunities slip away.</p>
      <Link to='/products'>
        <button>
          Buy Now
        </button>
      </Link>
      </div>
    </section>
  );
}

export default Buy;
