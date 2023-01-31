import React,{useEffect} from 'react'
import './Products.css';
import {useSelector,useDispatch} from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { clearErrors,getProduct } from '../../actions/productAction';
const Products = () => {

    const dispatch=useDispatch()
    const {products,loading,error,productsCount}=useSelector(state=>state.products)
    useEffect(() => {
    dispatch(getProduct())
    }, [dispatch])
    

  return (
    <>
    {loading?<Loader/>:<>
    "hi"
    </>}
    </>
  )
}

export default Products