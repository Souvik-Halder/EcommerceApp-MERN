import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import {useAlert} from 'react-alert'
import Loader from '../layout/Loader/Loader'
import ReactStars from 'react-rating-stars-component'
import Rating from "./Rating";
import ReviewCard from './ReviewCard.js'
//match is used in frontend  as the req.params.id is used to fetch the id from url in backend and we don't need to provide any props in this component we just need to use match as describe below

function ProductDetails() {
  const { id } = useParams();

 

  const dispatch = useDispatch();
  const alert =useAlert()
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const options = {
    value:product.rating,
    readOnly: true,
    precision: 0.5,
  };

  useEffect(() => {

    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
   
  

  }, [dispatch,alert ,error,id]);
  return (
    <>
    {loading?<Loader/>:
        <>
      <div className="ProductDetails">
        <Carousel >
          {product.images &&
            product.images.map((item, i) => (
              <img
                className="CarouselImage"
                key={i}
                src={item.url}
                alt={`${i} Slide`}
              />
            ))}
        </Carousel>

        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className="detailsBlock-2">
            <ReactStars {...options} />
                
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
                </div>
          <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button >-</button>
                    <input value={1}   type="number" />
                    <button>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                 
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <button  className="submitReview">
                Submit Review
              </button>
        </div>
      </div>

      <h3 className="reviewsHeading">REVIEWS</h3>

      {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
         
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}

    </>}
    </>

  );
}

export default ProductDetails;
