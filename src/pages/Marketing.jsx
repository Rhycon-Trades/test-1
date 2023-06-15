import React from "react";
import Loading from "../ui/Loading";
import AppNav from "../compnents/AppNav";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase/init";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Marketing({ user }) {

    const rhyconBot = {
        displayName: "rhycon bot",
        uid: "rhycon-bot",
        photoUrl:
          "https://cdn.discordapp.com/attachments/1088531111942037534/1114933133566034032/IMG_1245.jpg",
      };

    function joinTeam(event){
        event.preventDefault()
        const text = event.target[0].value
        const post = {
            marketingCv:text,
            marketing:true,
            visits:0,
            signups:0,
            sales:0,
            credits:0,
        }

        updateDoc(doc(db , 'users' , user.docId),post)
        addDoc(collection(db , 'messages'), {
                text: `@${user.displayName} have joined the marketing team , cv: ${text}`,
                userName: rhyconBot.displayName,
                userId: rhyconBot.uid,
                photoUrl: rhyconBot.photoUrl,
                createdAt: serverTimestamp(),
                channel: 'marketing_chat',
                replyTo: null,
                img: false,
        })
    }

    function copyText(){
        const link = window.location.origin.toString() + '/invite/' + user.uid
        navigator.clipboard.writeText(link)
    }

  return (
    <>
      {user ? (
        <main className="room">
            <AppNav />
            {
                user.marketing ? (
                    <div className="marketing--application-wrapper">
                        <h5>Marketing Stats</h5>
                        <ul className="marketing--table">
                            <li className="marketing--table__item" title="number of people whom visited the website using your link">
                                Visits: {user.visits}
                                <span className="i">i</span>
                            </li>
                            <li className="marketing--table__item" title="number of people whom signed up using your link">
                                Invites: {user.signups}
                                <span className="i">i</span>
                            </li>
                            <li className="marketing--table__item" title="number of people whom baught a product using your link">
                                sales: {user.sales}
                                <span className="i">i</span>
                            </li>
                            <li className="marketing--table__item" title="1 invite = 0.1c & 1 sale = 40% of the price in credits">
                                credits: {user && user.credits.toFixed(2)}
                                <span className="i">i</span>
                            </li>
                        </ul>
                        <ul className="marketing--table">
                               <p style={{color:'#ffffff',}}> invitaion link:<br/><br/> <span style={{wordBreak:'break-word'}}>{window.location.origin.toString() + '/invite/' + user.uid} </span> <button className="message--bar__btn marketing--copy" onClick={copyText}><FontAwesomeIcon icon='fa fa-copy' /></button> </p>
                        </ul>
                        <div style={{width:"100%", maxWidth:'800px',display:'flex',justifyContent:'flex-end'}}>
                            <Link to='/marketing/redeem'>
                                <button>Redeem Credits</button>
                            </Link>
                        </div>
                        <Link to='/app/marketing_chat'>
                        <button className="marketing--redirect">
                            <FontAwesomeIcon icon='fa fa-message' />
                        </button>
                        </Link>
                    </div>
                ) : (
                    <div className="marketing--application-wrapper">
                        <h5>Marketing Team Application</h5>
                    <form onSubmit={(event) => joinTeam(event)} className="marketing--application">
                        <textarea required placeholder="cv" type="text" name="" id="" className="marketing--application__input" />
                        <button>Send</button>
                    </form>
                    </div>
                )
            }
        </main>
      ) : user !== null ? (
        <Loading />
      ) : (
        (window.location.href = "/signin")
      )}
    </>
  );
}

export default Marketing;
