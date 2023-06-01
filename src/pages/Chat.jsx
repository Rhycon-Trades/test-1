import React, { useEffect, useState } from "react";
import Sidebar from "../compnents/Sidebar";
import Channels from "../compnents/Channels";
import { useParams } from "react-router-dom";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/init";
import UsersList from "../ui/UsersList";

function Chat({ user }) {
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);
  const [p3, setP3] = useState(0);
  const [p4, setP4] = useState(0);
  const [p5, setP5] = useState(0);
  const [p6, setP6] = useState(0);
  const [p7, setP7] = useState(0);
  const { channel } = useParams();
  const [displaySideBar, setDisplaySideBar] = useState(false);
  const [displayUsersList, setDisplayUsersList] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const vw = window.innerWidth;

  useEffect(() => {
    if (vw > 768) {
      setDisplaySideBar(true);
    }
    getUsers()
  }, []);

  useEffect(() => {
    if (displaySideBar && vw < 900) {
      setDisplayUsersList(false);
    }
  }, [displaySideBar]);

  useEffect(() => {
    if (displayUsersList && vw < 900) {
      setDisplaySideBar(false);
    }
  }, [displayUsersList]);

  async function getUsers() {
    const data = await getDocs(collection(db, "users"));
    const users = data.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
    
      const newUsers = [];
      let role1 = 0;
      let role2 = 0;
      let role3 = 0;
      let role4 = 0;
      let role5 = 0;
      let role6 = 0;
      let role7 = 0;

      users.map((user) => {
        let priority;

        if (user.founder) {
          priority = 1;
          role1++;
        } else if (user.admin) {
          priority = 2;
          role2++;
        } else if (user.analyst) {
          priority = 3;
          role3++;
        } else if (user.support) {
          priority = 4;
          role4++;
        } else if (user.booster) {
          priority = 5;
          role5++;
        } else if (
          user.blue_badge_trader ||
          user.premium_trader ||
          user.premium_signals
        ) {
          priority = 6;
          role6++;
        } else if (user.free_member) {
          priority = 7;
          role7++;
        }

        newUsers.push({ ...user, userPriority: priority });
      });

      usersList !== newUsers && setUsersList(newUsers);
      setP1(role1);
      setP2(role2);
      setP3(role3);
      setP4(role4);
      setP5(role5);
      setP6(role6);
      setP7(role7);
  }

  return (
    <>
      {user && (
        <main className="chat">
          <Sidebar
            user={user}
            channel={channel}
            displaySideBar={displaySideBar}
          />
          <Channels
            user={user}
            channel={channel}
            displayUsersList={displayUsersList}
            setDisplayUsersList={setDisplayUsersList}
            setDisplaySideBar={setDisplaySideBar}
            displaySideBar={displaySideBar}
            usersList={usersList}
          />
          <UsersList
            displayUsersList={displayUsersList}
            users={usersList}
            setUsers={setUsersList}
            p1={p1}
            p2={p2}
            p3={p3}
            p4={p4}
            p5={p5}
            p6={p6}
            p7={p7}
          />
        </main>
      )}
    </>
  );
}

export default Chat;
