import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import Message from '../ui/Message'
import { db } from '../firebase/init'
import { addDoc, collection, limit, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { useInView } from 'react-intersection-observer'

function Channels({ user , channel }) {
    const [messages , setMessages] = useState(null)
    const [newMessage , setNewMessage] = useState()
    const [scrollToBottom , setScrollToBottom] = useState(true)
    const [messageSent , setMessageSent] = useState(true)
    const input = document.getElementById('channel__input') 
    const dummy = useRef()
    const {ref , inView} = useInView()
    
    useEffect(() => {
        if(messages && scrollToBottom){
            dummy.current.scrollIntoView()
            setScrollToBottom(false)
        }
    }, [messages])

    useEffect(() => {
        if(newMessage && (newMessage.userId === user.uid || inView)){
            dummy.current.scrollIntoView({ behavior: 'smooth' })
        }
    },[newMessage])

    useEffect(() => {
        if(db){
            importData()
        }
    }, [db])

    useEffect(() => {
        setMessages(null)
        importData()
    },[channel])

    function importData(){
        const q = query(collection(db, "messages"), where("channel", "==", channel) , orderBy("createdAt") , limit(100));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            const newData = {...doc.data() , id:doc.id}
              data.push(newData);
              setNewMessage(newData)
          });
          setMessages(data);
        });
    }
    
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
            channel: channel,
        }
        addDoc(collection(db , 'messages') , post)
        setMessageSent(!messageSent)
        input.value = ''
    }
    }

  return (
    <div className='channel'>
        <div className="channel--messages">
        <div className="channel--intro">
        <h2 className="channel__header">Welcome to {channel}</h2>
        <p className="channel__para">this is the start of this channel</p>
        </div>
        <ul className="channel--messages-wrapper">
            {messages && messages.map((message) => <Message user={user} message={message} key={message.id} />)}
            <div ref={dummy} ><div ref={ref}></div></div>
        </ul>
        </div>
            <form onSubmit={(event) => sendMessage(event)} className='channel__form'>
                <input autoComplete="off" type="text" id='channel__input' className='channel__input'/>
                <button type="submit" className='channel__submit' >
                    <FontAwesomeIcon icon='fa fa-paper-plane' />
                </button>
            </form>
    </div>
  )
}

export default Channels