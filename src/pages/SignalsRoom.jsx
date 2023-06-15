import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/init";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SignalsRoom({ user }) {
  const [signals, setSignals] = useState(false);
  const [signalsHistory, setSignalsHistory] = useState(false);
  const [displayCreator, setDisplayCreator] = useState(false);
  const [displayHistoryMover, setDisplayHistoryMover] = useState(false);
  const [historizeId, setHistorizeId] = useState("");

  useEffect(() => {
    getSignals();
  }, []);

  async function getSignals() {
    const data = await getDocs(collection(db, "signals"));
    const rawSignals = [];
    const rawSignalsHistory = [];
    data.docs.map((doc) => {
      if (doc.data().active) {
        rawSignals.push({ ...doc.data(), id: doc.id });
      } else {
        rawSignalsHistory.push({ ...doc.data(), id: doc.id });
      }
    });
    setSignals(rawSignals);
    setSignalsHistory(rawSignalsHistory);
  }

  function moveMark(id) {
    setDisplayHistoryMover(true);
    setHistorizeId(id);
  }

  async function createSignal(event) {
    event.preventDefault();
    const data = event.target;
    const today = new Date();
    const signal = {
      name: data[0].value,
      entery: data[1].value,
      exit: data[2].value,
      profit: data[3].value,
      data: today,
      analyst: user.displayName,
      active: true,
    };
    setDisplayCreator(false);
    await addDoc(collection(db, "signals"), signal);
    window.location.reload();
  }

  function moveToHistory(event) {
    event.preventDefault();
    const data = event.target;
    const signalUpdate = {
      active: false,
      position: data[0].value,
      pl: data[1].value,
    };
    updateDoc(doc(db, "signals", historizeId), signalUpdate);
    setDisplayHistoryMover(false);
    setHistorizeId("");
  }

  return (
    <main style={{ backgroundColor: "#ffffff" }} className="signals-room">
      <div className="signals--cards">
        {signals === false ? (
          <>
            <div className="signals--cards__item skeleton-card"></div>
            <div className="signals--cards__item skeleton-card"></div>
          </>
        ) : Object.keys(signals).length > 0 ? (
          signals.map((signal) => (
            <div className="signals--cards__item">
              <figure className="card__item--bgimg">
                <img
                  src="https://cdn.discordapp.com/attachments/1088531111942037534/1105214825249919107/unnamed_2-removebg-preview.png"
                  alt=""
                />
              </figure>
              <div className="signals--card__block">
                <h5>{signal.name}</h5>
                <p>entery: {signal.entery}$</p>
                <p>exit: {signal.exit}$</p>
                <p className="low">analyst name</p>
                <p>{signal.analyst}</p>
              </div>
              <div className="signals--card__block">
                <p>Total Profit</p>
                <p>{signal.profit}%</p>
              </div>
              {(user.founder || user.analyst) && (
                <button
                  onClick={() => moveMark(signal.id)}
                  className="signals--card__block-finish"
                >
                  <FontAwesomeIcon icon="fa fa-xmark" />
                </button>
              )}
            </div>
          ))
        ) : (
          <p>no data was found</p>
        )}

        {(user.founder || user.analyst) && (
          <div className="signals--cards__item">
            <button
              onClick={() => setDisplayCreator(true)}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span className="add--icon">
                <FontAwesomeIcon icon="fa fa-plus" />
              </span>
              add a signal
            </button>
          </div>
        )}
      </div>
      <div className="signals--history">
        <div className="signals__nav">
          <button className="signals__nav--btn nav--btn-selected">
            Trade History
          </button>
          <Link to="/app/free_signals_channel">
            <button className="signals__nav--btn">Chat Room</button>
          </Link>
        </div>
        <div className="signals--history__wrapper">
          {signalsHistory === false ? (
            <>
            <div className="signal-history" style={{height:'75px'}}></div>
            <div className="signal-history" style={{height:'75px'}}></div>
            </>
          ) : Object.keys(signalsHistory).length > 0 ? (
            signalsHistory.map((signal) => {
              const date = new Date(signal.data.seconds * 1000).toUTCString();
              return (
                <div className="signal-history">
                  <div className="signal-history--block" style={{maxWidth:'20%'}}><h5 className="history--block__header">Time</h5><p>{date.toString()}</p></div>
                  <div className="signal-history--block"><h5 className="history--block__header">Symbol</h5><p>{signal.name}</p></div>
                  <div className="signal-history--block"><h5 className="history--block__header">position</h5><p>{signal.position}</p></div>
                  <div className="signal-history--block"><h5 className="history--block__header">P&L</h5><p>{signal.pl}%</p></div>
                </div>
              );
            })
          ) : (
            <p>no data was found</p>
          )}
        </div>
      </div>
      {displayCreator && (
        <div className="review--write">
          <button
            onClick={() => setDisplayCreator(false)}
            className="popup--mark"
          >
            <FontAwesomeIcon icon="fa fa-xmark" />
          </button>
          <div className="review__user">
            <profile className="review__user--profile-img">
              <img src={user.photoUrl} alt="" />
            </profile>
            <h5 className="review__user--profile">{user.displayName}</h5>
            <p className="review__user--note">
              you are loged in with this account
            </p>
          </div>
          <form onSubmit={(event) => createSignal(event)}>
            <p className="review__form--title">Name</p>
            <input
              required
              className="review__form--input"
              type="text"
              placeholder="5"
            />
            <p className="review__form--title">Entery</p>
            <input required className="review__form--input" type="number" />
            <p className="review__form--title">Exit</p>
            <input required className="review__form--input" type="number" />
            <p className="review__form--title">Profit</p>
            <input required className="review__form--input" type="text" />
            <input
              type="submit"
              value="Submit"
              style={{
                borderRadius: "10px",
                resize: "none",
                height: "40px",
                padding: "8px 0",
              }}
            />
          </form>
          <p className="review__user--note">
            *refresh the page to applay changes
          </p>
        </div>
      )}
      {displayHistoryMover && (
        <div className="review--write">
          <button
            onClick={() => setDisplayHistoryMover(false)}
            className="popup--mark"
          >
            <FontAwesomeIcon icon="fa fa-xmark" />
          </button>
          <div className="review__user">
            <profile className="review__user--profile-img">
              <img src={user.photoUrl} alt="" />
            </profile>
            <h5 className="review__user--profile">{user.displayName}</h5>
            <p className="review__user--note">
              you are loged in with this account
            </p>
          </div>
          <form onSubmit={(event) => moveToHistory(event)}>
            <p className="review__form--title">Position</p>
            <input
              required
              className="review__form--input"
              type="text"
              placeholder="5"
            />
            <p className="review__form--title">P&L</p>
            <input required className="review__form--input" type="text" />
            <input
              type="submit"
              value="Submit"
              style={{
                borderRadius: "10px",
                resize: "none",
                height: "40px",
                padding: "8px 0",
              }}
            />
          </form>
          <p className="review__user--note">
            *refresh the page to applay changes
          </p>
        </div>
      )}
    </main>
  );
}

export default SignalsRoom;
