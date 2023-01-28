import React from "react";
import { HiArrowDown } from "react-icons/hi";
import "./Home.css";
import Product from './Product.js'
import MetaData from "../layout/Metadata";
const product={
  name:"Blue Tshirt",
  price:"3000",
  ratings:2.5,
  images:[{url:'https://picsum.photos/200/300'}],
  _id:"Souvik"
}

const Home = () => {

  return (
    <>
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
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>

      <Product product={product}/>
      <Product product={product}/>

      <Product product={product}/>
      <Product product={product}/>
    </div>
     
    </>
  );
};

export default Home;