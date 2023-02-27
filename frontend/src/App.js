
import './App.css';
import Header from './components/layout/Header/Header.js'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import WebFont from 'webfontloader';
import React,{useState,useEffect} from 'react';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home.js';
import ProductDetails from './components/Product/ProductDetails.js';
import Products from './components/Product/Products.js'
import Search from "./components/Product/Search.js"
import LoginSignUp from './components/User/LoginSignUp';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import Shipping from "./components/Cart/Shipping.js"
import UserOptions from './components/layout/Header/UserOptions.js'
import store  from'./store';
import { laodUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile.js'
import UpdateProfile from "./components/User/UpdateProfile.js"
import UpdatePassword from "./components/User/UpdatePassword.js"
import ForgotPassword from "./components/User/ForgotPassword.js"
import ConfirmOrder from './components/Cart/ConfirmOrder.js'
 import Payment from "./components/Cart/Payment.js"
import ResetPassword from "./components/User/ResetPassword.js"
import Cart from './components/Cart/Cart.js'
import OrderSuccess from './components/OrderSuccess.js'
import { Elements } from '@stripe/react-stripe-js';
axios.defaults.withCredentials=true
function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");


  //The function to get the stripe key
  async function getStripeApiKey() {
    const { data } = await axios.get("http://localhost:4000/api/v1/stripeapikey");
    console.log(data)
    setStripeApiKey(data.stripeApiKey);
  }
  const {user,isAuthenticated}=useSelector(state=>state.user)
  const stripePromise = loadStripe(stripeApiKey);

useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid sans","Chilanka"]
      }
    })

    store.dispatch(laodUser())
    getStripeApiKey()

  },[])
  

  return (
    <>
 
    <Router>
    <Elements stripe={stripePromise}>
      <Header/>
      {isAuthenticated && <UserOptions user={user}/>}
      <Routes>
  
      <Route path="/" exact element={<Home/>} />
      <Route path="/product/:id" element={<ProductDetails/>} />
      <Route path="/products" element={<Products/>}/>
      <Route path="/search" element={<Search />}/>
      <Route path="/products/:keyword" element={<Products/>}/>
      <Route path="/password/reset/:token" element={<ResetPassword/>}/>
     { isAuthenticated && < Route path="/account" element={<Profile/>}/>
     }
      <Route path="/password/forgot" element={<ForgotPassword/>}/>
      <Route path='/login' element={<LoginSignUp/>}/>
      { isAuthenticated && < Route path="/me/update" element={<UpdateProfile/>}/>}
      { isAuthenticated && < Route path="/password/update" element={<UpdatePassword/>}/>}
      { isAuthenticated && < Route path="/shipping" element={<Shipping/>}/>
     }
     { isAuthenticated && < Route path="/order/confirm" element={<ConfirmOrder/>}/>
     }
    
    { isAuthenticated && < Route path="/process/payment" element={<Payment/>}/>
     }
      { isAuthenticated && < Route path="/success" element={<OrderSuccess/>}/>
     }
     
    <Route path="/cart" element={<Cart/>}/>

      </Routes>
      <Footer/>

      </Elements>
      </Router>
   
      </>
  );
}

export default App;
