import React, { useEffect, useState } from 'react'
import Sidebar from '../compnents/Sidebar'
import Channels from '../compnents/Channels'
import { useParams } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/init'
import UsersList from '../ui/UsersList'

function Chat({ user }) {
  const {channel} = useParams()
  const [displaySideBar , setDisplaySideBar] = useState(false)
  const [displayUsersList , setDisplayUsersList] = useState(false)
  const [usersList , setUsersList] = useState(null)
  const vw = window.innerWidth

  useEffect(() =>{
    if(vw > 768){
      setDisplaySideBar(true)
    }

    getUsers()
  },[])

  async function getUsers(){
    const data = await getDocs(collection(db , 'users'))
    const users = data.docs.map((doc) => ({...doc.data() , docId: doc.id}))
    setUsersList(users)
  }

  console.log(usersList)
  
  return (
    <main className="chat">
        <Sidebar user={user} channel={channel} displaySideBar={displaySideBar} />
        <Channels user={user} channel={channel} displayUsersList={displayUsersList} setDisplayUsersList={setDisplayUsersList} setDisplaySideBar={setDisplaySideBar} displaySideBar={displaySideBar} />
        <UsersList displayUsersList={displayUsersList} usersList={usersList} />
    </main>
  )
}

export default Chat