import React ,{useEffect} from "react";
import { HiArrowDown } from "react-icons/hi";
import "./Home.css";
import ProductCard from './ProductCard.js'
import MetaData from "../layout/Metadata";
import {clearErrors, getProduct} from '../../actions/productAction'
import {useSelector,useDispatch} from 'react-redux'
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
const Home = () => {
  const alert =useAlert();
  const dispatch=useDispatch();
   const {loading,error,products}=useSelector(state=>state.products)
  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }
  dispatch(getProduct());
  }, [dispatch,alert,error])
  

  return (
    <>
    {loading?<Loader/>:<>
    <MetaData title={"Ecommerce"}/>
     <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <HiArrowDown />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
    <div className="container" id="container">
    {products && products.map(product=>(
      <ProductCard product={product}/>
    ))}
    </div>
     
    </>}
    </>
  );
};

export default Home;