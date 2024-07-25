import React from "react";
import { Link } from "react-router-dom";

export default function Category() {
  return (
    <div>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Category
              </a>
              <ul
                className="dropdown-menu"
                style={{ height: "200px", overflow: "auto" }}
              >
                {/* <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li> */}
                <li className="nav-item">
                  <Link className="dropdown-item" to="/business">
                    Business
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="dropdown-item" to="/entertainment">
                    Entertainment
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="dropdown-item" to="/general">
                    General
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="dropdown-item" to="/health">
                    Health
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="dropdown-item" to="/science">
                    Science
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="dropdown-item" to="/sports">
                    Sports
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="dropdown-item" to="/technology">
                    Technology
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
