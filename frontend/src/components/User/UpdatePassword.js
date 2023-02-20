import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/Metadata";
import { useDispatch, useSelector } from "react-redux";
import LockOpenIcon from '@mui/icons-material/LockOpen'

import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import PreviewIcon from '@mui/icons-material/Preview';
import LockIcon from '@mui/icons-material/Lock';

function UpdatePassword() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
 const [oldPassword, setOldPassword] = useState("")
 const [newPassword, setNewPassword] = useState("")
 const [confirmPassword, setConfirmPassword] = useState("")
    const updatePasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("oldPassword", oldPassword);
      myForm.set("newPassword", newPassword);
      myForm.set("confirmPassword", confirmPassword);
      dispatch(updatePassword(myForm));
    };
  

    const navigate = useNavigate();
  
    useEffect(() => {
 
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (isUpdated) {
        alert.success("Profile Updated Successfully");
      
        navigate("/account");
        dispatch({
          type: UPDATE_PASSWORD_RESET,
        });
      }
    }, [dispatch, error, alert, isUpdated, navigate]);
  

  return (
    <>
    {loading ? (
      <Loader />
    ) : (
      <>
        <MetaData title="Change Password" />
        <div className="updatePasswordContainer">
          <div className="updatePasswordBox">
            <h2 className="updatePasswordHeading">Update Profile</h2>
            <form
              className="updatePasswordForm"
              encType="multipart/form-data"
              onSubmit={updatePasswordSubmit}
            >
        
        <div className="loginPassword">
                  <PreviewIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
         
              <input
                type="submit"
                value="Change"
                className="updatePasswordBtn"
              />
            </form>
          </div>
        </div>
      </>
    )}
  </>
  )
}

export default UpdatePassword
