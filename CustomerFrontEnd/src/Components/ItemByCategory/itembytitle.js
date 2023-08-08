import axios from "axios";
import { useEffect, useState } from "react";
import { BaseURLUser } from "../../Common/constants";
import { Navigate, useParams, Link } from "react-router-dom";
import Card from "../Card/Card";
import "react-toastify/dist/ReactToastify.css";
import qs from "qs";

export default function ItemByTitle() {
  var [posts, setPosts] = useState([]);

  const linkParam = useParams();

  useEffect(() => {
    let postdata = {
    //   title: linkParam.title,
    //   cId: linkParam.cId,
    };
    if(linkParam.title!==undefined){   
        postdata.title = linkParam.title; 
    }
    if(linkParam.cId!==undefined){   
        postdata.cat_Id = linkParam.cId; 
    }
    console.log("Sarch",postdata);
    axios
      .post(`${BaseURLUser}searchPost`, qs.stringify(postdata), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      })
      .then((data) => {
        console.log("Search Data is ",data.data.post);
        setPosts(data.data.post);  
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
