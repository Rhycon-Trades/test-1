import React, { useEffect, useState } from "react";
import Product from "../ui/Product";

function Prodcuts({ products , cart  ,setCart}) {

  const [items , setItems] = useState(null)
  const [render , setRender] = useState(false)

  useEffect(() => {
    setItems(products)
  }, [products])

  function sortProducts(value){
    if(value == 'low-to-high'){
      products.sort((a , b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice))
    }else if(value == 'high-to-low'){
      products.sort((a , b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice))
    }
    setRender(!render)
  }

  function filterProducts(value){
    let filtered
    if(value == 'Indicators'){
      filtered = products.filter((product) => product.type == 'indicator')
    }else if(value == 'Courses'){
      filtered = products.filter((product) => product.type == 'course')
    }else if(value == 'Signals'){
      filtered = products.filter((product) => product.type == 'signals')
    }else {
      filtered = products.filter((product) => product)
    }
    setItems(filtered)
  }
  
  return (
    <>
      <main>
        <div className="container products-container">
          <div className="products--bar">
            <h2 className="products-title">Products</h2>
            <div className="products--func">
              <div className="products__filter">
                <select className="products__filter-sort" name="filter" onChange={(event) => filterProducts(event.target.value)}>
                  <option value="All">type ,All</option>
                  <option value="Courses">type ,Courses</option>
                  <option value="Indicators">type ,Indicators</option>
                  <option value="Signals">type ,Signals</option>
                </select>
              </div>
              <div className="products__sort">
                <select className="products__filter-sort" defaultValue={'sort'} name="sort" onChange={(event) => sortProducts(event.target.value)} >
                  <option value="sort" disabled>
                    sort
                  </option>
                  <option value="low-to-high">Price ,Low To High</option>
                  <option value="high-to-low">Price ,High To Low</option>
                </select>
              </div>
            </div>
          </div>
          <div className="products">
            {items != null &&
              items.map((product) => <Product setCart={setCart} product={product} cart={cart} key={product.id} />)
            }
          </div>
        </div>
      </main>
    </>
  );
}

export default Prodcuts;
