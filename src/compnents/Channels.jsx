import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import Message from "../ui/Message";
import { db, storage } from "../firebase/init";
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
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { v4 } from "uuid";

function Channels({
  user,
  channel,
  setDisplaySideBar,
  displaySideBar,
  usersList,
  displayUsersList,
  setDisplayUsersList,
  claimRole,
  badWords,
  rhyconBot,
  roles,
  commands,
}) {
  const [messages, setMessages] = useState(null);
  const [text, setText] = useState("");
  const [displayAtMenu, setDisplayAtMenu] = useState(false);
  const [displayChannelMenu, setDisplayChannelMenu] = useState(false);
  const [displayCommandsMenu, setDisplayCommandsMenu] = useState(false);
  const [emojis, setEmojis] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [scrollToBottom, setScrollToBottom] = useState(true);
  const [messageSent, setMessageSent] = useState(true);
  const [replyMessage, setReplyMessage] = useState(null);
  const input = document.getElementById("channel__input");
  const channels = [
    "intro",
    "faq",
    "annoucements",
    "results",
    "general",
    "begginer",
    "ask",
    "claim",
    "polls",
    "invites",
  ];
  const dummy = useRef();
  const { refItem, inView } = useInView();
  let previousMessage = false;

  useEffect(() => {
    const rowData = fetch(
      "https://emoji-api.com/emojis?access_key=39f8ebdd5893bad2f5b3d9bf4434b2716ebb98ab"
    )
      .then((response) => response.json())
      .then((data) =>
        data.filter(
          (item) =>
            !item.slug.includes(
              "rainbow-flag" ||
                "kiss-man-man" ||
                "kiss-woman-woman" ||
                "couple-with-heart-man-man" ||
                "couple-with-heart-woman-woman"
            ) || !containsNumber(item.slug)
        )
      )
      .then((data) => setEmojis(data));
  }, []);

  useEffect(() => {
    if (messages && scrollToBottom) {
      dummy.current.scrollIntoView();
      setScrollToBottom(false);
    }

    if (eval("user." + channel)) {
      const post = {
        [channel]: deleteField(),
      };
      updateDoc(doc(db, "users", user.docId), post);
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
    text[text.length - 1] !== "@" && setDisplayAtMenu(false);
    text[text.length - 1] === "@" && setDisplayAtMenu(true);
    text[text.length - 1] !== "#" && setDisplayChannelMenu(false);
    text[text.length - 1] === "#" && setDisplayChannelMenu(true);
    text[text.length - 1] !== "/" && setDisplayCommandsMenu(false);
    text[text.length - 1] === "/" &&
      (user.founder || user.admin) &&
      setDisplayCommandsMenu(true);
  }, [text]);

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
    let mention = [];
    let isReturn;

    commands.map((el) => {
      if (message.toLowerCase().includes(el)) {
        command(message, el);
        isReturn = true;
      }
    });

    if (isReturn) {
      return;
    }

    await badWords.map((badWord) => {
      if (message.toLowerCase().includes(badWord)) {
        const warning = user.warn + 1;
        let mentions;
        if (eval("user." + channel)) {
          mentions = eval("user." + channel) + 1;
        } else {
          mentions = 1;
        }

        const post = {
          warn: warning,
          [channel]: mentions,
        };
        const messageText = `@${
          user.displayName
        } have been warned for using disrespectful words , you now have ${
          user.warn + 1
        } ${user.warn + 1 > 1 ? "warnings" : "warning"}`;
        const message = {
          text: messageText,
          userName: rhyconBot.displayName,
          photoUrl: rhyconBot.photoUrl,
          userId: rhyconBot.uid,
          createdAt: serverTimestamp(),
          channel: channel,
          replyTo: null,
          img: false,
        };
        setText("");
        const userRef = doc(db, "users", user.docId);
        updateDoc(userRef, post);
        addDoc(collection(db, "messages"), message);

        isReturn = true;
        return;
      }
    });

    if (isReturn) {
      return;
    }

    usersList.map((item) => {
      if (text.includes("@" + item.displayName)) {
        mention.push({ id: item.docId, channel: channel });
      }
    });

    roles.map((role) => {
      if (text.includes("@" + role)) {
        let mentionUsers;
        if (role !== "everyone") {
          mentionUsers = usersList.filter(
            (item) => eval("item." + role) === true
          );
        } else if (role === "everyone") {
          mentionUsers = usersList;
        }
        mentionUsers.map((item) => {
          mention.push({ id: item.docId, channel: channel });
        });
      }
    });

    if (message != false) {
      let post;
      let replyTo;

      if (replyMessage) {
        replyTo = replyMessage.id;
        setReplyMessage(null);
      } else {
        replyTo = null;
      }
      post = {
        text: message,
        userName: user.displayName,
        photoUrl: user.photoUrl,
        userId: user.uid,
        createdAt: serverTimestamp(),
        channel: channel,
        replyTo: replyTo,
        img: false,
      };
      await addDoc(collection(db, "messages"), post);
      setMessageSent(!messageSent);
      setText("");
      input.value = "";
      mention.map((item) => {
        let mentionPost;
        if (eval("item." + channel) > 0) {
          let num = eval("item." + channel) + 1;
          mentionPost = {
            [channel]: num,
          };
        } else {
          mentionPost = {
            [channel]: 1,
          };
        }

        updateDoc(doc(db, "users", item.id), mentionPost);
      });
    }
  }

  async function sendImage(event) {
    event.preventDefault();
    const image = event.target.files[0];
    if (image === null) {
      return;
    }

    let replyTo;

    if (replyMessage) {
      replyTo = replyMessage.id;
      setReplyMessage(null);
    } else {
      replyTo = null;
    }

    const imageRef = ref(storage, `images/${v4()}`);
    const uploadTask = uploadBytes(imageRef, image).then(() => {
      const link = getDownloadURL(imageRef).then((url) => {
        const post = {
          imageUrl: url,
          userName: user.displayName,
          photoUrl: user.photoUrl,
          userId: user.uid,
          createdAt: serverTimestamp(),
          channel: channel,
          replyTo: replyTo,
          img: true,
        };

        addDoc(collection(db, "messages"), post);
      });
    });
  }

  async function command(command, type) {
    setText('')
    if (user.founder || user.admin || text.split(' ')[0] === '/status') {
      let message;
      let isReturn;
      if (
        type === "warn" ||
        type === "ban" ||
        type === "kick" ||
        type === "mute"
      ) {
        const effectedUser = command.split(" ")[1];
        const rawDuration = command.split(" ")[2];
        const duration = new Date();
        if (type === "ban" || type === "mute") {
          duration.setDate(duration.getDate() + +rawDuration);
        }

        const target = usersList.find(
          (el) =>
            el.displayName.replace(new RegExp(" ", "g"), "") === effectedUser
        );
        if (target == undefined) {
          console.log(undefined);
          isReturn = true;
          return;
        }
        message = {
          text: `@${target.displayName} has benn ${
            type !== "ban" ? type : "bann"
          }ed for ${rawDuration} day(s) for violating our community guidelines , he now has ${
            type !== "mute" ? eval("target." + type) + 1 : target.muteCount + 1
          } ${type}(s)`,
          userName: rhyconBot.displayName,
          userId: rhyconBot.uid,
          photoUrl: rhyconBot.photoUrl,
          createdAt: serverTimestamp(),
          channel: channel,
          replyTo: null,
          img: false,
        };
        let action;
        if (type === "ban" || type === "mute") {
          action = {
            [type]: eval("target." + type) + 1,
            [type + "Duration"]: duration,
            [channel]: (eval("user." + channel) !== undefined ? eval("user." + channel) + 1 : 1)

          };
        } else {
          action = {
            [type]: eval("target." + type) + 1,
            [channel]: (eval("user." + channel) !== undefined ? eval("user." + channel) + 1 : 1)
          };
        }

        updateDoc(doc(db, "users", target.docId), action);
      }else if(type === 'status'){
        message = {
          text:`@${user.displayName}, since you joined you have had ${user.ban} ban(s), ${user.kick} kick(s), ${user.mute} mute(s), ${user.warn} warn(s)`,
          userName: rhyconBot.displayName,
          userId: rhyconBot.uid,
          photoUrl: rhyconBot.photoUrl,
          createdAt: serverTimestamp(),
          channel: channel,
          replyTo: null,
          img: false,
        }

        updateDoc(doc(db, 'users', user.docId), {
          [channel]: (eval("user." + channel) !== undefined ? eval("user." + channel) + 1 : 1)
        })
      }else if(type === 'give' || type === 'remove'){
        const targetName = command.split(' ')[1]
        const targetRole = (command.split(' ')[2]).toLowerCase()
        const target = usersList.find((el) => el.displayName.replace(new RegExp(" ", "g"), "") === targetName)

        if(target == undefined){
          isReturn = true
          return
        }

        roles.map((el) =>{ if(el.toLowerCase() !== targetRole){
          isReturn = true
          return
        }})

        let messageText
        let action 
        
        if(type === 'give'){
          messageText = `@${target.displayName} now have "${targetRole}"`
          action = {
            [channel]:(eval("user." + channel) !== undefined ? eval("user." + channel) + 1 : 1),
            [targetRole]:true
          }
        }else{
          messageText = `"${targetRole}" have been removed from @${target.displayName} `
          action = {
            [channel]:(eval("user." + channel) !== undefined ? eval("user." + channel) + 1 : 1),
            [targetRole]:false
          }
        }

        message = {
          text:messageText,
          userName: rhyconBot.displayName,
          userId: rhyconBot.uid,
          photoUrl: rhyconBot.photoUrl,
          createdAt: serverTimestamp(),
          channel: channel,
          replyTo: null,
          img: false,
        }

        updateDoc(doc(db, 'users', target.docId), action)
        addDoc(collection(db, "messages"), message);

      }else if(type === 'send'){
        const messageText = command.replace('/send','')
        message = {
          text:messageText,
          userName: rhyconBot.displayName,
          userId: rhyconBot.uid,
          photoUrl: rhyconBot.photoUrl,
          createdAt: serverTimestamp(),
          channel: channel,
          replyTo: null,
          img: false,
        }
      }

      if (isReturn) {
        return;
      }
      addDoc(collection(db, "messages"), message);
    }
  }

  async function replyTo(message) {
    setReplyMessage(message);
  }

  function containsNumber(str) {
    return /[0-9]/.test(str);
  }

  return (
    <div id="channel" className="channel">
      <div className="channel--bar">
        <button
          onClick={() => setDisplaySideBar(!displaySideBar)}
          className={`bar__btn ${!displaySideBar && "bar__btn-selected"}`}
        >
          <FontAwesomeIcon icon="fa fa-bars" />
          {user.intro ||
            user.faq ||
            user.announcements ||
            user.results ||
            user.general ||
            user.begginer ||
            user.ask ||
            user.cliam ||
            user.polls ||
            (user.invites && <span className="bar__btn--dot"></span>)}
        </button>
        <p className="bar__header">#{channel}</p>
        <button
          onClick={() => setDisplayUsersList(!displayUsersList)}
          className={`bar__btn ${!displayUsersList && "bar__btn-selected"}`}
        >
          <FontAwesomeIcon icon="fa fa-user" />
        </button>
      </div>
      <div className="channel--messages">
        <div className="channel--intro">
          <h2 className="channel__header">Welcome to {channel}</h2>
          <p className="channel__para">this is the start of this channel</p>
        </div>
        <ul className="channel--messages-wrapper">
          {channel === "claim" && (
            <div className="message--content">
              <h5>Claim Roles:</h5>
              <ul className="claim-roles">
                <li className="calim-roles--role">
                  <p>Crypto</p>{" "}
                  {!user.crypto ? (
                    <button
                      onClick={() => claimRole("crypto", true)}
                      className="claim-roles__btn claim-roles__btn--claim"
                    >
                      claim
                    </button>
                  ) : (
                    <button
                      onClick={() => claimRole("crypto", false)}
                      className="claim-roles__btn claim-roles__btn--remove"
                    >
                      remove
                    </button>
                  )}
                </li>
                <li className="calim-roles--role">
                  <p>Stocks</p>{" "}
                  {!user.stocks ? (
                    <button
                      onClick={() => claimRole("stocks", true)}
                      className="claim-roles__btn claim-roles__btn--claim"
                    >
                      claim
                    </button>
                  ) : (
                    <button
                      onClick={() => claimRole("stocks", false)}
                      className="claim-roles__btn claim-roles__btn--remove"
                    >
                      remove
                    </button>
                  )}
                </li>
                <li className="calim-roles--role">
                  <p>Forex</p>{" "}
                  {!user.forex ? (
                    <button
                      onClick={() => claimRole("forex", true)}
                      className="claim-roles__btn claim-roles__btn--claim"
                    >
                      claim
                    </button>
                  ) : (
                    <button
                      onClick={() => claimRole("forex", false)}
                      className="claim-roles__btn claim-roles__btn--remove"
                    >
                      remove
                    </button>
                  )}
                </li>
                <li className="calim-roles--role">
                  <p>Free Signals</p>{" "}
                  {!user.free_signals ? (
                    <button
                      onClick={() => claimRole("free_signals", true)}
                      className="claim-roles__btn claim-roles__btn--claim"
                    >
                      claim
                    </button>
                  ) : (
                    <button
                      onClick={() => claimRole("free_signals", false)}
                      className="claim-roles__btn claim-roles__btn--remove"
                    >
                      remove
                    </button>
                  )}
                </li>
              </ul>
            </div>
          )}

          {messages &&
            messages.map((message) => {
              const data = (
                <Message
                  user={user}
                  userId={message.userId}
                  usersList={usersList}
                  message={message}
                  replyTo={replyTo}
                  emojis={emojis}
                  previousMessage={previousMessage}
                  displaySideBar={displaySideBar}
                  key={message.id}
                  channels={channels}
                />
              );
              previousMessage = message;
              return data;
            })}
          <div ref={dummy}>
            <div ref={refItem}></div>
          </div>
        </ul>
      </div>
      {channel !== "claim" || user.founder || user.admin ? (
        <div className="channel__form-wrapper">
          <label for="actual-btn" className="form--img">
            <FontAwesomeIcon icon={"fa fa-plus"} />
          </label>
          <input
            onChange={(event) => sendImage(event)}
            id="actual-btn"
            type="file"
            accept="image/*"
            hidden
          />
          <form
            style={{ maxWidth: "100%", width: "100%" }}
            onSubmit={(event) => sendMessage(event)}
            className="channel__form"
          >
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
                <button
                  onClick={() => {
                    setReplyMessage(null);
                  }}
                  className="channel--reply__cancel"
                >
                  <FontAwesomeIcon icon="fa fa-xmark" />
                </button>
              </div>
            )}
            {displayAtMenu && (
              <div className="channel--reply channel--menu">
                <ul className="channel--menu__users">
                  {roles.map((role) => (
                    <li
                      onClick={() => setText(text + role)}
                      key={role}
                      className="menu__user"
                    >
                      <p className="menu__user--name">{"@" + role}</p>
                    </li>
                  ))}
                  {usersList &&
                    usersList.map((item) => (
                      <li
                        onClick={() => setText(text + item.displayName)}
                        key={item.uid}
                        className="menu__user"
                      >
                        <figure className="menu__user--img">
                          <img src={item.photoUrl} />
                        </figure>
                        <p className="menu__user--name">{item.displayName}</p>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {displayCommandsMenu && (
              <div className="channel--reply channel--menu">
                <ul className="channel--menu__users">
                  {commands.map((item, _) => {
                    return (
                      <li
                        key={_}
                        onClick={() => setText(text + item)}
                        className="menu__user"
                      >
                        <p className="menu__user--name">/ {item}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {displayChannelMenu && (
              <div className="channel--reply channel--menu">
                <ul className="channel--menu__users">
                  {channels.map((item, _) => {
                    return (
                      <li
                        key={_}
                        onClick={() => setText(text + item)}
                        className="menu__user"
                      >
                        <p className="menu__user--name"># {item}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </form>
        </div>
      ) : (
        <div className="channel__form">
          <div className="channel__input" style={{ cursor: "not-allowed" }}>
            You don't have permission
          </div>
        </div>
      )}
    </div>
  );
}

export default Channels;
