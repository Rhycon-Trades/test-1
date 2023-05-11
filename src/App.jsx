import {BrowserRouter as Router, Route , Routes} from 'react-router-dom'
import Footer from './compnents/Footer';
import Nav from './compnents/Nav';
import Home from './pages/Home';
import Products from './pages/Prodcuts';
import { db } from './firebase/init';
import { collection , getDocs } from 'firebase/firestore'
import { useState , useEffect } from 'react';
import AboutProduct from './pages/AboutProduct';
import Cart from './pages/Cart';
import Terms from './pages/Terms';
import PopUp from './ui/PopUp';
import SignUp from './compnents/Auth/SignUp';
import Signin from './compnents/Auth/SignIn';
import ForgetPassword from './compnents/Auth/ForgetPassword';

function App() {

  const [testimonials , setTestimonials] = useState(null)
  const [faq , setFaq] = useState(null)
  const [products , setProducts] = useState(null)
  const [cart , setCart] = useState([])
  const [popup , setPopup] = useState(false)

  useEffect(() => {

    const getTestimonials = async () => {
      const data = await getDocs(collection(db , 'testimonials'))
      setTestimonials(data.docs.map((doc) => ({...doc.data() , id: doc.id})))
    }

    const getFaq = async () => {
      const data = await getDocs(collection(db , 'faq'))
      setFaq(data.docs.map((doc) => ({...doc.data() , id: doc.id})))
    }

    const getProducts = async () => {
      const data = await getDocs(collection(db , 'products'))
      setProducts(data.docs.map((doc) => ({... doc.data() , id: doc.id})))
    }

    getTestimonials()
    getFaq()
    getProducts()
  },[])

  function updateCart(value){
    setCart(value)
  }

  if(! localStorage.noFirstVisit){
    localStorage.noFirstVisit = '1'
    setPopup(true)
  }

  function closePopup(){
    setPopup(false)
  }

  return (
    <Router>
      <Nav />
      <Routes>
        <Route exact path='/' element={<Home testimonials={testimonials} products={products} faqs={faq} />} />
        <Route exact path='/products' element={<Products products={products} cart={cart} />} />
        <Route exact path='products/:nameInUrl' element={<AboutProduct products={products} cart={cart} />}/>
        <Route exact path='/cart' element={<Cart  setCart={updateCart} cart={cart} />} />
        <Route exact path='/terms' element={<Terms />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/signin' element={<Signin />} />
        <Route exact path='/passwordreset' element={<ForgetPassword />} />
      </Routes>
      {
        popup &&
        <PopUp closePopup={closePopup} />
      }
      <Footer />
    </Router>
  );
}

export default App;
