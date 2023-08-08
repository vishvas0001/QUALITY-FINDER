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
      categories: [],
      totalCategories: "",
    };
  }
  refreshList=()=>{
    axios
      .post(
        `${BaseURLAdmin}/listCategories`,
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
        this.setState({ categories: data.data.categories });
      });

  }
  
  //delete category function
  deleteCategory = (catId) => {
    let postData = {
      catId:catId
    };
    axios
      .post(`${BaseURLAdmin}/deleteCategory`, qs.stringify(postData), {
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
        `${BaseURLAdmin}/listCategories`,
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
        this.setState({ categories: data.data.categories });
      });
  }

  render() {
    return (
      <><ToastContainer/>
        <div className="container-fluid">
          {/* <!-- DataTales Example --> */}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h5 className="m-0 font-weight-bold text-primary">
                List Categories
              </h5>
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
                      <th>Category Name</th>
                      <th>Description</th>
                      <th>Created-On</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.categories.map((ele, index) => (
                      <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>
                          <Link to={{pathname:`/listsubcategory/${ele._id}/${ele.name}`, state:this.state}} params={{catId:ele._id}}>{ele.name}</Link>
                        </td>
                        <td>{ele.description}</td>
                        <td>{ele.createdAt}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              this.deleteCategory(ele._id);
                            }}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                          <Link
                          to={{pathname:`/addSubCategory/${ele._id}/${ele.name}`, state:this.state}}
                          className="btn btn-primary"
                          >
                            <i className="fas fa-plus"></i>

                          </Link>
                         
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
