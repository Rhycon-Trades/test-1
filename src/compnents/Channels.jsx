import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import Message from "../ui/Message";
import { db } from "../firebase/init";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useInView } from "react-intersection-observer";

function Channels({ user, channel , setDisplaySideBar , displaySideBar }) {
  const [messages, setMessages] = useState(null);
  const [emojis , setEmojis] = useState(false)
  const [newMessage, setNewMessage] = useState();
  const [scrollToBottom, setScrollToBottom] = useState(true);
  const [messageSent, setMessageSent] = useState(true);
  const [replyMessage, setReplyMessage] = useState(null);
  const input = document.getElementById("channel__input");
  // const [channelWidth , setChannelWidth] = useState('0px')
  const dummy = useRef();
  const { ref, inView } = useInView();
  let previousMessage = false
  
  // useEffect(() => {
  //   const channelRef = document.getElementById('channel')
  //   if(channelRef !== null){
  //     setChannelWidth(channelRef.offsetWidth.toString()+'px')
  //   }
  // },document.getElementById('channel'))

  useEffect(() => {
    const rowData = fetch("https://emoji-api.com/emojis?access_key=39f8ebdd5893bad2f5b3d9bf4434b2716ebb98ab")
    .then((response) => response.json())
    .then((data) => data.filter((item) => !item.slug.includes('rainbow-flag' || 'kiss-man-man' || 'kiss-woman-woman' || 'couple-with-heart-man-man' || 'couple-with-heart-woman-woman') || !containsNumber(item.slug)) )
    .then(data => setEmojis(data))
},[])

  useEffect(() => {
    if (messages && scrollToBottom) {
      dummy.current.scrollIntoView();
      setScrollToBottom(false);
    }
  }, [messages]);

  useEffect(() => {
    if (newMessage && (newMessage.userId === user.uid || inView)) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [newMessage]);

  useEffect(() => {
    if (db) {
      importData();
    }
  }, [db]);

  useEffect(() => {
    setMessages(null);
    importData();
  }, [channel]);

  function importData() {
    const q = query(
      collection(db, "messages"),
      where("channel", "==", channel),
      orderBy("createdAt"),
      limit(100)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const newData = { ...doc.data(), id: doc.id };
        data.push(newData);
        setNewMessage(newData);
      });
      setMessages(data);
    });
  }

  function sendMessage(event) {
    event.preventDefault();
    const message = event.target[0].value;
    if (message != false) {
      let replyTo
      if(replyMessage){
        replyTo = replyMessage.id
        setReplyMessage(null)
      }else{
        replyTo = null
      }
      const post = {
        text: message,
        userName: user.displayName,
        photoUrl: user.photoUrl,
        userId: user.uid,
        createdAt: serverTimestamp(),
        channel: channel,
        replyTo: replyTo
      };
      addDoc(collection(db, "messages"), post);
      setMessageSent(!messageSent);
      input.value = "";
    }
  }

  async function replyTo(message) {
    setReplyMessage(message);
  }

  function containsNumber(str){
    return /[0-9]/.test(str)
  }

  return (
    <div id="channel" className="channel">
      <div className="channel--bar">
        <button onClick={() => setDisplaySideBar(!displaySideBar)} className={`bar__btn ${!displaySideBar && 'bar__btn-selected'}`}>
          <FontAwesomeIcon icon='fa fa-bars' />
        </button>
        <p className="bar__header">#{channel}</p>
        <button className="bar__btn">
          <FontAwesomeIcon icon='fa fa-user' />
        </button>
      </div>
      <div className="channel--messages">
        <div className="channel--intro">
          <h2 className="channel__header">Welcome to {channel}</h2>
          <p className="channel__para">this is the start of this channel</p>
        </div>
        <ul className="channel--messages-wrapper">
          {messages &&
            messages.map((message) => {
              const data = <Message
                user={user}
                message={message}
                replyTo={replyTo}
                emojis={emojis}
                previousMessage={previousMessage}
                displaySideBar={displaySideBar}
                key={message.id}
              />
              previousMessage = message
              return data
            })}
          <div ref={dummy}>
            <div ref={ref}></div>
          </div>
        </ul>
      </div>
      <form onSubmit={(event) => sendMessage(event)} className="channel__form">
        <input
          autoComplete="off"
          placeholder="Message"
          type="text"
          id="channel__input"
          className="channel__input"
        />
        <button type="submit" className="channel__submit">
          <FontAwesomeIcon icon="fa fa-paper-plane" />
        </button>
          {replyMessage !== null && (
        <div className="channel--reply">
            <p className="channel--reply__text">
              Replying to {replyMessage.userName}
            </p>
            <button onClick={() => {setReplyMessage(null)}} className="channel--reply__cancel">
                <FontAwesomeIcon icon='fa fa-xmark' />
            </button>
        </div>
          )}
      </form>
    </div>
  );
}

export default Channels;
