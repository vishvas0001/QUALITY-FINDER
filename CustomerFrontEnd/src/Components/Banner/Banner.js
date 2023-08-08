import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { BaseURLUser } from "../../Common/constants";

export default function Banner() {
  let [categories, setCategories] = useState([]);
  const SearchData = (e)=>{
    e.preventDefault();
    let title = e.target.title.value;
    let catId = e.target.catId.value;
    let url=`s/${title}`;
    if(catId!="Category" && catId!="0")
      url = `s/${title}/${catId}`;
    window.location.assign(url)  
  }
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
  return (
    <>
      <section className="hero-area bg-1 text-center overly">
        {/* <!-- Container Start --> */}
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* <!-- Header Contetnt --> */}
              <div className="content-block">
                <h1>Buy & Sell Near You </h1>
                <p>
                  Join the millions who buy and sell from each other <br />{" "}
                  everyday in local communities around the world
                </p>
                <div className="short-popular-category-list text-center">
                  <h2>Popular Category</h2>
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <a href="category.html">
                        <i className="fa fa-car"></i> Cars
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="category.html">
                        <i className="fa fa-mobile"></i> Mobile
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="category.html">
                        <i className="fa fa-television"></i> Electronics
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="category.html">
                        <i className="fa fa-gear"></i> Services
                      </a>
                    </li>
                   
                  </ul>
                </div>
              </div>
              {/* <!-- Advance Search --> */}
              <div className="advance-search">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-12 col-md-12 align-content-center">
                      <form onSubmit={SearchData}>
                        <div className="form-row">
                          <div className="form-group col-md-4">
                            <input
                              type="text"
                              className="form-control my-2 my-lg-1"
                              id="inputtext4"
                              name="title"
                              placeholder="What are you looking for"
                            />
                          </div>
                          <div className="form-group col-md-3">
                            
                            <select  name="catId" className="w-100 form-control mt-lg-1 mt-md-2">
                              <option value="0">--------------------</option>
                                  {categories.map((ele, index) => (
                                
                                    <option
                                      key={index} value={ele._id}
                                    >
                                      {ele.name}
                                      </option>
                                  )
                                )}
                            </select>
                          </div>
                          {/* <div className="form-group col-md-3">
                            <input
                              type="text"
                              className="form-control my-2 my-lg-1"
                              id="inputLocation4"
                              placeholder="Location"
                            />
                          </div> */}
                          <div className="form-group col-md-2 align-self-center">
                            <button type="submit" className="btn btn-primary">
                              Search Now
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Container End --> */}
      </section>
    </>
  );
}
