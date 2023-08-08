import { Component } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { BaseURLAdmin } from "../../Config/Constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class AddCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
    };
  }
  
  submit = (e) => {
    e.preventDefault();
    let data = {
      name: this.state.title,
      description: this.state.description,
    };
    axios
      .post(`${BaseURLAdmin}/addCategory`, qs.stringify(data), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: sessionStorage.getItem("token"),
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
      this.setState({title:"",description:""})
  };
  render() {
    return (
      <>
        <ToastContainer />
        <div className="container text-center">
          <h1>AddCategories</h1>
          <div className="row justify-content-center mt-5">
            <form className="form col-8 shadow rounded p-5" onSubmit={this.submit}>
              <div className="col">
                <input
                  required
                  type="text"
                  className="form-control m-1"
                  placeholder="Name of Category"
                  value={this.state.title}
                  onChange={(e) => this.setState({ title: e.target.value })}
                />
              </div>
              <br />
              <div className="col">
                <textarea
                  required
                  rows="10"
                  className="form-control m-1"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                />
              </div>
              <div className="col">
                <button
                  type="submit"
                  className="btn btn-primary m-1"
                  
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
