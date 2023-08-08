import { Component } from "react";
import axios from "axios";
import { BaseURLAdmin } from "../../Config/Constants";
import qs from "qs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Navigate} from "react-router-dom"

export default class ListUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      totalUsers: "",
      
    };
    
  }
  //refresh List Function
  refreshList= ()=>{
    axios
      .post(
        `${BaseURLAdmin}/listUsers`,
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
        this.setState({ users: data.data.users });
      });

  }
  //Block User Function
  blockUser=(userId,uinfoId)=>{
    let postData = {
      userId: userId,
      uinfoId: uinfoId,
    }
    axios.post(`${BaseURLAdmin}/blockUser`, qs.stringify(postData),{
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
    let postData={
      userId:userId,
      uinfoId:uinfoId
    }
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
  componentDidMount() {
    axios
      .post(
        `${BaseURLAdmin}/listUsers`,
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
        this.setState({ users: data.data.users });
      });
    
    axios
      .post(
        `${BaseURLAdmin}/countUsers`,
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            authorization: sessionStorage.getItem("token"),
          },
        }
      )
      .then((data) => {
        // console.log(data);
        this.setState({ totalUsers: data.data.count });
      });
  }

  render() {
    return (
      <>
        <ToastContainer   />
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <h1 className="h3 mb-2 text-gray-800">Users List</h1>

          {/* <!-- DataTales Example --> */}
          <div className="card shadow mb-4">
            <div className="card-header py-3"></div>
            <div className="card-body">
              <div className="table-responsive">
                <table
                  className="table table-bordered table-striped"
                  id="dataTable"
                  width="100%"
                  cellSpacing="0"
                >
                  <thead className="">
                    <tr>
                      <th>S.no</th>
                      <th>Name</th>
                      <th>E-mail</th>
                      <th>Phone-No</th>
                      <th>Status</th>
                      <th>Created-On</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.users.map((ele, index) => (
                      <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{ele.user_Id.name}</td>
                        <td>{ele.email}</td>
                        <td>{ele.user_Id.number}</td>
                        <td>{ele.isBlocked?"Blocked":"Active"}</td>
                        <td>{ele.createAt}</td>
                        <td>
                          <button
                            className="btn btn-danger p-1 mx-1"
                            onClick={() => {
                              this.deleteUser(ele._id, ele.user_Id._id);
                            }}
                          >
                            <i class="fas fa-trash"></i>
                          </button>
                          <button className="btn btn-warning p-1 mx-1" onClick={() => {ele.isBlocked?this.unblockUser(ele._id, ele.user_Id._id):this.blockUser(ele._id,ele.user_Id._id)}}>
                          {ele.isBlocked?<i class="fas fa-user-lock"></i>:<i class="fas fa-user-lock"></i>}

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
        {/* <!-- /.container-fluid --> */}
      </>
    );
  }
}
