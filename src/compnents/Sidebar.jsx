import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className="sidebar">
        <figure className="sidebar--logo">
            <img src="https://cdn.discordapp.com/attachments/1088531111942037534/1091012283309760552/logo.png" />
        </figure>
        <div className='sidebar--content'>
        <ul className="sidebar--channels">
            <li className="sidebar--channels__items">
                <h6 className="channels__header">Main Menu</h6>
                <button className='channels__btn'><Link to='/app'>Introduction</Link></button>
                <button className='channels__btn'><Link to='/app'>faq</Link></button>
                <button className='channels__btn'><Link to='/app'>announcments</Link></button>
                <button className='channels__btn'><Link to='/app'>results</Link></button>
            </li>
            <li className="sidebar--channels__items">
                <h6 className="channels__header">Text channels</h6>
                <button className='channels__btn'><Link to='/app'>General chat</Link></button>
                <button className='channels__btn'><Link to='/app'>begginer 's chat</Link></button>
                <button className='channels__btn'><Link to='/app'>ask a mentor</Link></button>
            </li>
            <li className="sidebar--channels__items">
                <h6 className="channels__header">interactive</h6>
                <button className='channels__btn'><Link to='/app'>claim roles</Link></button>
                <button className='channels__btn'><Link to='/app'>polls</Link></button>
                <button className='channels__btn'><Link to='/app'>check invites</Link></button>
            </li>
        </ul>
        <div className="sidebar--user">
            <div className='sidebar--user__content'>
            <figure className="user--logo">
                <img src="https://www.w3schools.com/howto/img_avatar.png" />
            </figure>
                <p className='user--name'>User 's name</p>
            </div>
                <button className="user--settings"><FontAwesomeIcon icon='fa fa-gear' /></button>
        </div>
    </div>
        </div>
  )
}

export default Sidebar