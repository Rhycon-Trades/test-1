import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import Message from "../ui/Message";
import { db } from "../firebase/init";
import {
  addDoc,
  collection,
  deleteField,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useInView } from "react-intersection-observer";

function Channels({ user, channel , setDisplaySideBar , displaySideBar , usersList , displayUsersList , setDisplayUsersList }) {
  const [messages, setMessages] = useState(null);
  const [text , setText] = useState('')
  const [displayAtMenu , setDisplayAtMenu] = useState(false)
  const [emojis , setEmojis] = useState(false)
  const [newMessage, setNewMessage] = useState();
  const [scrollToBottom, setScrollToBottom] = useState(true);
  const [messageSent, setMessageSent] = useState(true);
  const [replyMessage, setReplyMessage] = useState(null);
  const input = document.getElementById("channel__input");
  const dummy = useRef();
  const { ref, inView } = useInView();
  let previousMessage = false
  
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

    if(eval("user." + channel)){
      const post = {
      [channel]: deleteField()
    }
    updateDoc(doc(db , 'users' , user.docId) , post)
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

  useEffect(() => {
    text[text.length-1] !== '@' && setDisplayAtMenu(false)
    text[text.length-1] === '@' && setDisplayAtMenu(true)
  },[text])

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

  async function sendMessage(event) {
    event.preventDefault();
    const message = event.target[0].value;
    let mention = []

    usersList.map((item) => {
      if(text.includes('@'+item.displayName)){
        mention.push({id:item.docId , channel:channel})
      }
    })

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
      await addDoc(collection(db, "messages"), post);
      setMessageSent(!messageSent);
      setText('')
      input.value = "";
      mention.map((item) => {
        let mentionPost 
        if(eval('item.' +  channel)){
          let num = eval('item.' +  channel) + 1
          mentionPost = {
            [channel] : num
          }
        }else{
          mentionPost = {
            [channel] : 1
          }
        }

        updateDoc(doc(db , 'users' , item.id) , mentionPost)
      })
    }
  }

  async function replyTo(message) {
    setReplyMessage(message);
  }

  function containsNumber(str){
    return /[0-9]/.test(str)
  }

  async function claimRole(role , claim){
    const docRef = doc(db, 'users' , user.docId)
    let update
    if(claim){
      update = {
        [role]:true
      }
    }else{
      update = {
        [role]: false
      }
    }
    await updateDoc(docRef , update)

  }

  return (
    <div id="channel" className="channel">
      <div className="channel--bar">
        <button onClick={() => setDisplaySideBar(!displaySideBar)} className={`bar__btn ${!displaySideBar && 'bar__btn-selected'}`}>
          <FontAwesomeIcon icon='fa fa-bars' />
        </button>
        <p className="bar__header">#{channel}</p>
        <button onClick={() => setDisplayUsersList(!displayUsersList)} className={`bar__btn ${!displayUsersList && 'bar__btn-selected'}`}>
          <FontAwesomeIcon icon='fa fa-user' />
        </button>
      </div>
      <div className="channel--messages">
        <div className="channel--intro">
          <h2 className="channel__header">Welcome to {channel}</h2>
          <p className="channel__para">this is the start of this channel</p>
        </div>
        <ul className="channel--messages-wrapper">
        {channel === 'claim' && 
                <div className="message--content">
                  <h5>Claim Roles:</h5>
                  <ul className="claim-roles">
                    <li className="calim-roles--role">
                      <p>Crypto</p> { !user.crypto ? <button onClick={() => claimRole("crypto" , true)} className="claim-roles__btn claim-roles__btn--claim">claim</button> : <button onClick={() => claimRole("crypto" , false)} className="claim-roles__btn claim-roles__btn--remove">remove</button>}
                    </li>
                    <li className="calim-roles--role">
                      <p>Stocks</p> { !user.stocks ? <button onClick={() => claimRole("stocks" ,true)} className="claim-roles__btn claim-roles__btn--claim">claim</button> : <button onClick={() => claimRole("stocks" , false)} className="claim-roles__btn claim-roles__btn--remove">remove</button>}
                    </li>
                    <li className="calim-roles--role">
                      <p>Forex</p> {!user.forex ? <button onClick={() => claimRole("forex" ,true)} className="claim-roles__btn claim-roles__btn--claim">claim</button> : <button onClick={() => claimRole("forex" , false)} className="claim-roles__btn claim-roles__btn--remove">remove</button>}
                    </li>
                    <li className="calim-roles--role">
                      <p>Free Signals</p> {!user.free_signals ? <button onClick={() => claimRole("free_signals" ,true)} className="claim-roles__btn claim-roles__btn--claim">claim</button> : <button onClick={() => claimRole("free_signals" , false)} className="claim-roles__btn claim-roles__btn--remove">remove</button>}
                    </li>
                  </ul>
                </div>
            }

          {messages &&
            messages.map((message) => {
              const data = <Message
                user={user}
                userId={message.userId}
                usersList={usersList}
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
      {channel !== 'claim' || user.founder || user.admin ? <form onSubmit={(event) => sendMessage(event)} className="channel__form">
        <input
          autoComplete="off"
          placeholder="Message"
          type="text"
          id="channel__input"
          className="channel__input"
          onChange={(event) => setText(event.target.value)}
          value={text}
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
          {
            displayAtMenu && (
              <div className="channel--reply channel--menu">
                <ul className="channel--menu__users">
                {
                  usersList && usersList.map((item) => (
                    <li onClick={() => setText(text+item.displayName)} key={item.uid} className="menu__user">
                    <figure className="menu__user--img">
                      <img src={item.photoUrl} />
                    </figure>
                    <p className="menu__user--name">{item.displayName}</p>
                  </li>
                  ))
                }
                </ul>
              </div>
            )
          }
      </form>
      : (
        <div className="channel__form">
          <div className="channel__input" style={{cursor:'not-allowed'}}>You don't have permission</div>
        </div>
      )}
    </div>
  );
}

export default Channels;
