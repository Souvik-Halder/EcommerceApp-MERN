import React,{useEffect, useState} from 'react'
import './Products.css';
import {useSelector,useDispatch} from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { clearErrors,getProduct } from '../../actions/productAction';
import ProductCard from '../Home/ProductCard'
import MetaData from '../layout/Metadata'
import { useParams } from 'react-router-dom';
import {useAlert} from 'react-alert'
import  Pagination  from 'react-js-pagination';
import { Slider, Typography } from '@mui/material';


  //categories array
  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

const Products = () => {
  const alert=useAlert();

  const [category,setCategory]=useState("")

    const {keyword}=useParams();

  const [currentPage,setCurrentPage]=useState(1);
  const [price,setPrice]=useState([0,25000])

  const [ratings,setRatings]=useState(0);

//using the data of the store code starts here
    const dispatch=useDispatch()

    const {products,loading,error,productsCount,resultPerPage}=useSelector(state=>state.products);

  const setCurrentPageNo=(e)=>{
    setCurrentPage(e)
  }
//using the data of the store code ends here

  const priceHandler=(event,newPrice)=>{
    setPrice(newPrice);
  }

    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors())
      }
    dispatch(getProduct(keyword,currentPage,price,category,ratings))
    }, [dispatch,keyword,currentPage,price,category,ratings,alert,error])
    


  return (
    <>
    {loading?<Loader/>:<>
    <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          {/* Filter will be applied when we search for that so the below code is for that */}
          { <div className='filterBox'>
                  <Typography> Price</Typography>
                  <Slider 
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby='range-slider'
                  min={0}
                  max={25000}
                  />
                   <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

                {/* For the rating */}
                <fieldset>
                <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
                </fieldset>


                </div>}

          {resultPerPage<productsCount && (  <div className='paginationBox'>
                <Pagination activePage={currentPage} itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass='page-item'
                linkClass='page-link'
                activeClass='pageItemActive'
                activeLinkClass='pageLinkActive'
                />
                </div>
                ) } 
        
    </>
  }
    </>
  )
}

export default Products