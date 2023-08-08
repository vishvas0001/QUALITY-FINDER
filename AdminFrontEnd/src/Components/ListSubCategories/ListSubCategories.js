import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BaseURLAdmin } from "../../Config/Constants";
import { Navigate, useParams, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import qs from "qs";

export default function ListSubCategories() {
  var [subCategories, setSubCategories] = useState([]);
  const linkParam = useParams();

  const refreshList = () => {
    axios
      .post(`${BaseURLAdmin}/listSubCategories`, qs.stringify(postdata), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          authorization: sessionStorage.getItem("token"),
        },
      })
      .then((data) => {
        setSubCategories(data.data.subCategories);
      });
  };

  const deleteSubCategory = (id) => {
    axios
      .post(`${BaseURLAdmin}/deleteSubCategory`, qs.stringify({ id }), {
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

          refreshList();
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

  var postdata = {
    cat_id: linkParam.id,
  };
  useEffect(() => {
    axios
      .post(`${BaseURLAdmin}/listSubCategories`, qs.stringify(postdata), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          authorization: sessionStorage.getItem("token"),
        },
      })
      .then((data) => {
        setSubCategories(data.data.subCategories);
      });
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        {/* <!-- DataTales Example --> */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold text-primary">
              List SubCategories of {linkParam.cat}
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
                    <th>Sub-Category Name</th>
                    <th>Description</th>
                    <th>Created-On</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subCategories.map((ele, index) => {
                    return (
                      <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{ele.name}</td>
                        <td>{ele.description}</td>
                        <td>{ele.createdAt}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              console.log("click");

                              deleteSubCategory(ele._id);
                            }}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
