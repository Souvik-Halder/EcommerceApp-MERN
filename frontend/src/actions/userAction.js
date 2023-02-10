import {LOGIN_FAIL,LOGIN_SUCCESS,CLEAR_ERRORS, LOGIN_REQUEST, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL} from '../constants/userConstant'

import axios from 'axios';

export const login=(email,password)=>async (dispatch)=>{
    try{
        dispatch({type:LOGIN_REQUEST})
        
    const config = { headers: { "Content-Type": "application/json" } };
        const {data}=await axios.post(
            `http://localhost:4000/api/v1/login`,
            {email,password},
            config
        )
        dispatch({type:LOGIN_SUCCESS,payload:data.user})
    }catch(error){
        dispatch({type:LOGIN_FAIL,payload:error.response.data.message})
    }
}


export const register=(userData)=>async (dispatch)=>{
    try{
        dispatch({type:REGISTER_USER_REQUEST})
        
    const config = { headers: { "Content-Type": "application/json" } };
        const {data}=await axios.post(
            `http://localhost:4000/api/v1/register`,
            userData,
            config
        )
        console.log(data)
        dispatch({type:REGISTER_USER_SUCCESS,payload:data.user})
    }catch(error){
        console.log(error)
        dispatch({type:REGISTER_USER_FAIL,payload:error.message})
    }
}



export const clearErrors=()=>async (dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}