import React, { useState } from 'react'
import './Header.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import { Backdrop } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { SpeedDial,SpeedDialAction } from '@mui/material';
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../actions/userAction';

function UserOptions({user}) {
  const dispatch=useDispatch()
    const navigate=useNavigate()
    const {cartItems}=useSelector(state=>state.cart)

    function dashboard(){
        navigate('/admin/dashboard')
    }
    function account(){
        navigate('/account');
    }
    function cart(){
      navigate('/cart')
    }
    function orders(){
        navigate('/orders');
    }
    function logoutUser(){
      window.localStorage.clear();
       dispatch(logout())
        navigate('/login');
    }

    const options = [
        { icon: <ListAltIcon />, name: "Orders",func:orders  },
        { icon: <PersonIcon />, name: "Profile",func:account },
        {
          icon: (
            <ShoppingCartIcon
              style={{ color:cartItems.length>0?"tomato":"unset" }}
            />
          ),
          name: `Cart${cartItems.length}`,
       func:cart
        },
        { icon: <ExitToAppIcon />, name: "Logout",func:logoutUser  },
      ];

if(user.role==="admin"){
    options.unshift({ icon: <DashboardIcon />, name: "Dashboard",func:dashboard  })
}


    const [open,setOpen]=useState(false)
  return (

 <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={ user.avtar.url ? user.avtar.url : "/Profile.jpeg"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>

  )
}

export default UserOptions
