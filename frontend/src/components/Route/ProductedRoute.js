import React from 'react'
import { useSelector } from 'react-redux'
import { Route, useNavigate,redirect } from 'react-router-dom'

function ProductedRoute({element:Element,...rest}) {
    const {loading,isAuthenticated,user}=useSelector(state=>state.user)
    const navigate=useNavigate();
  return (
 <>
 {
    !loading&&(
        <Route {...rest} render={(props)=>{
           
            return <Element {...props}/>
        }}/>
    )
 }
 </>
  )
}

export default ProductedRoute
