import React from 'react'
import Sidebar from '../compnents/Sidebar'
import Channels from '../compnents/Channels'
import { useParams } from 'react-router-dom'

function Chat({ user }) {
  const {channel} = useParams()
  
  return (
    <div className="chat">
        <Sidebar user={user} channel={channel} />
        <Channels user={user} channel={channel} />
    </div>
  )
}

export default Chat