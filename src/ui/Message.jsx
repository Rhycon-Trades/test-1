import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { db } from "../firebase/init";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import Emojis from "./Emojis";

function Message({ emojis, message, user, replyTo, previousMessage }) {
  const [edit, setEdit] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reply, setReply] = useState(false);
  const [msgText, setMsgText] = useState(message.text);
  const [displayEmojis, setDisplayEmojis] = useState(false);
  const [slugs, setSlugs] = useState(false);

  useEffect(() => {
    if (message.replyTo) {
      getReply();
    }

    const slugNumber = getSlugNumber();
    if (slugNumber > 0) {
      let arr = [];
      for (let i = 1; i <= slugNumber; i++) {
        arr.push(eval("message.character" + i));
      }
      setSlugs(arr);
    }
  }, [message]);

  async function getReply() {
    const docRef = doc(db, "messages", message.replyTo);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setReply(docSnap.data());
    }
  }

  function getSlugNumber() {
    let num;
    try {
      for (
        let i = 1;
        eval("message.character" + i.toString()) !== undefined;
        i++
      ) {
        num = i;
      }
    } finally {
      return num !== undefined ? num : 0;
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

  async function addEmoji(slug) {
    setDisplayEmojis(false);

    if (eval("message." + user.uid)) {
      const docRef = doc(db, "messages", message.id);
      const emoji = slug.replace(new RegExp("-", "g"), "");
      let slugNum = getSlugNumber() + 1;
      let count;
      let filteredSlug = slug.replace(new RegExp("-", "g"), "");
      let name = "character" + slugNum.toString();

      if (eval("message." + emoji)) {
        count = eval("message." + emoji) + 1;
      } else {
        count = 1;
      }

      const newPost = {
        [emoji]: count,
        [name]: filteredSlug,
        [user.uid]: true,
      };
      await updateDoc(docRef, newPost);
    }
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
                {slugs && emojis && (
                  <div className="reactions-wrapper">
                    {slugs.map((slug) => {
                      const targetEmoji = emojis.find(
                        (emojiList) =>
                          emojiList.slug.replace(new RegExp("-", "g"), "") ===
                          slug
                      );
                      return (
                        <div
                          className={`reaction ${
                            !!eval("message." + user.uid) && "local-reaction"
                          }`}
                          key={Math.random()}
                        >
                          {targetEmoji &&
                            targetEmoji.character +
                              " " +
                              eval("message." + slug)}
                        </div>
                      );
                    })}
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
              <Emojis emojis={emojis} addEmoji={addEmoji} />
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
