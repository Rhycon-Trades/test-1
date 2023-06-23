import React from 'react'
import { Link } from 'react-router-dom'

function ChatSignals(isChat) {
  return (
    <main style={!isChat ? {backgroundColor:'#f7f7f7'} : {backgroundColor:'#ffffff'}} className='features-container'>
        {isChat &&
        <>
            <div>
            <h2 className="section-title feature-title">
                Join Our <b className="purple">Chat room</b>
            </h2>
            <ul className="feature--list signalsChat--list">
                <li className="feature--list__item">
                    <p><b className="purple">Free</b> trading education</p>
                </li>
                <li className="feature--list__item">
                    <p>Learn from <b className='purple'>pro traders</b></p>
                </li>
                <li className="feature--list__item">
                    <p>Interact with the <b className="purple">community</b></p>
                </li>
                <li className="feature--list__item">
                    <p><b className="purple">experience</b> rhycon</p>
                </li>
            </ul>
            <Link to='/signin'>
                <button className='features__btn'>Sign Up</button>
            </Link>
            </div>
            <figure className='feature--img chatsignals--img' style={{maxWidth:"450px"}}>
                <img src="https://media.discordapp.net/attachments/1116431288132444160/1118625771175563334/IMG_1988.png?width=728&height=409" alt="" />
            </figure>
        </>}
    </main>
  )
}

export default ChatSignals