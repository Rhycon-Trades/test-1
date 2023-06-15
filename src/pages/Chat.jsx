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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppNav from "../compnents/AppNav";
import Loading from "../ui/Loading";

function Chat({ user , usersList , p1 , p2 , p3 ,p4 ,p5 ,p6 ,p7 ,setUsersList }) {
  const [displayClaim, setDisplayClaim] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);
  const { channel } = useParams();
  const [displaySideBar, setDisplaySideBar] = useState(false);
  const [displayUsersList, setDisplayUsersList] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [isDark , setIsDark] = useState()
  const [doesExist, setDoesExist] = useState(false)
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
    "ban",
    "warn",
    "kick",
    "mute",
    "clear",
    "close",
    "give",
    "remove",
    "poll",
    'delete-poll',
    "send",
    'marketing-cv',
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
  const channels = [
    "intro",
    "faq",
    "annoucements",
    "results",
    "general",
    "begginer",
    "crypto_channel",
    "premium",
    "forex_channel",
    "stocks_channel",
    "free_signals_channel",
    "marketing_chat",
    "ask",
    "claim",
    "polls",
    "staff",
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

    if (!localStorage.firstChatVisit) {
      setDisplayClaim(true);
      localStorage.firstChatVisit = 1;
    }

    getTickets();

    const theme = localStorage.isDark
      
    if(theme !== undefined){
      setIsDark(theme)
    }else{
      localStorage.isDark = true
      setIsDark(true)
    }
  }, []);
  
  useEffect(() => {
    if(!channel.includes('ticket')){
    channels.map((item) => {
      item === channel && setDoesExist(true)
    })
  }else{
    tickets && tickets.forEach((ticket) => {
      ticket.name === channel && setDoesExist(true)
    })
  }
  }, [tickets] [channel])
  
  useEffect(() => {
    localStorage.isDark = isDark
  }, [isDark])

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
      if(channel === 'crypto_channel' || channel === 'stocks_channel' || channel === 'forex' || channel === 'free_signals_channel' || channel === 'premium' || channel === 'staff'){
      if(channel === 'crypto_channel' && (user.crypto || user.admin || user.founder)){setIsAllowed(true)}
      if(channel === 'stocks_channel' && (user.stocks || user.admin || user.founder)){setIsAllowed(true)}
      if(channel === 'forex_channel' && (user.forex || user.admin || user.founder)){setIsAllowed(true)}
      if(channel === 'free_signals_channel' && (user.free_signals || user.admin || user.founder)){setIsAllowed(true)}
      if(channel === 'premium' && (user.premium_signals || user.premium_trader || user.blue_badge_trader || user.admin || user.founder)){setIsAllowed(true)}
      if(channel === 'staff' && (user.crypto || user.admin || user.founder)){setIsAllowed(true)}
    }else{
      setIsAllowed(true)
    }
    
    } else {
      if (user && tickets.length > 0) {
        const target = tickets.find((ticket) => ticket.name === channel);
        if (target.uid1 === user.uid && target.display) {
          setIsAllowed(true);
        }
      }
    }
  }, [user]);

  useEffect(() => {
    if(!doesExist || !isAllowed){
      setDisplaySideBar(false)
    }
  }, [] , [doesExist] , [isAllowed])

  const [banDuration , setBanDuration] = useState(false)
  const [muteDuration , setMuteDuration] = useState(false)

  useEffect(() => {
    if(user){
      const rawMute = new Date(user.muteDuration.seconds * 1000).toString()
      const rawBan = new Date(user.banDuration.seconds * 1000).toString()
      setBanDuration(rawBan);
      setMuteDuration(rawMute);
    }
  },[user])

  return (
    <>
      {user ? (
        <main className={`chat ${!isDark && 'light-theme'}`}>
          <Sidebar
            user={user}
            channel={channel}
            displaySideBar={displaySideBar}
            tickets={tickets}
            isDark={isDark}
            setIsDark={setIsDark}
          />
          {isAllowed && doesExist ? (
            (new Date(banDuration) > new Date() || new Date(muteDuration) > new Date()) ? 
            (     <div style={{backgroundColor:'#000000',margin:'0px', padding:'100px' ,borderRadius:'0',width:"100%",display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}} className="message--content">
            <h5> You don't have access</h5>
            <p style={{ margin: "14px 0" , textAlign:'center' }}>
              {" "}
              you have benn {new Date(banDuration) > new Date() ? 'banned' : "muted"} till {new Date(banDuration) > new Date() ? banDuration : muteDuration} for violating our community guidelines <br/> <br/> if you think this is done by mistake contact us at *gmail*
            </p>
          </div>)
            :
            <Channels
              user={user}
              isDark={isDark}
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
              channels={channels}
            />
          ) : (
            <div style={{backgroundColor:'#000000',margin:'0px',borderRadius:'0',width:"100%",display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}} className="message--content">
            <h5> {!doesExist ? "Channel Not Found" : "You don't have access"}</h5>
            <p style={{ margin: "14px 0" , textAlign:'center'}}>
              {" "}
              {!doesExist ? "this channel have been removed or doesn't exist" : " you dont have the permission to read or write in this channel"}
            </p>
          </div>
          )}
          <UsersList
            displayUsersList={displayUsersList}
            users={usersList}
            currentUser={user}
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
      ) : user !== null ? (
        <Loading />
      ) : (
        window.location.pathname = '/signin'
      )}
    </>
  );
}

export default Chat;
