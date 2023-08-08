import { Component } from "react";
import { Navigate } from "react-router-dom";
import { Router } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { BaseURLAdmin } from "../../Config/Constants";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCount: "",
      postCount: "",
      blockedCount:"",
      isLoggedIn: false,
    };
  }
  successNotify = () => {
    toast.success("Welcome Admin!", {
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

  componentDidMount() {
    //login setup
    this.state.isLoggedIn = sessionStorage.getItem("isLoggedIn");
    this.setState({ isLoggedIn: sessionStorage.getItem("isLoggedIn") });
    if (this.state.isLoggedIn) {
      this.successNotify();
    }
    //collecting dashboard data

    // user count
    let token= sessionStorage.getItem("token");

    axios
      .post(`${BaseURLAdmin}/countUsers`,  qs.stringify({}),{
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "authorization":sessionStorage.getItem("token")
        },
      })
      .then((data) => {
        // console.log(token); 
        // console.log(data);
        this.setState({
          userCount: data.data.count,
        });
      });
      // .catch((err) => console.log(err));

    
      // admin count
    axios
      .post(`${BaseURLAdmin}/countAdmins`,  qs.stringify({}),{
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "authorization":sessionStorage.getItem("token")
        },
      })
      .then((data) => {
        // console.log(token);
        // console.log(data);
        this.setState({
          adminCount: data.data.count,
        });
      })
      // .catch((err) => console.log(err));

      // blocked User count
      axios
      .post(`${BaseURLAdmin}/countBlockedUsers`,  qs.stringify({}),{
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "authorization":sessionStorage.getItem("token")
        },
      })
      .then((data) => {
        this.setState({
          blockedCount: data.data.count,
        });
      })
      // .catch((err) => console.log(err));

      
  }

  render() {
   
    return (
      <>
        <ToastContainer />
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
          </div>
          <div className="row">
            {/* user Count */}
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-lg font-weight-bold text-primary text-uppercase mb-1">
                        All Users
                      </div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                        {this.state.userCount}
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-user fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* admin Count */}
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-lg font-weight-bold text-primary text-uppercase mb-1">
                        All Admins
                      </div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                        {this.state.adminCount}
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-user-graduate fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Blocked users */}
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-secondary shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-lg font-weight-bold text-primary text-uppercase mb-1">
                        Blocked Users
                      </div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                        {this.state.blockedCount}
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-user-slash fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
