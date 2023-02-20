
import './App.css';
import Header from './components/layout/Header/Header.js'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import WebFont from 'webfontloader';
import React from 'react';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home.js';
import ProductDetails from './components/Product/ProductDetails.js';
import Products from './components/Product/Products.js'
import Search from "./components/Product/Search.js"
import LoginSignUp from './components/User/LoginSignUp';
import axios from 'axios';
import UserOptions from './components/layout/Header/UserOptions.js'
import store  from'./store';
import { laodUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile.js'
import UpdateProfile from "./components/User/UpdateProfile.js"
import UpdatePassword from "./components/User/UpdatePassword.js"
import ForgotPassword from "./components/User/ForgotPassword.js"

axios.defaults.withCredentials=true
function App() {

  const {user,isAuthenticated}=useSelector(state=>state.user)


  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid sans","Chilanka"]
      }
    })
    store.dispatch(laodUser())
  },[])
  
  return (
    <>
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user}/>}
      <Routes>
  
      <Route path="/" exact element={<Home/>} />
      <Route path="/product/:id" element={<ProductDetails/>} />
      <Route path="/products" element={<Products/>}/>
      <Route path="/search" element={<Search />}/>
      <Route path="/products/:keyword" element={<Products/>}/>
     { isAuthenticated && < Route path="/account" element={<Profile/>}/>
     }
      <Route path="/password/forgot" element={<ForgotPassword/>}/>
      <Route path='/login' element={<LoginSignUp/>}/>
      { isAuthenticated && < Route path="/me/update" element={<UpdateProfile/>}/>}
      { isAuthenticated && < Route path="/password/update" element={<UpdatePassword/>}/>}
    
      </Routes>
      <Footer/>

      </Router>
      
      </>
  );
}

export default App;
