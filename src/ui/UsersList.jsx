import UserInfo from './UserInfo'

function UsersList({ displayUsersList , users , p1 , p2 , p3 , p4 , p5 , p6 , p7 }) {


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