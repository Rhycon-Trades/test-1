import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Footer from "./compnents/Footer";
import Nav from "./compnents/Nav";
import Home from "./pages/Home";
import Products from "./pages/Prodcuts";
import { auth, db } from "./firebase/init";
import {
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import AboutProduct from "./pages/AboutProduct";
import Cart from "./pages/Cart";
import Terms from "./pages/Terms";
import PopUp from "./ui/PopUp";
import Signin from "./compnents/Auth/SignIn";
import { onAuthStateChanged } from "firebase/auth";
import Chat from "./pages/Chat";
import Marketing from "./pages/Marketing";
import Invite from "./pages/Invite";
import MarketingRedeem from "./pages/MarketingRedeem";
import Learn from "./pages/Learn";
import PageNotFound from "./pages/pageNotFound";
import SignalsRoom from "./pages/SignalsRoom";

function App() {
  const [testimonials, setTestimonials] = useState(null);
  const [faq, setFaq] = useState(null);
  const [products, setProducts] = useState(null);
  const [cart, setCart] = useState([]);
  const [popup, setPopup] = useState(false);
  const [user, setUser] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);
  const [p3, setP3] = useState(0);
  const [p4, setP4] = useState(0);
  const [p5, setP5] = useState(0);
  const [p6, setP6] = useState(0);
  const [p7, setP7] = useState(0);

  useEffect(() => {
    const getTestimonials = async () => {
      const data = await getDocs(collection(db, "testimonials"));
      setTestimonials(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getFaq = async () => {
      const data = await getDocs(collection(db, "faq"));
      setFaq(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getProducts = async () => {
      const data = await getDocs(collection(db, "products"));
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getTestimonials();
    getFaq();
    getProducts();
  }, []);

  useEffect(() => {
    autoSignIn();
    getUsers();
  }, []);

  useEffect(() => {
    if (user) {
      let update = null;
      let today = new Date();
      if (user.warn === 3) {
        const timeFrame = user.banDuration.seconds * 1000;
        const duration = new Date(timeFrame);
        if (duration < new Date()) {
          today.setDate(today.getDate() + 1);
          update = {
            ...update,
            ban: user.ban + 1,
            banDuration: today,
            warn: 0,
          };
        }
      }
      if (user.kick === 3) {
        const timeFrame = user.banDuration.seconds * 1000;
        const duration = new Date(timeFrame);
        if (duration < new Date()) {
          today.setDate(today.getDate() + 3);
          update = {
            ...update,
            ban: user.ban + 1,
            banDuration: today,
            kick: 0,
          };
        }
      }
      if (user.mute === 3) {
        // today.setDate(today.getDate() + 3)
        update = { ...update, warn: user.warn + 1, mute: 0 };
      }
      if (user.ban === 3) {
        today.setDate(today.getDate() + 999999999999999);
        const timeFrame = user.banDuration.seconds * 1000;
        const duration = new Date(timeFrame);
        if (duration < new Date()) {
          update = { ...update, ban: user.ban + 1, banDuration: today };
        }
      }
      if (update !== null) {
        updateDoc(doc(db, "users", user.docId), update);
      }
      if (user.signals_duration && user.premium_signals) {
        const signalsDuration = new Date(user.signals_duration.seconds * 1000);
        const today = new Date();
        let post = {};
        if (signalsDuration <= today) {
          post = { premium_signals: false };
        }
        updateDoc(doc(db, "users", user.docId), post);
      }
    }
  }, [user]);

  useEffect(() => {
    if(user && Object.keys(usersList).length > 0 && !window.location.pathname.includes('signin')){
      const inviterUid = window.localStorage.invited
      let executed = false
      if(user.inviter === undefined && inviterUid && user.uid !== inviterUid){
        if(!executed){
          executed = true
        rewardInviter(inviterUid)
        }
      }
      }
  },[usersList])

  function rewardInviter(inviterUid){
    updateDoc(doc(db , 'users' , user.docId) , {inviter:inviterUid})
    const inviter = usersList.find((user) => user.uid === inviterUid)
    updateDoc(doc(db , 'users' , inviter.docId),{
      signups:inviter.signups + 1,
      credits: inviter.credits + 0.1
    })
    localStorage.removeItem('invited')
  }

  function updateCart(value) {
    setCart(value);
  }

  async function getUsers() {
    // const data = await getDocs(collection(db, "users"));
    // const users = data.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
    onSnapshot(collection(db, "users"), (data) => {
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
    });
  }

  async function autoSignIn() {
    onAuthStateChanged(auth, (appUser) => {
      if (appUser) {
        const userRef = query(
          collection(db, "users"),
          where("uid", "==", appUser.uid)
        );
        const unsubscribe = onSnapshot(userRef, (querySnapshot) => {
          const userData = [];
          querySnapshot.docs.forEach((item) =>
            userData.push({ ...item.data(), docId: item.id })
          );
          if (user !== userData) {
            if (Object.keys(userData).length > 0) {
              setUser(userData[0]);
            } else {
              let today = new Date()
              today.setDate(today.getDate() + 7)
              const userInfo = {
                uid: appUser.uid,
                displayName: appUser.displayName,
                photoUrl: appUser.photoURL,
                email: appUser.email,
                creationTime: appUser.metadata.creationTime,
                warn: 0,
                kick: 0,
                mute: 0,
                muteDuration: new Date(),
                ban: 0,
                banDuration: new Date(),
                founder: false,
                admin: false,
                analyst: false,
                support: false,
                blue_badge_trader: false,
                premium_signals: true,
                signals_duration:today,
                premium_trader: false,
                booster: false,
                crypto: false,
                stocks: false,
                forex: false,
                free_signals: false,
                marketing: false,
                free_member: true,
              };
              user !== userInfo && setUser(userInfo);
              addDoc(collection(db, "users"), userInfo);
            }
          }
        });
      } else {
        setUser(null);
      }
    });
  }

  if (!localStorage.noFirstVisit) {
    localStorage.noFirstVisit = "1";
    setPopup(true);
  }

  function closePopup() {
    setPopup(false);
  }

  return (
    <Router>
      {<Nav user={user} />}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              testimonials={testimonials}
              products={products}
              user={user}
              faqs={faq}
            />
          }
        />
        <Route
          exact
          path="/products"
          element={<Products user={user} products={products} cart={cart} />}
        />
        <Route
          exact
          path="products/:nameInUrl"
          element={<AboutProduct user={user} products={products} cart={cart} />}
        />
        <Route
          exact
          path="/cart"
          element={<Cart setCart={updateCart} usersList={usersList} cart={cart} user={user} />}
        />
        <Route exact path="/marketing" element={<Marketing user={user} />} />
        <Route exact path='/marketing/redeem' element={<MarketingRedeem user={user} products={products} />} />
        <Route exact path="/terms" element={<Terms />} />
        <Route exact path="/signin" element={<Signin usersList={usersList} setUser={setUser} />} />
        <Route
          exact
          path="/invite/:inviteId"
          element={<Invite user={user} usersList={usersList} />}
        />
        <Route exact path="/learn" element={<Learn user={user} />} />
        <Route
          path="/app/:channel"
          element={
            <Chat
              usersList={usersList}
              p1={p1}
              p2={p2}
              p3={p3}
              p4={p4}
              p5={p5}
              p6={p6}
              p7={p7}
              setUsersList={setUsersList}
              user={user}
            />
          }
        />
        <Route path="/signals" element={<SignalsRoom user={user} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {popup && <PopUp closePopup={closePopup} />}
      <Footer />
    </Router>
  );
}

export default App;
