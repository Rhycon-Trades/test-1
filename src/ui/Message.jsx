import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { db } from "../firebase/init";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

function Message({ message, user }) {
  const [edit , setEdit] = useState(false)
  const [msgText , setMsgText] = useState(message.text)

  async function deleteMessage(){
    const docRef = doc(db , 'messages' , message.id)
    await deleteDoc(docRef)
  }

  async function updateText(event){
    event.preventDefault()
    const text = event.target[0].value
    const docRef = doc(db , 'messages' , message.id)
    const newPost = {
      text:text,
    }
    setEdit(false)
    await updateDoc(docRef , newPost)
  }

  return (
    <li className={`message ${message.userId === user.uid && "message-local"}`}>
      <div className="message-container">
        <figure className="message--user">
          <img src={message.photoUrl} className="message--user__logo" />
          <p className="message--user__name">{message.userName}</p>
        </figure>
        {
            edit ? <form onSubmit={(event) => updateText(event)}>
              <input type="text"  className="message--content message--edit" onChange={(event) => setMsgText(event.target.value)} value={msgText} />
            </form> :
        <p className="message--content">{message.text}</p>
          }
        <div className="message--bar">
          <button className="message--bar__btn">
            <FontAwesomeIcon icon="fa fa-face-smile" />
          </button>
          <button className="message--bar__btn">
            <FontAwesomeIcon icon="fa fa-reply" />
          </button>
          <button className="message--bar__btn">
            <FontAwesomeIcon icon="fa fa-copy" />
          </button>
          {message.userId === user.uid && (
            <>
              <button onClick={() => setEdit(true)} className="message--bar__btn">
                <FontAwesomeIcon icon="fa fa-pen" />
              </button>
              <button onClick={deleteMessage} className="message--bar__btn">
                <FontAwesomeIcon icon="fa fa-trash" />
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default Message;
