import React from "react";
import { Link } from "react-router-dom";
import Category from "./Category";
import Country from "./Country";
const NavBar = () => {
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">
            News-React
          </Link>
          <Category/>
          <Country/>
      </nav>
    </div>
  );
};

export default NavBar;
