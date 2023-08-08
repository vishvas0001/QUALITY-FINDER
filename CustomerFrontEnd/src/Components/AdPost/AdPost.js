import qs from "qs";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { BaseURLUser } from "../../Common/constants";
import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
export default function AdPost() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn")
  );
  var [lat, setLat] = useState("");
  var [long, setLong] = useState("");
  var [title, setTitle] = useState("");
  const saveTitle = (e) => {
    setTitle(e.target.value);
  };
  var [description, setDescription] = useState("");
  const saveDescription = (e) => {
    setDescription(e.target.value);
  };
  let [categories, setCategories] = useState([]);
  let [terms, setTerms] = useState(false);
  const [allstates, setAllStates] = useState([]);
  const [allcities, setallcities] = useState([]);
  let [state, setState] = useState("");
  let [city, setCity] = useState("");
  const saveCity = (e) => {
    setCity(e.target.value);
  };
  
  //getting all countries for country dropdown menu
  const getAllCountries = () => {
    axios
      .post("https://countriesnow.space/api/v0.1/countries/states", {
        country: "India",
      })
      .then((data) => {
        if (!data.data.error) {
          setAllStates(data.data.data.states);
        } else {
          //dangerNotify(data.data.message);
        }
      })
      .catch((erro) => console.log(erro));
    };
    useEffect(() => {
      //get all country functin call
      const fetchLocation=()=>{
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
          console.log("Error")
          }
      }
      
      function showPosition(position) {
        setLat(position.coords.latitude)  ;
        setLong(position.coords.longitude);
      }
      fetchLocation();
      getAllCountries();
}, []);
  const saveState = (e) => {
    setState(e.target.value);
    axios
      .post("https://countriesnow.space/api/v0.1/countries/state/cities", {
        country: "India",
        state: e.target.value,
      })
      .then((data) => {
        if (!data.data.error) {
          console.log("CITIES", data.data.data);
          setallcities(data.data.data);
        } else {
          //dangerNotify(data.data.message);
        }
      })
      .catch((erro) => console.log(erro));
  };


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
  if (
    isLoggedIn === false ||
    isLoggedIn === null ||
    isLoggedIn === undefined ||
    !sessionStorage.getItem("isLoggedIn") ||
    !sessionStorage.getItem("isLoggedIn") ===null ||
    !sessionStorage.getItem("isLoggedIn") === undefined
  ) {
    return <Navigate to="/login" />;
  }

  const onSaveForm = (e) => {
    e.preventDefault();
    if (!terms) {
      toast.error("Please Accept Terms and Conditions", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    let form = new FormData();
    if (!terms) {
      toast.error("Must Accept terms and conditions", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    form.append("user_id", sessionStorage.getItem("uinfoId"));
    form.append("title", title);
    form.append("description", e.target.description.value);
    form.append("cat_Id", e.target.category.value);
    // form.append("subCategory", e.target.subCategory.value);
    form.append("price", e.target.price.value);
    form.append("negotiable", true);
    form.append("featured", false);
    console.log(e.target.file.files);
    form.append("image", e.target.file.files[0]);
    form.append("userId", sessionStorage.getItem("userId"));
    form.append("lat", lat);
    form.append("long", long);
    form.append("state", state);
    form.append("city", city);
    console.log(form);
    axios
      .post(`${BaseURLUser}addPost`, form, {})
      .then((data) => {
        console.log(data);
        if (data.data.success) {
          toast.success(data.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        } else {
          toast.error(data.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ToastContainer />

      <section className="ad-post bg-gray py-5">
        <div className="container">
          <form
            action="#"
            onSubmit={onSaveForm}
            id="formtoSave"
            encType="multipart/form-data"
          >
            <fieldset className="border rounded shadow p-4 mb-5 bg-white">
              <div className="row">
                <div className="col-lg-12">
                  <h3>Post Your ad</h3>
                </div>

                <div className="col-lg-6">
                  <h6 className="font-weight-bold pt-4 pb-1">Title Of Ad:</h6>
                  <input
                    type="text"
                    onChange={saveTitle}
                    value={title}
                    name="title"
                    className=" border w-100 rounded form-control   text-capitalize"
                    placeholder="Ad title go There"
                    required
                  />
                  <h6 className="font-weight-bold pt-4 pb-1">Ad Type:</h6>
                  <div className="row px-3">
                    <div className="col-lg-4 mr-lg-4 my-2 rounded bg-white">
                      <input
                        type="radio"
                        name="itemName"
                        value="new"
                        id="new"
                      />
                      <label htmlFor="new" className="py-2 px-2">
                        New
                      </label>
                    </div>
                    <div className="col-lg-4 mr-lg-4 my-2 rounded bg-white ">
                      <input
                        type="radio"
                        name="itemName"
                        value="used"
                        id="used"
                      />
                      <label htmlFor="used" className="py-2 px-2">
                        Used
                      </label>
                    </div>
                  </div>
                  <h6 className="font-weight-bold pt-4 pb-1">Description:</h6>
                  <textarea
                    name="description"
                    id=""
                    className="border p-3 w-100"
                    rows="7"
                    placeholder="Write details about your product"
                    required
                  ></textarea>
                </div>
                <div className="col-lg-6">
                  <h6 className="font-weight-bold pt-4 pb-1">
                    Select Ad Category:
                  </h6>
                  <select
                    name="category"
                    id="inputGroupSelect"
                    className=" p-2 w-100"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((category, index) => (
                      <option key={index + 1} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="price">
                    <h6 className="font-weight-bold pt-4 pb-1">Item Price :</h6>
                    <div className="row px-3">
                      <div className="col-lg-4 mr-lg-4 rounded bg-white my-2 ">
                        <input
                          type="text"
                          name="price"
                          className="border-1 rounded py-2 w-100 price"
                          placeholder="Price"
                          id="price"
                        />
                      </div>
                      <div className="col-lg-4 mrx-4 rounded bg-white my-2 ">
                        <input
                          type="checkbox"
                          value="Negotiable"
                          id="Negotiable"
                          name="Negotiable"
                        />
                        <label htmlFor="Negotiable" className="py-2">
                          Negotiable
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="choose-file text-center my-4 py-4 rounded">
                    <label htmlFor="file-upload">
                      <h3>File Upload</h3>

                      <input
                        type="file"
                        className="form-control-file"
                        id="file-upload"
                        name="file"
                        multiple="multiple"
                      />
                    </label>
                  </div>
                  <select
                    onChange={saveState}
                    className="form-control border p-3 w-100 my-2"
                  >
                    {allstates.map((state, index) => (
                      <option key={index}>{state.name}</option>
                    ))}
                  </select>
                  <select
                    onChange={saveCity}
                    className="form-control border p-3 w-100 my-2"
                  >
                    {allcities.map((city, index) => (
                      <option key={index}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>
            </fieldset>
            {/* <!-- Post Your ad end --> */}

            {/* <!-- submit button --> */}
            <div className="checkbox d-inline-flex">
              <input
                type="checkbox"
                id="terms-&-condition"
                className="mt-1"
                onClick={() => {
                  setTerms(!terms);
                }}
              />
              <label htmlFor="terms-&-condition" className="ml-2">
                By click you must agree with our
                <span>
                  {" "}
                  <a className="text-successterms-condition" href="#">
                    Terms & Condition and Posting Rules.
                  </a>
                </span>
              </label>
            </div>
            <button type="submit" className="btn btn-primary d-block mt-2">
              Post Your Ad
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
