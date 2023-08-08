import { Component } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import qs from "qs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BaseURLAdmin } from "../../Config/Constants";

export default function AddSubCategory() {
  const linkParam=useParams();
  
  let [title, setTitle] = useState("");
  const saveTitle = (e) => {
    setTitle(e.target.value);
  };
  let [description, setDescription] = useState("");
  const saveDescription = (e) => {
    setDescription(e.target.value);
  };
  

  const submit = (e) => {
    e.preventDefault();
    let postdata = {
      name: title,
      description: description,
      cat_Id: linkParam.id
    };
    axios
      .post(`${BaseURLAdmin}/addSubCategory`, qs.stringify(postdata), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          authorization: sessionStorage.getItem("token"),
        },
      })
      .then((data) => {
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
        setTitle("");
        setDescription("");
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
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="container text-center">
        <h1>Add SubCategory</h1>
        <div className="row justify-content-center mt-5">
          <form className="form col-8 shadow rounded p-5" onSubmit={submit}>
            <div className="col text-center mb-4">
              <h4>{linkParam.cat}</h4>
            </div>
            <div className="col">
              <input
                required
                type="text"
                className="form-control m-1"
                placeholder="Name of Category"
                value={title}
                onChange={saveTitle}
              />
            </div>
            <br />
            <div className="col">
              <textarea
                required
                rows="10"
                className="form-control m-1"
                placeholder="Description"
                value={description}
                onChange={
                  saveDescription
                }
              />
            </div>
            <div className="col">
              <button type="submit" className="btn btn-primary m-1">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
