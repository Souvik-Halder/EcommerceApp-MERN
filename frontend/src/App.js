
import './App.css';
import Header from './components/layout/Header/Header.js'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import WebFont from 'webfontloader';
import React,{useState,useEffect} from 'react';
import Footer from './components/layout/Footer/Footer';
import ProductReviews from './components/Admin/ProductReviews.js'
import Home from './components/Home/Home.js';
import ProductDetails from './components/Product/ProductDetails.js';
import Products from './components/Product/Products.js'
import OrderDetails from './components/Order/OrderDetails.js'
import ProductList from './components/Admin/ProductList.js'
import UserList from './components/Admin/UserList.js'
import Search from "./components/Product/Search.js"
import LoginSignUp from './components/User/LoginSignUp';
import axios from 'axios';
import UpdateUser from './components/Admin/UpdateUser.js'
import { loadStripe } from "@stripe/stripe-js";
import ProcessOrder from './components/Admin/ProcessOrder.js'
import Shipping from "./components/Cart/Shipping.js"
import UserOptions from './components/layout/Header/UserOptions.js'
import store  from'./store';
import { laodUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile.js'
import OrderList from './components/Admin/OrderList.js'
import UpdateProfile from "./components/User/UpdateProfile.js"
import UpdatePassword from "./components/User/UpdatePassword.js"
import ForgotPassword from "./components/User/ForgotPassword.js"
import ConfirmOrder from './components/Cart/ConfirmOrder.js'
 import Payment from "./components/Cart/Payment.js"
import MyOrders from "./components/Order/MyOrders.js"
import ResetPassword from "./components/User/ResetPassword.js"
import Cart from './components/Cart/Cart.js'
import OrderSuccess from './components/Cart/OrderSuccess.js'
import { Elements } from '@stripe/react-stripe-js';
import Dashboard from './components/Admin/Dashboard.js';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct.js'
axios.defaults.withCredentials=true
function App() {
  const isAdmin=true;
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
    { isAuthenticated && < Route path="/order/:id" element={<OrderDetails/>}/>
     }
    { isAuthenticated && < Route path="/process/payment" element={<Payment/>}/>
     }
      { isAuthenticated && < Route path="/success" element={<OrderSuccess/>}/>
     }
     { isAuthenticated && < Route path="/orders" element={<MyOrders/>}/>
     }
      { isAuthenticated && isAdmin&&user.role==="admin"&& < Route path="/admin/dashboard" element={<Dashboard/>}/>
     }
      { isAuthenticated && isAdmin&&user.role==="admin"&& < Route path="/admin/products" element={<ProductList/>}/>
     }
      { isAuthenticated && isAdmin&&user.role==="admin"&& < Route path="/admin/orders" element={<OrderList/>}/>
     }
      { isAuthenticated && isAdmin&&user.role==="admin"&& < Route path="/admin/users" element={<UserList/>}/>
     }
     { isAuthenticated && isAdmin&&user.role==="admin"&& < Route path="/admin/product" element={<NewProduct/>}/>
     }
        { isAuthenticated && isAdmin&&user.role==="admin"&& < Route path="/admin/product/:id" element={<UpdateProduct/>}/>
     }
      { isAuthenticated && isAdmin&&user.role==="admin"&& < Route path="/admin/order/:id" element={<ProcessOrder/>}/>
     }
     
      { isAuthenticated && isAdmin&&user.role==="admin"&& < Route path="/admin/user/:id" element={<UpdateUser/>}/>
     }
       { isAuthenticated && isAdmin&&user.role==="admin"&& <Route path="/admin/reviews" element={<ProductReviews/>}/>
     }
     
    <Route path="/cart" element={<Cart/>}/>

      </Routes>
     

      </Elements>
      </Router>
      <Footer/>
      </>
  );
}

export default App;
