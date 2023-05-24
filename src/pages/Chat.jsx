import React, { useEffect, useState } from 'react'
import Sidebar from '../compnents/Sidebar'
import Channels from '../compnents/Channels'
import { useParams } from 'react-router-dom'

function Chat({ user }) {
  const {channel} = useParams()
  const [displaySideBar , setDisplaySideBar] = useState(true)
  const vw = window.innerWidth

  useEffect(() =>{
    if(vw <= 768){
      setDisplaySideBar(false)
    }
  },[])
  
  return (
    <div className="chat">
        <Sidebar user={user} channel={channel} displaySideBar={displaySideBar} />
        <Channels user={user} channel={channel} setDisplaySideBar={setDisplaySideBar} displaySideBar={displaySideBar} />

    </div>
  )
}

export default Chat