import {BaseURLUser} from "../../Common/constants";
import axios from "axios";
import {useEffect, useState} from "react";
import {Navigate, useParams, Link} from "react-router-dom";

export default function Card(props) {

  return (
    <>
      <div className="col-sm-6 col-lg-3 col-xl-3 col-md-4 col-2 ">
        {/* <!-- product card --> */}
        <div className="product-item bg-light shadow">
          <div className="card">
            <div className="thumb-content">
              <div className="price">₹ {" "}{props.price}</div>
              <Link to = {{pathname:`/adview/${props.id}`}} >
                <img
                  className="card-img-top img-fluid"
                  src={BaseURLUser+"/images/post/"+props.img}
                  alt="Card image cap"
                />
                </Link>
              
            </div>
            <div className="card-body">
            <Link to = {{pathname:`/${props.id}`}} >
              <h4 className="card-title">
                {props.name}
              </h4>
              </Link>
              
              <p className="card-text">
                {props.des}
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
