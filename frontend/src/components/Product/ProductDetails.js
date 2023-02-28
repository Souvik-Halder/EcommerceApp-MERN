import React, { useEffect,useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { Rating } from '@mui/material';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, newReview } from "../../actions/productAction";
import {useAlert} from 'react-alert'
import Loader from '../layout/Loader/Loader'
import ReactStars from 'react-rating-stars-component'
import {addItemsToCart} from '../../actions/cartAction'
import ReviewCard from './ReviewCard.js'
//match is used in frontend  as the req.params.id is used to fetch the id from url in backend and we don't need to provide any props in this component we just need to use match as describe below

function ProductDetails() {
  const { id } = useParams();

  const [quantity, setquantity] = useState(1);
 const increaseQuantity=()=>{
 if(product.Stock<=quantity) return;
 
  const qty=quantity+1;
  setquantity(qty)
 }
const decreaseQuantity=()=>{
  if(1>=quantity) return;
 
  const qty=quantity-1;
  setquantity(qty)
}
const {success,error:reviewError}=useSelector(state=>state.newReview);

const [open, setOpen] = useState(false);
const [rating, setRating] = useState(0)
const [comment, setComment] = useState("")


  const dispatch = useDispatch();
  const alert =useAlert()
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const options = {
    value:product.ratings,
    readOnly: true,
    isHalf:true,
    size:"large",
  };

const addToCartHandler=()=>{
     dispatch(addItemsToCart(id,quantity))
     alert.success("Item added to cart")
}
const submitReviewToggle=()=>{
  open?setOpen(false):setOpen(true);
}
const reviewSubmitHandler=()=>{
  const  myForm=new FormData();
  myForm.set("comment",comment);
  myForm.set("productId",id);
  myForm.set("rating",rating);
  dispatch(newReview(myForm));
  setOpen(false);
}
  useEffect(() => {

    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    if(reviewError){
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if(success){
      console.log("success")
      alert.success("Review submitted successfully");
    }
    dispatch(getProductDetails(id));

  }, [dispatch,alert ,error,id,success,reviewError]);




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
            <Rating {...options} />
                
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
                </div>
          <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity} >-</button>
                    <input value={quantity} readOnly  type="number" />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                 onClick={addToCartHandler}
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
              <button onClick={submitReviewToggle}  className="submitReview">
                Submit Review
              </button>
        </div>
      </div>

      <h3 className="reviewsHeading">REVIEWS</h3>

      <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>




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
