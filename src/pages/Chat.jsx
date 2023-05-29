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
  const [rowUsersList , setRowUsersList] = useState([])
  const [usersList , setUsersList] = useState([])
  const vw = window.innerWidth

  useEffect(() =>{
    if(vw > 768){
      setDisplaySideBar(true)
    }

    getUsers()
  },[])

  useEffect(() => {
    if(displaySideBar && vw < 900){
      setDisplayUsersList(false)
    }
  },[displaySideBar])

  useEffect(() => {
    if(displayUsersList && vw < 900){
      setDisplaySideBar(false)
    }
  },[displayUsersList])

  async function getUsers(){
    const data = await getDocs(collection(db , 'users'))
    const users = data.docs.map((doc) => ({...doc.data() , docId: doc.id}))
    setRowUsersList(users)
  }
  
  return (
    <main className="chat">
        <Sidebar user={user} channel={channel} displaySideBar={displaySideBar} />
        <Channels user={user} channel={channel} displayUsersList={displayUsersList} setDisplayUsersList={setDisplayUsersList} setDisplaySideBar={setDisplaySideBar} displaySideBar={displaySideBar} usersList={usersList} />
        <UsersList displayUsersList={displayUsersList} rowUsers={rowUsersList} users={usersList} setUsers={setUsersList} />
    </main>
  )
}

export default Chat