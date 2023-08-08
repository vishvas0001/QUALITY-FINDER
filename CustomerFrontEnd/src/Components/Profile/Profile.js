import axios from "axios";
import qs from "qs";
import { BaseURLUser } from "../../Common/constants";
import { useState, useEffect } from "react";
export default function Profile() {
  var [img, setImg] = useState("");
  var [name, setName] = useState(sessionStorage.getItem("uname"));
  const saveName = (e) => {
    setName(e.target.value);
  };
  var [phone, setPhone] = useState(sessionStorage.getItem("phone"));
  const savePhone = (e) => {
    setPhone(e.target.value);
  };
  var [password, setPassword] = useState("");
  const savePass = (e) => {
    setPassword(e.target.value);
  };
  var [cPassword, setCPassword] = useState("");
  const saveCPass = (e) => {
    setCPassword(e.target.value);
  };
  let [showPass, setShowPass] = useState(false);
  let [showCPass, setShowCPass] = useState(false);

  const togglePass = () => {
    setShowPass(!showPass);
    // console.log(showPass);
  };
  const toggleCPass = () => {
    setShowCPass(!showCPass);
  };
  const updatePic=(e)=>{
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", img);

  }

  const updatePassword = (e) => {
    e.preventDefault();
    if (password === cPassword) {
      let data = {
        password: password,
        id: sessionStorage.getItem("Id"),
      };
      axios
        .post(`${BaseURLUser}updatePassword`, qs.stringify(data), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: sessionStorage.getItem("token"),
          },
        })
        .then((data) => {
          if (data.data.success) {
            alert("Password Changed");
          }
        });
    } else {
      alert("Password Not Matched");
    }
  };
  const updateInfo = (e)=>{
    e.preventDefault();
    if(sessionStorage.getItem("uname")===name && sessionStorage.getItem("phone")===phone){
      alert("No Changes Made");
    }
    else{
      let data={
        id:sessionStorage.getItem("uinfoId"),
        name:name,
        number:phone

      }
      axios.post(`${BaseURLUser}updateInfo`,qs.stringify(data),{
        headers:{"Content-Type":"application/x-www-form-urlencoded",Authorization:sessionStorage.getItem("token")}

      }).then((data)=>{
        if(data.data.success){
          sessionStorage.setItem("uname",name)
          sessionStorage.setItem("phone",phone)
          alert("Info Updated");
        }
      })
    }
  }
  return (
    <>
      <section className="user-profile section">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-lg-3 offset-lg-0">
              <div className="sidebar">
                {/* <!-- User Widget --> */}
                <div className="widget user">
                  {/* <!-- User Image --> */}
                  <div className="image d-flex justify-content-center">
                    <img src={`${BaseURLUser}images/dp/default.jpg`} alt="" className="" />
                  </div>
                  {/* <!-- User Name --> */}
                  <h5 className="text-center">
                    {sessionStorage.getItem("uname")}
                  </h5>
                </div>
                {/* <!-- Dashboard Links --> */}
                <div className="widget dashboard-links">
                  <ul>
                    <li>
                      <a className="my-1 d-inline-block" href="">
                        Savings Dashboard
                      </a>
                    </li>
                    <li>
                      <a className="my-1 d-inline-block" href="">
                        Saved Offer
                      </a>
                    </li>
                    <li>
                      <a className="my-1 d-inline-block" href="">
                        Favourite Stores
                      </a>
                    </li>
                    <li>
                      <a className="my-1 d-inline-block" href="">
                        Recommended
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-10 offset-md-1 col-lg-9 offset-lg-0">
              {/* <!-- Edit Profile Welcome Text --> */}
              <div className="widget welcome-message">
                <h2>Profile</h2>
              </div>
              {/* <!-- Edit Personal Info --> */}
              <div className="row">

              <div className="col-lg-6 col-md-6">
                  <div className="widget personal-info">
                    <h3 className="widget-header user">
                      Profile Picture
                    </h3>
                    <form action="#" onSubmit={updatePic}>
                      <input className="form-control border-0" type="file" />
                      
                      <button className="btn btn-transparent p-1">
                        Update Pic
                      </button>
                    </form>
                  </div>
                </div>
                
                <div className="col-lg-6 col-md-6">
                  <div className="widget personal-info">
                    <h3 className="widget-header user">
                      Edit Personal Information
                    </h3>
                    <form action="#" onSubmit={updateInfo}>
                      {/* <!-- New Password --> */}
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={saveName}
                          className="form-control"
                          id="name"
                        />
                      </div>
                      {/* <!-- number --> */}
                      <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                          value={phone}
                          type="number"
                          onChange={savePhone}
                          className="form-control"
                          id="phone"
                        />
                      </div>
                      {/* <!-- Submit Button --> */}
                      <button className="btn btn-transparent p-1">
                        Update Info
                      </button>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  {/* <!-- Change Password --> */}
                  <div className="widget change-password">
                    <h3 className="widget-header user">Edit Password</h3>
                    <form action="#" onSubmit={updatePassword}>
                      {/* <!-- New Password --> */}
                      <div className="form-group">
                        <label htmlFor="new-password">New Password</label>
                        <input
                          type={showPass ? "text" : "password"}
                          value={password}
                          onChange={savePass}
                          onDoubleClick={togglePass}
                          className="form-control rounded"
                          id="new-password"
                        />
                      </div>
                      {/* <!-- Confirm New Password --> */}
                      <div className="form-group">
                        <label htmlFor="confirm-password">
                          Confirm New Password
                        </label>
                        <input
                          value={cPassword}
                          type={showCPass ? "text" : "password"}
                          onChange={saveCPass}
                          onDoubleClick={toggleCPass}
                          className="form-control rounded"
                          id="confirm-password"
                        />
                      </div>
                      {/* <!-- Submit Button --> */}
                      <button className="btn btn-transparent p-2">
                        Change Password
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
