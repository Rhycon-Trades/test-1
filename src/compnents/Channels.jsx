import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Message from '../ui/Message'
import { db } from '../firebase/init'
import { addDoc, collection, limit, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'

function Channels({ user }) {
    const [messages , setMessages] = useState(null)
    const input = document.getElementById('channel__input') 

    useEffect(() => {
        if(db){
            const q = query(collection(db, "messages"), where("channel", "==", "1") , orderBy("createdAt") , limit(100));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
              const data = [];
              querySnapshot.forEach((doc) => {
                  data.push({...doc.data() , id:doc.id});
              });
              setMessages(data);
            });
        }
    }, [db])
    
    function sendMessage(event){
        event.preventDefault()
        const message = event.target[0].value
        if(message != false){
        const post = {
            text: message,
            userName: user.displayName,
            photoUrl: user.photoURL,
            userId: user.uid,
            createdAt: serverTimestamp(), 
            channel:"1",
        }
        addDoc(collection(db , 'messages') , post)
        input.value = ''}
    }

  return (
    <div className='channel'>
        <div className="channel--messages">
        <div className="channel--intro">
        <h2 className="channel__header">Welcome</h2>
        <p className="channel__para">this is the start of this channel</p>
        </div>
        <ul className="channel--messages-wrapper">
            {messages && messages.map((message) => <Message user={user} message={message} key={message.id} />)}
        </ul>
        </div>
            <form onSubmit={(event) => sendMessage(event)} className='channel__form'>
                <input type="text" id='channel__input' className='channel__input'/>
                <button type="submit" className='channel__submit' >
                    <FontAwesomeIcon icon='fa fa-paper-plane' />
                </button>
            </form>
    </div>
  )
}

export default Channels