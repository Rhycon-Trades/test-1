import React, { useEffect, useState } from "react";
import Loading from "../ui/Loading";
import AppNav from "../compnents/AppNav";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/init";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Learn({ user }) {
    const [meetings , setMeetings] = useState([])
    const [displayMeetingCreator , setDisplayMeetingCreator] = useState(false)
    const [isExeclusive , setIsExeclusive] = useState(true)
    useEffect(() => {
        getMeetings()
    },[])

    async function getMeetings(){
      onSnapshot(collection(db,'meetings') , data => {
        setMeetings(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
    }

    async function sendMeeting(event){
      event.preventDefault()
      const title = event.target[0].value
      const provider = event.target[1].value
      const link = event.target[2].value

      const meeting = {
        title:title,
        link:link,
        provider:provider,
        execlusive:isExeclusive,
      }

      await addDoc(collection(db , 'meetings'),meeting)
      setDisplayMeetingCreator(false)
    }

    async function endMeeting(meeting){
      deleteDoc(doc(db , 'meetings' , meeting))
    }

  return (
    <main className="room">
      {user ? (
        <>
        <AppNav/>
        <div className="marketing--application-wrapper">
        <h5>Meetings</h5>
        <div style={{width:"100%", display:'flex',flexDirection:'column',alignItems:'center'}} className="mettings-wrapper">
            {
                Object.keys(meetings).length > 0 ? (meetings.map((meeting,_) => {
                  return <div key={_} className="meeting">
                    <div style={{display:'flex'}}>
                    <figure className="meeting--img">
                      <img src="https://is3-ssl.mzstatic.com/image/thumb/Purple112/v4/1d/4c/15/1d4c15e5-ca10-b5e9-7fef-0fed5f76eca6/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg" alt="" />
                    </figure>
                    <div className="meeting--info">
                      <p className="meeting--info__title">{meeting.title}</p>
                      <div className="meeting--info__specs">
                        <div className="info--spec">{meeting.provider}</div>
                        <div className="info--spec">{meeting.execlusive ? "Execlusive" : "Free"}</div>
                      </div>
                    </div>
                    </div>
                    <div className="meeting--btns">
                      {!meeting.execlusive ||user.blue_badge_trader || user.admin || user.founder ? <a target="_blank" href={meeting.link}>
                        <button className="meeting__btn">Join</button>
                      </a> : <button className="creator__type--btn-selected" style={{cursor:'not-allowed'}}>Join</button>}
                      {(user.founder || user.admin) && <button onClick={() => endMeeting(meeting.id)} className="meeting__btn meeting__btn-end">end</button>}
                    </div>
                  </div>
                })) : <div style={{ justifyContent:'center'}} className="marketing--application-wrapper">
                <p style={{color:'#ffffff' , display:'flex' , flexDirection:'column' , alignItems:'center' , justifyContent:'center'}}>No meetings are available</p>
                <br/>

            </div>
            }
                            {!displayMeetingCreator && (user.founder || user.admin) && <button onClick={() => setDisplayMeetingCreator(true)}>
                    Start a meeting
                    </button>}
            {
                displayMeetingCreator && <form onSubmit={(event) => sendMeeting(event)} className="meeting--creator">
                    <p className="meeting--creator__para">Title</p>
                    <input required className="meeting--creator__input" type="text" placeholder="Enter Title" />
                    <p className="meeting--creator__para">Meeting Provider</p>
                    <input required className="meeting--creator__input" type="text" placeholder="Enter provider name" />
                    <p className="meeting--creator__para">Meeting Link</p>
                    <input required className="meeting--creator__input" type="text" placeholder="Enter link" />
                <div className="meeting--creator__type"><button type="button" onClick={() => setIsExeclusive(true)} className={`creator__type--btn ${!isExeclusive && 'creator__type--btn-select'}`}>Execlusive</button> <button type="button" onClick={() => setIsExeclusive(false)} className={`creator__type--btn ${isExeclusive && 'creator__type--btn-select'}`}>Free</button></div>
                <input type="submit" value="Submit" />
                <button onClick={() => setDisplayMeetingCreator(false)} className='operation-close' style={{color:"#ffffff",fontSize:'18px'}}><FontAwesomeIcon icon='fa fa-xmark' /></button>
                </form>
            }
        </div>
        </div>
        </>
      ) : user === null ? (
        (window.location.href = "/signin")
      ) : (
        <Loading />
      )}
    </main>
  );
}

export default Learn;
