import React, { useEffect, useState } from "react";
import Sidebar from "../compnents/Sidebar";
import Channels from "../compnents/Channels";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
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
  const [displayClaim, setDisplayClaim] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);
  const { channel } = useParams();
  const [displaySideBar, setDisplaySideBar] = useState(false);
  const [displayUsersList, setDisplayUsersList] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [tickets, setTickets] = useState([]);
  const badWords = [
    "cum",
    "fuck",
    "shit",
    "piss",
    "ass",
    "dick",
    "cock",
    "bitch",
    "pussy",
    "bastard",
    "damn",
    "bugger",
    "tit",
    "boob",
    "masterbat",
  ];
  const commands = [
    "warn",
    "ban",
    "kick",
    "mute",
    "give",
    "remove",
    "send",
    "close",
    "announce",
    "remove-announcement",
    "status",
  ];
  const roles = [
    "everyone",
    "admin",
    "analyst",
    "blue_badge_trader",
    "booster",
    "crypto",
    "forex",
    "founder",
    "free_member",
    "free_signals",
    "marketing",
    "premium_signals",
    "premium_trader",
    "stocks",
    "support",
  ];
  const rhyconBot = {
    displayName: "rhycon bot",
    uid: "rhycon-bot",
    photoUrl:
      "https://cdn.discordapp.com/attachments/1088531111942037534/1114933133566034032/IMG_1245.jpg",
  };
  const vw = window.innerWidth;

  useEffect(() => {
    if (vw > 768) {
      setDisplaySideBar(true);
    }
    getUsers();

    if (!localStorage.firstChatVisit) {
      setDisplayClaim(true);
      localStorage.firstChatVisit = 1;
    }

    getTickets();
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

  function getTickets() {
    onSnapshot(collection(db, "tickets"), (snapshot) => {
      const rawTicket = [];
      snapshot.docs.forEach((el) => {
        rawTicket.push({ ...el.data(), docId: el.id });
      });
      setTickets(rawTicket);
    });
  }

  async function getUsers() {
    // const data = await getDocs(collection(db, "users"));
    // const users = data.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
    onSnapshot(collection(db , 'users'), (data) => {
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
    })
  }

  async function claimRole(role, claim) {
    const docRef = doc(db, "users", user.docId);
    let update;
    if (claim) {
      update = {
        [role]: true,
      };
    } else {
      update = {
        [role]: false,
      };
    }
    await updateDoc(docRef, update);
  }

  useEffect(() => {
    if (user.admin || user.founder) {
      setIsAllowed(true);
    }

    if (!channel.includes("ticket")) {
      if(channel === 'crypto_channel' && (user.crypto || user.admin || user.founder)){setIsAllowed(true)}
      if(channel === 'stocks_channel' && (user.stocks || user.admin || user.founder)){setIsAllowed(true)}
      if(channel === 'forex_channel' && (user.forex || user.admin || user.founder)){setIsAllowed(true)}
      if(channel === 'free_signals_channel' && (user.free_signals || user.admin || user.founder)){setIsAllowed(true)}
      if(channel === 'premium' && (user.premium_signals || user.premium_trader || user.blue_badge_trader || user.admin || user.founder)){setIsAllowed(true)}
      if(channel === 'staff' && ( user.admin || user.founder)){setIsAllowed(true)}
      
    } else {
      if (user && tickets.length > 0) {
        const target = tickets.find((ticket) => ticket.name === channel);
        if (target.uid1 === user.uid && target.display) {
          setIsAllowed(true);
        }
      }
    }
  }, [user]);

  return (
    <>
      {user && (
        <main className="chat">
          <Sidebar
            user={user}
            channel={channel}
            displaySideBar={displaySideBar}
            tickets={tickets}
          />
          {isAllowed ? (
            <Channels
              user={user}
              channel={channel}
              displayUsersList={displayUsersList}
              setDisplayUsersList={setDisplayUsersList}
              setDisplaySideBar={setDisplaySideBar}
              displaySideBar={displaySideBar}
              usersList={usersList}
              claimRole={claimRole}
              badWords={badWords}
              rhyconBot={rhyconBot}
              roles={roles}
              commands={commands}
              tickets={tickets}
            />
          ) : (
            <div style={{backgroundColor:'#000000',margin:'0px',borderRadius:'0',width:"100%",display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}} className="message--content">
            <h5> You don't have access</h5>
            <p style={{ margin: "14px 0" }}>
              {" "}
              you dont have the permission to read or write in this channel
            </p>
          </div>
          )}
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
          {displayClaim && (
            <div className="claim--popup-wrapper">
              <div className="message--content claim--popup">
                <h5>Choose your intrests:</h5>
                <ul className="claim-roles">
                  <li className="calim-roles--role">
                    <p>Crypto</p>{" "}
                    {!user.crypto ? (
                      <button
                        onClick={() => claimRole("crypto", true)}
                        className="claim-roles__btn claim-roles__btn--claim"
                      >
                        Select
                      </button>
                    ) : (
                      <button
                        onClick={() => claimRole("crypto", false)}
                        className="claim-roles__btn claim-roles__btn--remove"
                      >
                        remove
                      </button>
                    )}
                  </li>
                  <li className="calim-roles--role">
                    <p>Stocks</p>{" "}
                    {!user.stocks ? (
                      <button
                        onClick={() => claimRole("stocks", true)}
                        className="claim-roles__btn claim-roles__btn--claim"
                      >
                        Select
                      </button>
                    ) : (
                      <button
                        onClick={() => claimRole("stocks", false)}
                        className="claim-roles__btn claim-roles__btn--remove"
                      >
                        remove
                      </button>
                    )}
                  </li>
                  <li className="calim-roles--role">
                    <p>Forex</p>{" "}
                    {!user.forex ? (
                      <button
                        onClick={() => claimRole("forex", true)}
                        className="claim-roles__btn claim-roles__btn--claim"
                      >
                        Select
                      </button>
                    ) : (
                      <button
                        onClick={() => claimRole("forex", false)}
                        className="claim-roles__btn claim-roles__btn--remove"
                      >
                        remove
                      </button>
                    )}
                  </li>
                  <li className="calim-roles--role">
                    <p>Free Signals</p>{" "}
                    {!user.free_signals ? (
                      <button
                        onClick={() => claimRole("free_signals", true)}
                        className="claim-roles__btn claim-roles__btn--claim"
                      >
                        Select
                      </button>
                    ) : (
                      <button
                        onClick={() => claimRole("free_signals", false)}
                        className="claim-roles__btn claim-roles__btn--remove"
                      >
                        remove
                      </button>
                    )}
                  </li>
                </ul>
                <div className="claim--note">
                  <p className="claim--note__text">
                    Each role you claim will be added to your profile and you
                    may recive information regarding your intrests
                  </p>
                  <button
                    onClick={() => setDisplayClaim(false)}
                    className="claim--note__btn"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      )}
    </>
  );
}

export default Chat;
