import { Link , Navigate} from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";
import cors from "cors";
import { BaseURLUser } from "../../Common/constants";
import qs from "qs";
export default function Navbar() {
  var [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("isLoggedIn"));
  let [categories, setCategories] = useState([]);
  let [subCategories, setSubCategories] = useState([]);
  useEffect(() => {
    axios
    .post(`${BaseURLUser}listCategories`, qs.stringify(), {
      headers: { "Contact-Type": "application/x-www-form-urlencoded" },
    })
    .then((data) => {
      console.log(data);
      setCategories(data.data.categories);
    });
  }, []);
  useEffect(()=>{
    setIsLoggedIn(sessionStorage.getItem("isLoggedIn"));
  })
  // if(sessionStorage.getItem("isLoggedIn")){
  //   return(<Navigate to="/login"/>)
  // }
  const logout=()=>{
    setIsLoggedIn(false);
    sessionStorage.clear();
    localStorage.clear();
  }
  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <nav className="navbar navbar-expand-lg navbar-light navigation ">
                <Link className="navbar-brand" to="/">
                  <img
                    className="img-responsive rounded "
                    src="/assets/images/finder-logo.jpeg"
                    height="90"
                    alt=""
                  />
                </Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav ml-auto main-nav ">
                    <li className="nav-item active">
                      <Link className="nav-link" to="/">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item dropdown dropdown-slide">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Categories{" "}
                        <span>
                          <i className="fa fa-angle-down"></i>
                        </span>
                      </a>
                      {/* <!-- Dropdown list --> */}
                      <div className="dropdown-menu">
                        {categories.map((ele, index) => (
                          
                            <a
                              className="dropdown-item"
                              key={index}
                              href={`/${ele.name}/${ele._id}`}
                            >
                              {ele.name}
                            </a>
                          )
                        )}
                      </div>
                    </li>
                   
                    <li className="nav-item active">
                      <Link className="nav-link" to="/contact-us">
                        Contact-us
                      </Link>
                    </li>
                    <li className="nav-item active">
                      <Link className="nav-link" to="/about">
                        About
                      </Link>
                    </li>
                    
                  </ul>
                  <ul className="navbar-nav ml-auto mt-10">
                    {!isLoggedIn?<li className="nav-item">
                      <Link
                        className="nav-link login-button bg-primary text-light rounded"
                        to="/login"
                      >
                        Login
                      </Link>
                    </li>:<><li className="nav-item">
                      <button
                        className="btn btn-danger p-2 "
                        onClick={()=>{logout()}}
                      >
                        <i className="fa fa-sign-out"></i>
                      </button>
                    </li>
                    <li className="nav-item active">
                    <Link className="nav-link" to="/dashboard">
                      <i className="fas fa-user"></i>
                    </Link>
                  </li></>}
                    
                    <li className="nav-item">
                      <Link
                        className="nav-link text-white add-button bg-info rounded"
                        to="AdPost"
                      >
                        <i className="fa fa-plus-circle"></i> Post Ad
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
