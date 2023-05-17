import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./compnents/Footer";
import Nav from "./compnents/Nav";
import Home from "./pages/Home";
import Products from "./pages/Prodcuts";
import { auth, db } from "./firebase/init";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import AboutProduct from "./pages/AboutProduct";
import Cart from "./pages/Cart";
import Terms from "./pages/Terms";
import PopUp from "./ui/PopUp";
import Signin from "./compnents/Auth/SignIn";
import Operation from "./ui/Operation";
import { onAuthStateChanged } from "firebase/auth";
import Chat from "./pages/Chat";

function App() {
  const [testimonials, setTestimonials] = useState(null);
  const [faq, setFaq] = useState(null);
  const [products, setProducts] = useState(null);
  const [cart, setCart] = useState([]);
  const [popup, setPopup] = useState(false);
  const [operation, setOperation] = useState(false);
  const [operationSuccess, setOparationSuccess] = useState();
  const [message, setMessage] = useState();
  const [user, setUser] = useState(false);

  function displayOperation(content, state) {
    setMessage(content);
    setOparationSuccess(state);
    setOperation(true);
  }

  console.log(user)

  useEffect(() => {
    if (operation) {
      setTimeout(() => {
        setOperation(false);
      }, 5000);
    }
  }, [operation]);

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
    autoSignIn()
  }, [])

  function updateCart(value) {
    setCart(value);
  }

  function autoSignIn() {
    onAuthStateChanged(auth, (appUser) => {
      if (appUser) {
        setUser(appUser);
      }else{
        setUser(null)
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
            <Home testimonials={testimonials} products={products} faqs={faq} />
          }
        />
        <Route
          exact
          path="/products"
          element={<Products products={products} cart={cart} />}
        />
        <Route
          exact
          path="products/:nameInUrl"
          element={<AboutProduct products={products} cart={cart} />}
        />
        <Route
          exact
          path="/cart"
          element={<Cart setCart={updateCart} cart={cart} user={user} />}
        />
        <Route exact path="/terms" element={<Terms />} />
        <Route
          exact
          path="/signin"
          element={
            <Signin setUser={setUser} displayOperation={displayOperation} />
          }
        />
        <Route path="/app" element={<Chat user={user} />}/>
      </Routes>
      {popup && <PopUp closePopup={closePopup} />}
      {operation && (
        <Operation
          success={operationSuccess}
          message={message}
          setOperation={setOperation}
        />
      )}
      <Footer />
    </Router>
  );
}

export default App;
