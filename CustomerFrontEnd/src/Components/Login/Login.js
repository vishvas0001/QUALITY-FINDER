import { Link, Navigate } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import qs from "qs";
import "react-toastify/dist/ReactToastify.css";
import { isLoggedin } from "../../Common/constants";
export default function Login() {
  let [email, setEmail] = useState("");
  const saveEmail = (e) => {
    setEmail(e.target.value);
  };
  let [password, setPassword] = useState("");
  const savePassword = (e) => {
    setPassword(e.target.value);
  };
  let [remember, setRemember] = useState(false);
  let [showPass, setShowPass] = useState(false);
  const togglePass = () => {
    setShowPass(!showPass);
    console.log(showPass);
  };
  let [move, setMove] = useState(false);

  const dangerNotify = (data) => {
    toast.error(data, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const successNotify = () => {
    toast.success("Login Succesfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      setMove(true);
      sessionStorage.setItem("isLoggedIn", true);
      sessionStorage.setItem("token", localStorage.getItem("token"));
      sessionStorage.setItem("uname", localStorage.getItem("uname"));
      sessionStorage.setItem("phone", localStorage.getItem("phone"));
      sessionStorage.setItem("Id", localStorage.getItem("Id"));
      sessionStorage.setItem("token", localStorage.getItem("token"));
      
      sessionStorage.setItem("uinfoId", localStorage.getItem("uinfoId"));
    }
  }, []);

  

  const Login = (e) => {
    e.preventDefault();
    // console.log(email, password);

    let postData = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:8080/login", qs.stringify(postData), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((data) => {
        // console.log(data);
        if (data.data.success) {
          console.log(data);
          let token = data.data.token;
          successNotify();
          sessionStorage.setItem("isLoggedIn", true);
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("phone", data.data.uinfo.number);

          sessionStorage.setItem("uinfoId", data.data.uinfo._id);

          sessionStorage.setItem("uname", data.data.uinfo.name);
          sessionStorage.setItem("Id", data.data.uid);
          sessionStorage.setItem("dp", data.data.uinfo.dp);

          setMove(true);
          if (remember) {
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("token", token);
            localStorage.setItem("email", email);
            localStorage.setItem("phone", data.data.uinfo.number);
            localStorage.setItem("uname", data.data.uinfo.name);
            localStorage.setItem("uinfoId", data.data.uinfo._id);

            localStorage.setItem("Id", data.data.uid);
            localStorage.setItem("dp", data.data.uinfo.dp);
          }
        } else {
          dangerNotify(data.data.message);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  if (move || sessionStorage.getItem("isLoggedIn")) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <section className="login py-5 border-top-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-8 align-item-center">
              <div className="border shadow rounded mt-5">
                <h3 className="bg-gray p-4">Login Now</h3>
                <form action="" onSubmit={Login}>
                  <fieldset className="p-5">
                    <Link to="/">
                      <i className="fas fa-home"></i> Home
                    </Link>
                    <input
                      type="text"
                      placeholder="Enter Email"
                      className="form-control border p-3 w-100 my-2 rounded"
                      value={email}
                      onChange={saveEmail}
                    />
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Enter Password"
                      className="form-control border p-3 w-100 my-2 rounded"
                      value={password}
                      onChange={savePassword}
                      onDoubleClick={togglePass}
                    />
                    <i
                      className={showPass ? "fas fa-eye-slash" : "fas fa-eye"}
                      onClick={() => {
                        setShowPass(!showPass);
                        console.log(showPass);
                      }}
                      style={{
                        position: "relative",
                        float: "right",
                        top: "-40px",
                        right: "18px",
                      }}
                    ></i>
                    <div className="loggedin-forgot d-inline-flex my-0">
                      <input
                        type="checkbox"
                        value="True"
                        id="registering"
                        className="mt-1"
                        onClick={() => {
                          if (remember === "true") {
                            setRemember("false");
                          } else {
                            setRemember("true");
                          }
                        }}
                      />
                      <label htmlFor="registering" className="px-2">
                        Remember Me.
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="form-control d-block py-2 px-5 bg-primary text-white border-0 rounded font-weight-bold mt-3"
                      onClick={Login}
                    >
                      Log in
                    </button>

                    {/* <a className="mt-3 d-block  text-primary" href="#">
                      Forget Password?
                    </a> */}
                    <Link
                      className="mt-3 d-inline-block text-primary"
                      to="/register"
                    >
                      Register Now
                    </Link>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}
