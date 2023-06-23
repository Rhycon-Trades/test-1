import React, { useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase/init'
import Operation from './Operation'

function PopUp({closePopup}) {
    const [displayOperation , setDisplayOperation] = useState(false)
    const [operationMessage , setOperationMessage] = useState('')
    const [operationState , setOperationState] = useState(true)

    async function addEmail(event){
        event.preventDefault()
        const ref = query(
            collection(db, "mailingList"),
            where("email", "==", event.target[0].value)
          );
            const data = await getDocs(ref)
            const posts = await data.docs.map((doc) => ({...doc.data()}))
            if(Object.keys(posts).length === 0){
                const email = {email:event.target[0].value}
                addDoc(collection(db , 'mailingList'),email)
                setDisplayOperation(true)
                setOperationMessage("this email is now a member of our mailing list")
                setOperationState(true)
                closePopup()
            }else{
                setDisplayOperation(true)
                setOperationMessage('This email is already used')
                setOperationState(false)
            }
    }

  return (
    <div id='popup'>
        <button className='popup--mark'><FontAwesomeIcon onClick={closePopup} icon='fa fa-xmark'/></button>
        <div className="popup--content">
        <h4 className="popup__header">Limited Time <br /> 15% off</h4>
        <p className="popup__text">Save on your first order and get email-only offers when you join our mailing list.</p>
            <form onSubmit={(event) => addEmail(event)} action="">
                <input id='popup__input' placeholder='enter your email' required type="email" />
                <input style={{borderRadius:'10px'}} type='submit' />
            </form>
        </div>
        {
            displayOperation && <Operation message={operationMessage} setOperation={setDisplayOperation} success={operationState} />
        }
    </div>
  )
}

export default PopUp