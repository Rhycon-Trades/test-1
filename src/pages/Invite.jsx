import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/init";

function Invite({ user, usersList }) {
  const { inviteId } = useParams();
  const [inviterName, setInviterName] = useState("");
  const [executed , setExecuted] = useState(false)

  useEffect(() => {
    if (user === null && window.localStorage.invited === undefined) {
      if (Object.keys(usersList).length > 0) {
            const inviter = usersList.find((item) => item.uid === inviteId);
            if(inviter.marketing){
              setInviterName(inviter.displayName);
          if(!executed){
            setExecuted(true)
            rewardInviter(inviter)
          }
        }
    }
}else{
    if(user !== false){
    window.location.href = "/";
    }
}
  },[usersList]);

  async function rewardInviter(inviter) {

    const post ={
        visits: inviter.visits + 1
    }
        await updateDoc(doc(db , 'users' , inviter.docId), post)
        window.localStorage.invited = inviteId;
        window.location.href = '/'
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <p style={{ margin: "10px 0" }}>You have been invited by {inviterName}</p>
      <p>redirecting...</p>
    </div>
  );
}

export default Invite;
