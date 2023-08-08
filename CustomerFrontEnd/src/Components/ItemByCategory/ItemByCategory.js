import axios from "axios";
import { useEffect, useState } from "react";
import { BaseURLUser } from "../../Common/constants";
import { Navigate, useParams, Link } from "react-router-dom";
import Card from "../Card/Card";
import "react-toastify/dist/ReactToastify.css";
import qs from "qs";

export default function ItemByCategory() {
  var [posts, setPosts] = useState([]);

  const linkParam = useParams();

  useEffect(() => {
    let postdata = {
      id: linkParam.id,
    };
    axios
      .post(`${BaseURLUser}listPostsByCategory`, qs.stringify(postdata), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          authorization: sessionStorage.getItem("token"),
        },
      })
      .then((data) => {
        console.log(data);
        setPosts(data.data.posts);
      });
  }, []);
  return (
    <>
      <div className="container min-vh-100">
        <div className="row justify-content-center">
          {posts.length === 0 ? <h1>No Posts</h1> : null}
          {posts.map((ele, index) => (
           <Card  key={index+1} price={ele.price} name={ele.title} img={ele.imgs[0]} des={ele.description} id={ele._id}/> 
          ))}
        </div>
      </div>
    </>
  );
}
