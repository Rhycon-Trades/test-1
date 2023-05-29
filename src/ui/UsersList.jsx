import React, { useEffect, useState } from 'react'
import UserInfo from './UserInfo'

function UsersList({ displayUsersList , rowUsers , users , setUsers }) {
  const [p1 , setP1] = useState(0)
  const [p2 , setP2] = useState(0)
  const [p3 , setP3] = useState(0)
  const [p4 , setP4] = useState(0)
  const [p5 , setP5] = useState(0)
  const [p6 , setP6] = useState(0)
  const [p7 , setP7] = useState(0)


  useEffect(() => {
    if(Object.keys(rowUsers).length > 0){
      const newUsers = []
      let role1 = 0
      let role2 = 0
      let role3 = 0
      let role4 = 0
      let role5 = 0
      let role6 = 0
      let role7 = 0

      rowUsers.map((user) => {
        let priority
        if(user.free_member){
          priority = 7
          role7++
        }
        if(user.blue_badge_trader || user.premium_trader || user.premium_signals){
          priority = 6
          role6++
        }
        if(user.booster){
          priority = 5
          role5++
        }
        if(user.support){
          priority = 4
          role4++
        }
        if(user.analyst){
          priority = 3
          role3++
        }
        if(user.admin){
          priority = 2
          role2++
        }
        if(user.founder){
          priority = 1
          role1++
        }
        
        newUsers.push(({...user , userPriority:priority, }))
      })
      setUsers(newUsers)
      setP1(role1)
      setP2(role2)
      setP3(role3)
      setP4(role4)
      setP5(role5)
      setP6(role6)
      setP7(role7)

    }
  }, [rowUsers])

  return (
    <div className={`users-list ${!displayUsersList && 'sidebar-invisible'}`}>
    {Object.keys(users).length > 0 &&
    <div>
        {p1 > 0 && <div className="users-list--section">
        <h5 className="users-list__header">
          Founder - {p1}
        </h5>
        <ul className="users-list__list">
          {Object.keys(users).length > 0 && users.filter((user) => user.userPriority === 1).map((user , _) => <UserInfo displayUsersList={displayUsersList} key={_} user={user} color={'#ffffff'} />) }
        </ul>
      </div>}
      
      {p2 > 0 && <div className="users-list--section">
        <h5 className="users-list__header">
          Admin - {p2}
        </h5>
        <ul className="users-list__list">
          {Object.keys(users).length > 0 && users.filter((user) => user.userPriority === 2).map((user , _) => <UserInfo displayUsersList={displayUsersList} key={_} user={user} color={'rgb(194, 124, 14)'} />) }
        </ul>
      </div>}

      {p3 > 0 && <div className="users-list--section">
        <h5 className="users-list__header">
          Analyst - {p3}
        </h5>
        <ul className="users-list__list">
          {Object.keys(users).length > 0 && users.filter((user) => user.userPriority === 3).map((user , _) => <UserInfo displayUsersList={displayUsersList} key={_} user={user} color={'rgb(0, 122, 255)'} />) }
        </ul>
      </div>}

      {p4 > 0 && <div className="users-list--section">
        <h5 className="users-list__header">
          Staff - {p4}
        </h5>
        <ul className="users-list__list">
          {Object.keys(users).length > 0 && users.filter((user) => user.userPriority === 4).map((user , _) => <UserInfo displayUsersList={displayUsersList} key={_} user={user} color={'rgb(255, 0, 0)'} />) }
        </ul>
      </div>}

      {p5 > 0 && <div className="users-list--section">
        <h5 className="users-list__header">
          Boosters - {p5}
        </h5>
        <ul className="users-list__list">
          {Object.keys(users).length > 0 && users.filter((user) => user.userPriority === 5).map((user , _) => <UserInfo displayUsersList={displayUsersList} key={_} user={user} color={'rgb(244, 127, 255)'} />) }
        </ul>
      </div>}

      {p6 > 0 && <div className="users-list--section">
        <h5 className="users-list__header">
          Premium Member - {p6}
        </h5>
        <ul className="users-list__list">
          {Object.keys(users).length > 0 && users.filter((user) => user.userPriority === 6).map((user , _) => <UserInfo displayUsersList={displayUsersList} key={_} user={user} color={'rgb(8, 188, 231)'} />) }
        </ul>
      </div>}

      {p7 > 0 && <div className="users-list--section">
        <h5 className="users-list__header">
          Free Members - {p7}
        </h5>
        <ul className="users-list__list">
          {Object.keys(users).length > 0 && users.filter((user) => user.userPriority === 7).map((user , _) => <UserInfo displayUsersList={displayUsersList} key={_} user={user} color={'rgb(26, 227, 29)'} />) }
        </ul>
      </div>}
      </div>
    }
    </div>
  )
}

export default UsersList