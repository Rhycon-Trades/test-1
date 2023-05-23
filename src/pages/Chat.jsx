import React, { useState } from 'react'
import Sidebar from '../compnents/Sidebar'
import Channels from '../compnents/Channels'
import { useParams } from 'react-router-dom'

function Chat({ user }) {
  const {channel} = useParams()
  const [display , setDisplay] = useState(true)
  
  return (
    <div className="chat">
        {display && <Sidebar setDisplay={setDisplay} user={user} channel={channel} />}
        <Channels user={user} channel={channel} />
    </div>
  )
}

export default Chat