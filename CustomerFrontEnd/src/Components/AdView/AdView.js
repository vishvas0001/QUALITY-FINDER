import axios from "axios";
import { useEffect, useState } from "react";
import { BaseURLUser } from "../../Common/constants";
import { Navigate, useParams, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import qs from "qs";

export default function AdView() {
  var [adData, setAdData] = useState([]);
  let [userData, setUserData] = useState([]);
  let [catData, setCatData] = useState([]);
  const LinkParam = useParams();
  useEffect(() => {
    let postdata = {
      id: LinkParam.id,
    };
    axios
      .post(`${BaseURLUser}viewPost`, qs.stringify(postdata), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((data) => {
        console.log("USER",data.data.post.user_Id.name);
        console.log(data.data.post)
        setUserData(data.data.post.user_Id);
        setCatData(data.data.post.cat_Id);
        setAdData(data.data.post);
        console.log('User Data',userData);
      });
  }, []);

  return (
    <>
      <section className="section bg-gray">
        {/* <!-- Container Start --> */}
        <div className="container">
          <div className="row">
            {/* <!-- Left sidebar --> */}
            <div className="col-md-8">
              <div className="product-details">
                <h1 className="product-title">{adData.title}</h1>
                <div className="product-meta">
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <i className="fa fa-user-o"></i> By <a href="">{userData.name}</a>
                    </li>
                    <li className="list-inline-item">
                      <i className="fa fa-folder-open-o"></i> Category
                      { " "}<strong>{catData.name}</strong>
                    </li>
                    <li className="list-inline-item">
                      <i className="fa fa-location-arrow"></i> Location
                      <a href="">
                        {adData.city},{adData.state}
                      </a>
                    </li>
                  </ul>
                </div>

                {/* <!-- product slider --> */}
                <div className="product-slider">
                  <img src={`${BaseURLUser}images/post/${adData.imgs}`} alt="My Image" style={{"width":"100%"}}/>
                  {/* <div
                    className="product-slider-item my-4"
                    data-image="/Assets/images/products/products-1.jpg"
                  >
                    <img
                      className="img-fluid w-100"
                      src="/Assets/images/products/products-1.jpg"
                      alt="product-img"
                    />
                  </div>
                  <div
                    className="product-slider-item my-4"
                    data-image="/Assets/images/products/products-2.jpg"
                  >
                    <img
                      className="d-block img-fluid w-100"
                      src="/Assets/images/products/products-2.jpg"
                      alt="Second slide"
                    />
                  </div>
                  <div
                    className="product-slider-item my-4"
                    data-image="/Assets/images/products/products-3.jpg"
                  >
                    <img
                      className="d-block img-fluid w-100"
                      src="/Assets/images/products/products-3.jpg"
                      alt="Third slide"
                    />
                  </div>
                  <div
                    className="product-slider-item my-4"
                    data-image="/Assets/images/products/products-1.jpg"
                  >
                    <img
                      className="d-block img-fluid w-100"
                      src="/Assets/images/products/products-1.jpg"
                      alt="Third slide"
                    />
                  </div>
                  <div
                    className="product-slider-item my-4"
                    data-image="/Assets/images/products/products-2.jpg"
                  >
                    <img
                      className="d-block img-fluid w-100"
                      src="/Assets/images/products/products-2.jpg"
                      alt="Third slide"
                    />
                  </div> */}
                </div>
                {/* <!-- product slider --> */}

                <div className="content mt-5 pt-5">
                  <ul
                    className="nav nav-pills  justify-content-center"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="pills-home-tab"
                        data-toggle="pill"
                        href="#pills-home"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                      >
                        Product Details
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                    >
                      <h3 className="tab-title">Product Description</h3>

                      <p></p>
                      <p>{adData.description}</p>
                    </div>
                    <div
                      className="tab-pane fade show active"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                    >
                      <h3 className="tab-title">Location</h3>

                      <p></p>
                      <div id="map">
                        <iframe
                          src={`https://maps.google.com/maps?q=${adData.latitude},${adData.longitude}&z=25&ie=UTF8&iwloc=&output=embed`}
                          width="100%"
                          height="400"
                          frameborder="0"
                          style={{"border":"0"}}
                          allowfullscreen
                        ></iframe>
                      </div>
                    </div>

                   
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="sidebar">
                <div className="widget price text-center">
                  <h4>Price</h4>
                  <p>₹ {adData.price}</p>
                </div>
                {/* <!-- User Profile widget --> */}
                <div className="widget user text-center">
                  <img
                    className="rounded-circle img-fluid mb-5 px-5"
                    src={`${BaseURLUser}images/dp/default.jpg`}
                    alt=""
                  />
                  <h4>
                    <a href="">{userData.name}</a>
                  </h4>
                    <a href="">{userData.number}</a>
                    <br></br>
                    <a href="">{userData.email}</a>

                  
                </div>
                
                
                {/* <!-- Safety tips widget --> */}
                <div className="widget disclaimer">
                  <h5 className="widget-header">Safety Tips</h5>
                  <ul>
                    <li>Meet seller at a public place</li>
                    <li>Check the item before you buy</li>
                    <li>Pay only after collecting the item</li>
                    <li>Pay only after collecting the item</li>
                  </ul>
                </div>
                {/* <!-- Coupon Widget --> */}
                <div className="widget coupon text-center">
                  {/* <!-- Coupon description --> */}
                  <p>
                    Have a great product to post ? Share it with your fellow
                    users.
                  </p>
                  {/* <!-- Submii button --> */}
                  <Link to="/AdPost" className="btn btn-transparent-white">
                    Submit Listing
                  </Link>
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
