import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { db } from "../firebase/init";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";

function Message({ message, user, replyTo, previousMessage }) {
  const [edit, setEdit] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reply, setReply] = useState(false);
  const [msgText, setMsgText] = useState(message.text);

  useEffect(() => {
    if (message.replyTo) {
      getReply();
    }
  }, [message]);

  console.log(reply);

  async function getReply() {
    const docRef = doc(db, "messages", message.replyTo);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setReply(docSnap.data());
    }
  }

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  async function deleteMessage() {
    const docRef = doc(db, "messages", message.id);
    await deleteDoc(docRef);
  }

  async function updateText(event) {
    event.preventDefault();
    const text = event.target[0].value;
    const docRef = doc(db, "messages", message.id);
    const newPost = {
      text: text,
    };
    setEdit(false);
    await updateDoc(docRef, newPost);
  }

  function copyText() {
    navigator.clipboard.writeText(message.text).then(() => {
      setCopied(true);
    });
  }

  return (
    <>
      <li
        className={`message ${message.userId === previousMessage.userId && 'message-section'} ${message.userId === user.uid && "message-local"}`}
      >
        {previousMessage.userId !== message.userId && (
          <figure className="message--user">
            <img src={message.photoUrl} className="message--user__logo" />
          </figure>
        )}
        <div className="message-container">
        {previousMessage.userId !== message.userId && (
          <p className="message--user__name">{message.userName}</p>
        )}
          {edit ? (
            <form onSubmit={(event) => updateText(event)}>
              <input
                type="text"
                className="message--content message--edit"
                onChange={(event) => setMsgText(event.target.value)}
                value={msgText}
              />
            </form>
          ) : (
            <>
              {reply !== false && (
                <div className="message--reply">
                  <div className="message--reply-container">
                    <p className="message--reply__name">{reply.userName}</p>
                    <p className="message--reply__text">{reply.text}</p>
                  </div>
                </div>
              )}
              <p
                className={`message--content ${
                  reply && "message--content-reply"
                }`}
              >
                {message.text}
              </p>
            </>
          )}
          <div className="message--bar">
            <button className="message--bar__btn">
              <FontAwesomeIcon icon="fa fa-face-smile" />
            </button>
            <button
              onClick={() => replyTo(message)}
              className="message--bar__btn"
            >
              <FontAwesomeIcon icon="fa fa-reply" />
            </button>
            <button onClick={copyText} className="message--bar__btn">
              <FontAwesomeIcon icon="fa fa-copy" />
            </button>
            {message.userId === user.uid && (
              <>
                <button
                  onClick={() => setEdit(true)}
                  className="message--bar__btn"
                >
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
      {copied && (
        <div className="message--success">
          <FontAwesomeIcon icon="fa fa-check" />
        </div>
      )}
    </>
  );
}

export default Message;
