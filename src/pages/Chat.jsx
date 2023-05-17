import React from 'react'
import Sidebar from '../compnents/Sidebar'
import Channels from '../compnents/Channels'

function Chat({ user }) {
  return (
    <div className="chat">
        <Sidebar user={user} />
        <Channels user={user} />
    </div>
  )
}

export default Chat