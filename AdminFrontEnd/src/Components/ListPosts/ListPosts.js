import { Component } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BaseURLAdmin } from "../../Config/Constants";

export default class ListCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      totalPosts: "",
    };
  }
  makeFeatured=(Id)=>{
    let postData={
      id:Id,
    }
    axios.post(`${BaseURLAdmin}/makeFeatured`,qs.stringify(postData),{
      headers:{"Content-Type":"application/x-www-form-urlencoded",authorization:sessionStorage.getItem("token")}
    }).then(data=>{
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
    })
  }
  refreshList = () => {
    axios
      .post(
        `${BaseURLAdmin}/listPosts`,
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            authorization: sessionStorage.getItem("token"),
          }
        }
      )
      .then((data) => {
        console.log(data);
        this.setState({ posts: data.data.post });
      });
  };

  //delete category function
  deletePost = (Id) => {
    let postData = {
      id: Id,
    };
    axios
      .post(`${BaseURLAdmin}/deletePost`, qs.stringify(postData), {
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
        `${BaseURLAdmin}/listPosts`,
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
        this.setState({ posts: data.data.post });
      });
  }

  render() {
    return (
      <>
        <ToastContainer />
        <div className="container-fluid">
          {/* <!-- DataTales Example --> */}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h5 className="m-0 font-weight-bold text-primary">List Posts</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table
                  className="table table-bordered"
                  id="dataTable"
                  width="100%"
                  cellSpacing="0"
                >
                  <thead>
                    <tr>
                      <th>S.no</th>
                      <th>Post Title</th>
                      <th>Description</th>
                      <th>Posted-By</th>
                      <th>Created-On</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.posts.map((ele, index) => (
                      <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{ele.title}</td>
                        <td>{ele.description}</td>
                        <td>{ele.user_Id.name}</td>
                        <td>{ele.createAt}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              this.deletePost(ele._id);
                            }}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              this.makeFeatured(ele._id);
                            }}
                          >
                            <i className="fas fa-star"></i>
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
