import React,{useState} from 'react'
import './Search.css'
import MetaData from '../layout/Metadata';
import {useNavigate} from 'react-router-dom';
const Search = () => {
    const [keyword,setKeyword]=useState("");
    const navigate=useNavigate()
    const searchSubmitHandler=(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        }
        else{
            navigate('/products')
        }
    }

  return (

    <>
    <MetaData title="Search A Product -- ECOMMERCE" />
    <form onSubmit={searchSubmitHandler} className="searchBox">
    <input type="text" placeholder='Search a product' onChange={(e)=>setKeyword(e.target.value)} />
    <input type="submit" value="Search" />
    </form>
    </>
  )
}

export default Search
