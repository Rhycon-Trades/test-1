import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { db } from "../firebase/init";
import {
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import Emojis from "./Emojis";

function Message({
  emojis,
  displaySideBar,
  message,
  user,
  replyTo,
  previousMessage,
}) {
  const [edit, setEdit] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reply, setReply] = useState(false);
  const [msgText, setMsgText] = useState(message.text);
  const [displayEmojis, setDisplayEmojis] = useState(false);
  const [slugs, setSlugs] = useState(false);
  const [dateOfCreation , setDateOfCreation] = useState(".")

  if (edit) {
    document.addEventListener("keydown", (key) => {
      if (key.key === "Escape") {
        setEdit(false);
      }
    });
  }

  /* 
    Date of creation
    */

  useEffect(() => {
    if (message.createdAt !== null) {
      const today = new Date();
      const todayDay = today.getDate();
      const todayMonth = today.getMonth() + 1;
      const todayYear = today.getFullYear();
      const todayDMY = todayDay + "/" + todayMonth + "/" + todayYear;
      const yestardayDMY = todayDay - 1 + "/" + todayMonth + "/" + todayYear;
      const timeFrame = message.createdAt.seconds * 1000 
      const messageDate = new Date(timeFrame);
      const messageDay = messageDate.getDate();
      const messageMonth = messageDate.getMonth() + 1;
      const messageYear = messageDate.getFullYear();
      let myDate = messageDay + "/" + messageMonth + "/" + messageYear;
      let myTime;
  
      if (messageDate.getMinutes() < 10) {
        myTime = messageDate.getHours() + ":" + "0" + messageDate.getMinutes();
      } else {
        myTime = messageDate.getHours() + ":" + messageDate.getMinutes();
      }
  
      if (todayDMY === myDate) {
        setDateOfCreation("today at " + myTime)
      } else if (yestardayDMY === myDate) {
        setDateOfCreation("yestarday at " + myTime)
      } else {
        setDateOfCreation(myDate + " at " + myTime)
      }
    }
  },[message])


    // console.log(message)

  useEffect(() => {
    if (message.replyTo) {
      getReply();
    }

    if (message.character !== undefined && emojis) {
      const target = emojis.find(
        (emoji) =>
          emoji.slug.replace(new RegExp("-", "g"), "") === message.character
      );
      setSlugs(target);
    }

    if (message.character === undefined) {
      setSlugs(false);
    }
  }, [message]);

  useEffect(() => {
    if (displaySideBar && window.innerWidth <= 768) {
      setDisplayEmojis(false);
    }
  });

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
      edited: true,
    };
    setEdit(false);
    await updateDoc(docRef, newPost);
  }

  function copyText() {
    navigator.clipboard.writeText(message.text).then(() => {
      setCopied(true);
    });
  }

  async function addEmoji(slug) {
    setDisplayEmojis(false);

    if (eval("message." + user.uid) === undefined) {
      const docRef = doc(db, "messages", message.id);
      const emoji = slug.replace(new RegExp("-", "g"), "");
      let count;
      let filteredSlug = slug.replace(new RegExp("-", "g"), "");

      if (eval("message." + emoji)) {
        count = eval("message." + emoji) + 1;
      } else {
        count = 1;
      }

      let newPost;

      if (message.character === undefined) {
        newPost = {
          [emoji]: count,
          character: filteredSlug,
          [user.uid]: true,
        };
      } else {
        newPost = {
          [message.character]: count,
          [user.uid]: true,
        };
      }

      filteredSlug === message.character ||
        (message.character === undefined && (await updateDoc(docRef, newPost)));
    }
  }

  async function recactionButton() {
    const docRef = doc(db, "messages", message.id);
    const slug = slugs.slug.replace(new RegExp("-", "g"), "");
    let count;
    let newPost;

    if (eval("message." + user.uid) === true) {
      count = eval("message." + slug) - 1;

      if (count === 0) {
        newPost = {
          [user.uid]: deleteField(),
          character: deleteField(),
          [slug]: deleteField(),
        };
      } else {
        newPost = {
          [user.uid]: deleteField(),
          [slug]: count,
        };
      }
    } else {
      count = eval("message." + slug) + 1;

      newPost = {
        [user.uid]: true,
        [slug]: count,
      };
    }

    await updateDoc(docRef, newPost);
  }

  return (
    <>
      <li
        className={`message ${
          message.userId === previousMessage.userId && "message-section"
        } ${message.userId === user.uid && "message-local"}`}
      >
        {previousMessage.userId !== message.userId && (
          <figure className="message--user">
            <img src={message.photoUrl} className="message--user__logo" />
          </figure>
        )}
        <div className="message-container">
          {previousMessage.userId !== message.userId && (
            <p className="message--user__name">
              {message.userName} &nbsp;{" "}
              <span className="creationDate">{dateOfCreation}</span>
            </p>
          )}
          {edit ? (
            <form onSubmit={(event) => updateText(event)}>
              <input
                type="text"
                className="message--content message--edit"
                onChange={(event) => setMsgText(event.target.value)}
                value={msgText}
              />
              <div className="edit--bar">
                Click enter to{" "}
                <button type="submit" className="purple edit--bar__btn">
                  submit
                </button>{" "}
                or click esc to{" "}
                <button className=" edit--bar__btn purple">escape</button>
              </div>
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
                {message.text}{" "}
                {message.edited && (
                  <span className="creationDate">(edited)</span>
                )}
                {slugs && emojis && (
                  <div className="reactions-wrapper">
                    <div
                      onClick={recactionButton}
                      className={`reaction ${
                        eval("message." + user.uid) === true && "local-reaction"
                      }`}
                    >
                      {slugs && slugs.character}{" "}
                      {eval(
                        "message." +
                          slugs.slug.replace(new RegExp("-", "g"), "")
                      )}
                    </div>
                  </div>
                )}
              </p>
            </>
          )}
          <div className="message--bar">
            <button
              onClick={() => setDisplayEmojis(!displayEmojis)}
              className="message--bar__btn"
            >
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
          {displayEmojis && (
            <Emojis
              setDisplayEmojis={setDisplayEmojis}
              emojis={emojis}
              addEmoji={addEmoji}
            />
          )}
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
