import React from "react";
import "./sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

import ExpandMoreIcon from "@mui/icons-material//ExpandMore";
import PostAddIcon from "@mui/icons-material//PostAdd";
import AddIcon from "@mui/icons-material//Add";
import ImportExportIcon from "@mui/icons-material//ImportExport";
import ListAltIcon from "@mui/icons-material//ListAlt";
import DashboardIcon from "@mui/icons-material//Dashboard";
import PeopleIcon from "@mui/icons-material//People";
import RateReviewIcon from "@mui/icons-material//RateReview";

const Sidebar = () => {
  return (
    <div className="hi">
      <Link to={`/admin/products`}>Products</Link>
      <Link to={`/admin/orders`}>Orders</Link>
      <Link to={`/admin/users`}>Users</Link>
      <Link to={`/admin/reviews`}>Reviews</Link>

    </div>
  );
};

export default Sidebar;