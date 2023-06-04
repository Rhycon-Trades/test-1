import React, { useEffect, useState } from "react";
import Profile from "./Profile";

function UserInfo({ user, color , displayUsersList }) {
  const [displayUser, setDisplayUser] = useState(false);

  useEffect(() => {
    if(!displayUsersList){
        setDisplayUser(false)
    }
  },[displayUsersList])

  return (
    <>
    <li className="user-info">
      <div onClick={() => setDisplayUser(!displayUser)} className="user-info--content">
        <figure className="user-info--img">
          <img src={user.photoUrl} alt="" />
        </figure>
        <p style={{ color: color }} className="user-info--name">
          {user.displayName}
        </p>
      </div>
    </li>
      {displayUser && <Profile className={'user-info--profile'} user={user} />}
    </>
  );
}

export default UserInfo;
