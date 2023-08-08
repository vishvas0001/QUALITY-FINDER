import { Component } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { ToastContainer, toast } from "react-toastify";
import { BaseURLAdmin } from "../../Config/Constants";
import "react-toastify/dist/ReactToastify.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPass: false,
      remember: false,
      move: false,
    };
  }

  togglePass = () => {
    this.setState({
      showPass: !this.state.showPass,
    });
  };

  emailSave = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  passwordSave = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  dangerNotify = (data) => {
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

  successNotify = () => {
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

  submit = (e) => {
    
    
    e.preventDefault();
    let data = {
      email: this.state.email,
      password: this.state.password,
    };
    // console.log(data);
    let url = `${BaseURLAdmin}/login`;
    axios
      .post(url, qs.stringify(data), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((data) => {
        // console.log(data);
        if (data.data.success) {
          // this.successNotify();
          let token = data.data.token;
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("isLoggedIn", true);
          if(this.state.remember){
            localStorage.setItem("token", token);
            localStorage.setItem("isLoggedIn", true);
          }
          this.setState({
            move: true,
          });
        } else {
          this.dangerNotify(data.data.message);
        }
      });
    // .catch((err) => console.log(err));
  };
componentDidMount() {
  if(localStorage.getItem("isLoggedIn")){
    this.setState({
      move: true,
    });
    sessionStorage.setItem("token", localStorage.getItem("token"));
    sessionStorage.setItem("isLoggedIn", true);
  }
}
  render() {
    if (this.state.move || sessionStorage.getItem("isLoggedIn") || localStorage.getItem("isLoggedIn")) {
      return <Navigate to="/" />;
    }
    return (
      <>
        <div className="container ">
          {/* <!-- Outer Row --> */}
          <div className="row justify-content-center mt-5">
            <div className="col-xl-10 col-lg-12 col-md-9 mt-5">
              <div className="card o-hidden border-0 rounded shadow-lg my-5 ">
                <div className="card-body p-0">
                  {/* <!-- Nested Row within Card Body --> */}
                  <div className="row ">
                    <div className="col-lg-6 d-none d-lg-block bg-login-image "></div>
                    <div className="col-lg-6 p-5">
                      <div className="p-5">
                        <div className="text-center"> 
                          <h1 className="h4 text-gray-900 mb-4">Admin Login</h1>
                        </div>
                        <form className="user" onSubmit={this.submit}>
                          <div className="form-group">
                            <input
                              type="email"
                              value={this.state.email}
                              onChange={this.emailSave}
                              className="form-control form-control-user "
                              id="exampleInputEmail"
                              aria-describedby="emailHelp"
                              placeholder="Email"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <input
                              style={{ display: "inline" }}
                              type={this.state.showPass ? "text" : "password"}
                              value={this.state.password}
                              onChange={this.passwordSave}
                              className="form-control form-control-user"
                              id="exampleInputPassword"
                              placeholder="Password"
                              required
                            />
                            <i
                              className={
                                this.state.showPass
                                  ? "fas fa-eye-slash"
                                  : "fas fa-eye"
                              }
                              onClick={this.togglePass}
                              style={{
                                display: "inline",
                                position: "relative",
                                float: "left",
                                left: "233px",
                                bottom: "34px",
                              }}
                            ></i>
                          </div>
                          <div className="form-group">
                            <div className="custom-control custom-checkbox small">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck"
                                onClick={() => {
                                  this.setState({
                                    remember: !this.state.remember,
                                  });
                                }}
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck"
                              >
                                Remember Me
                              </label>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary btn-user btn-block"
                          >
                            Login
                          </button>
                          <hr />
                        </form>
                        <hr />
                        <div className="text-center">
                          <a className="small" href="forgot-password.html">
                            Forgot Password?
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </>
    );
  }
}
