import React, { useState, useEffect } from "react";
import "./ForgotPassword.css";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MetaData from "../layout/Metadata";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";

const ForgotPassword = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();

    const {error,message,loading}=useSelector((state)=>state.profile)

    const [email, setEmail] = useState("")
    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
      };
      useEffect(() => {
        
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (message) {
          alert.success(message);
        
        }
      }, [dispatch, error, alert, message]);
    
  return (
    <>
    {loading ? (
      <Loader />
    ) : (
      <>
        <MetaData title="Forgot Password" />
        <div className="forgotPasswordContainer">
          <div className="forgotPasswordBox">
            <h2 className="forgotPasswordHeading">Update Profile</h2>
            <form
              className="forgotPasswordForm"
              encType="multipart/form-data"
              onSubmit={forgotPasswordSubmit}
            >
            
              <div className="forgotPasswordEmail">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>

            
              <input
                type="submit"
                value="Send"
                className="forgotPasswordBtn"
              />
            </form>
          </div>
        </div>
      </>
    )}
  </>
  )
}

export default ForgotPassword