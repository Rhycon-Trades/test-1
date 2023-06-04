import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

function PopUp({closePopup}) {
    function removePopup(event){
        event.preventDefault()
        closePopup()
    }

  return (
    <div id='popup'>
        <FontAwesomeIcon onClick={(event) => removePopup(event)} className='popup--mark' icon='fa fa-xmark'/>
        <div className="popup--content">
        <h4 className="popup__header">Limited Time <br /> 15% off</h4>
        <p className="popup__text">Save on your first order and get email-only offers when you join our mailing list.</p>
            <form action="">
                <input id='popup__input' placeholder='enter your email' type="email" />
                <input style={{borderRadius:'10px'}} onClick={(event) => removePopup(event)} type='submit' />
            </form>
        </div>
    </div>
  )
}

export default PopUp