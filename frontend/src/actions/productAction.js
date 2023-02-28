import axios from 'axios';

import{ALL_PRODUCT_FAIL,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_REQUEST, 
    PRODUCT_DETAILS_REQUEST , PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_SUCCESS,CLEAR_ERRORS, NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
 
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,} from '../constants/productConstant'


export const getProduct=(keyword="",currentPage=1,price=[0,25000],category,ratings=0)=>async (dispatch)=>{
    try{
        dispatch({
            type:ALL_PRODUCT_REQUEST
        })
        let link=`http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
        if(ratings){
             link=`http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        }
      
        
        if(category){
            link=`http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
        }
        const {data}=await axios.get(link)
        
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data,
        })
    }
    catch(error){
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.message
        })
    }
}


export const getProductDetails=(id)=>async (dispatch)=>{
    try{
        dispatch({
            type:PRODUCT_DETAILS_REQUEST
        })
        const {data}=await axios.get(`http://localhost:4000/api/v1/product/${id}`)
        console.log(data)
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product,
        })
    }
    catch(error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.message
        })
    }
}





// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(`http://localhost:4000/api/v1/review`, reviewData, config);
  
      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Get All Reviews of a Product
  export const getAllReviews = (id) => async (dispatch) => {
    try {
      dispatch({ type: ALL_REVIEW_REQUEST });
  
      const { data } = await axios.get(`http://localhost:4000/api/v1/reviews?id=${id}`);
  
      dispatch({
        type: ALL_REVIEW_SUCCESS,
        payload: data.reviews,
      });
    } catch (error) {
      dispatch({
        type: ALL_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete Review of a Product
  export const deleteReviews = (reviewId, productId) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_REVIEW_REQUEST });
  
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/reviews?id=${reviewId}&productId=${productId}`
      );
  
      dispatch({
        type: DELETE_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

///Clearing errors
export const clearErrors=()=>async (dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}