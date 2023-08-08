import { Component } from "react";
import axios from "axios";
import { BaseURLAdmin } from "../../Config/Constants";
import qs from "qs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";

export default class BlockedUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockedUsers: [],
      totalBlockedUsers: "",
    };
  }
  //unblock User Function
  unblockUser=(userId,uinfoId)=>{
    let postData = {
      userId: userId,
      uinfoId: uinfoId,
    }
    axios.post(`${BaseURLAdmin}/unblockUser`, qs.stringify(postData),{
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authorization: sessionStorage.getItem("token"),
      }
    })
    .then((data)=>{
      if(data.data.success){
      toast.success(data.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      this.refreshList();
    }
    else{
      toast.error(data.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    })
  }

  //delete User Function
  deleteUser = (userId, uinfoId) => {
    let postData = {
      userId: userId,
      uinfoId: uinfoId,
    };
    axios
      .post(`${BaseURLAdmin}/deleteUser`, qs.stringify(postData), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          authorization: sessionStorage.getItem("token"),
        },
      })
      .then((data) => {
        if (data.data.success) {
          toast.success(data.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          this.refreshList();
        } else {
          toast.error(data.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  };
  refreshList = () => {
    axios
      .post(
        `${BaseURLAdmin}/listBlockedUsers`,
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            authorization: sessionStorage.getItem("token"),
          },
        }
      )
      .then((data) => {
        console.log(data);
        this.setState({ blockedUsers: data.data.users });
      });
  };

  componentDidMount() {
    axios
      .post(
        `${BaseURLAdmin}/listBlockedUsers`,
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            authorization: sessionStorage.getItem("token"),
          },
        }
      )
      .then((data) => {
        console.log(data);
        this.setState({ blockedUsers: data.data.users });
        this.setState({ totalBlockedUsers: data.data.count });
      });
  }
  render() {
    return (
      <>
        <ToastContainer />
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <h1 className="h3 mb-2 text-gray-800">Tables</h1>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                DataTables Example
              </h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table
                  className="table table-bordered"
                  id="dataTable"
                  width="100%"
                  cellpacing="0"
                >
                  <thead>
                    <tr>
                      <th>S.no</th>
                      <th>Name</th>
                      <th>E-mail</th>
                      <th>Phone-No</th>
                      <th>Total-Ads</th>
                      <th>Status</th>
                      <th>Created-On</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.blockedUsers.map((user, index) => (
                    <tr key={index+1}>
                      <td>{index +1}</td>
                      <td>{user.user_Id.name}</td>
                      <td>{user.email}</td>
                      <td>{user.user_Id.name}</td>
                      <td>{user.adCount}</td>
                      <td>{user.isBlocked?"Blocked":"Active"}</td>
                      <td>{user.createdAt}</td> 
                      <td>
                      <button
                            className="btn btn-danger p-1 mx-1"
                            onClick={() => {
                              this.deleteUser(user._id, user.user_Id._id);
                            }}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                          <button className="btn btn-warning p-1 mx-1" onClick={() => {user.isBlocked?this.unblockUser(user._id, user.user_Id._id):this.blockUser(user._id,user.user_Id._id)}}>
                          <i className="fas fa-user-lock"></i>

                          </button>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
