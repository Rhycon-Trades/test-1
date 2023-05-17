import React from 'react'

function Message({ message , user }) {
  return (
    <li className={`message ${message.userId === user.uid && 'message-local'}`}>
        <figure className="message--user">
            <img src={message.photoUrl} className="message--user__logo" />
            <p className="message--user__name">{message.userName}</p>
        </figure>
        <p className="message--content">{message.text}</p>
    </li>
  )
}

export default Message