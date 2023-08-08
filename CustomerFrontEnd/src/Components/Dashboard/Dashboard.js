import axios from "axios";
import {useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import qs from "qs"
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {BaseURLUser} from "../../Common/constants";
// import { post } from "../../../../server/routes/adminRoutes";
export default function Dashboard() {
  var [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("isLoggedIn"));
  var [posts, setPosts] = useState([])
  useEffect(()=>{
    let postData={
      id:sessionStorage.getItem("uinfoId")
    }
    setIsLoggedIn(sessionStorage.getItem("isLoggedIn"));
    axios.post(`${BaseURLUser}myPosts`,qs.stringify(postData),{
      headers:{"Content-Type":"application/x-www-form-urlencoded",
      authorization:sessionStorage.getItem("token")}
    }).then(data=>{
      if(data.data.success){
        console.log("da",data)
        setPosts(data.data.post);
      }
      
    })

  },[])
  const refreshlist=()=>{
    let postData={
      id:sessionStorage.getItem("uinfoId")
    }
    setIsLoggedIn(sessionStorage.getItem("isLoggedIn"));
    axios.post(`${BaseURLUser}myPosts`,qs.stringify(),{
      headers:{"Content-Type":"application/x-www-form-urlencoded",
      authorization:sessionStorage.getItem("token")}
    }).then(data=>{
      if(data.data.success){
        console.log(data)
        setPosts(data.data.post);
      }
      
    })

  }
  if(!isLoggedIn || isLoggedIn == undefined || isLoggedIn == null){
    return(<Navigate to="/dashboard"/>)
  }
  const deletePost =(Id)=>{
    let postData = {
      id: Id,
    };
    axios
      .post(`${BaseURLUser}deletePost`, qs.stringify(postData), {
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

  }


  

  
  return (
    <>
    <ToastContainer />
      <section className="dashboard section">
        {/* <!-- Container Start --> */}
        <div className="container">
          {/* <!-- Row Start --> */}
          <div className="row">
            <div className="col-md-10 offset-md-1 col-lg-4 offset-lg-0">
              <div className="sidebar">
                {/* <!-- User Widget --> */}
                <div className="widget user-dashboard-profile">
                  {/* <!-- User Image --> */}
                  <div className="profile-thumb">
                    <img
                      src="images/user/user-thumb.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                  </div>
                  {/* <!-- User Name --> */}
                  <h5 className="text-center">{sessionStorage.getItem("uname")}</h5>
                  <p>Joined February 06, 2022</p>
                  <Link to ="/profile" href="user-profile.html" className="btn btn-main-sm">
                    Edit Profile
                  </Link>
                </div>
                {/* <!-- Dashboard Links --> */}
                <div className="widget user-dashboard-menu">
                  <ul>
                    <li className="active">
                      <a >
                        <i className="fa fa-user"></i> My Ads
                      </a>
                    </li>
                   
                  </ul>
                </div>

              
              </div>
            </div>
            <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-0">
              <div className="widget dashboard-container my-adslist">
                <h3 className="widget-header">My Ads</h3>
                <table className="table table-responsive product-dashboard-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Title</th>
                      <th className="text-center">Category</th>
                    </tr>
                  </thead>
                  <tbody>
              {posts.map((post,index)=>(

                     <tr key ={index+1}>
                      <td className="product-thumb">
                        <img
                          width="80px"
                          height="auto"
                          src={`${BaseURLUser}images/post/${post.imgs}`}
                          alt="image description"
                        />
                      </td>
                      <td className="product-details">
                        <h3 className="title">{post.title}</h3>
                        
                        <span>
                          <strong>Posted on: </strong>
                          <time>{post.createAt}</time>{" "}
                        </span>
                        <span className="status active">
                          <strong>Status</strong>Active
                        </span>
                        <span className="location">
                          <strong>Location</strong>{post.city},{post.state}
                        </span>
                      </td>
                      <td className="product-category">
                        <span className="categories">{post?.cat_Id?.name}</span>
                      </td>
                    </tr>))}
                    
                  </tbody>
                </table>
              </div>

              
            </div>
          </div>
          {/* <!-- Row End --> */}
        </div>
        {/* <!-- Container End --> */}
      </section>
    </>
  );
}
