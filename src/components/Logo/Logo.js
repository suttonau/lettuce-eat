import React from "react";
import logo from "../../assets/images/lettuce-eat-logo.png";
import classes from "./Logo.css";

const Logo = props => (
  <div className={classes.Logo}>
    <img src={logo} alt="MyLogo" />
  </div>
);

export default Logo;
