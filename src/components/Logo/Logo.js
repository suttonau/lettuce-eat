import React from "react";
import logo from "../../assets/images/lettuce-eat-logo.png";
import classes from "./Logo.css";

const Logo = props => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={logo} alt="MyLogo" />
  </div>
);

export default Logo;
