import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function ProductFeature({feature}) {
  return (
    <p className="product__feature">
        <FontAwesomeIcon className='product__feature--icon' icon={"fa fa-check"} />
        {feature}
    </p>
  )
}

export default ProductFeature