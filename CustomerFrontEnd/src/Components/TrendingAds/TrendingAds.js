import {Link} from "react-router-dom";
import Card  from "../Card/Card";
import {BaseURLUser} from "../../Common/constants";
import {useEffect, useState} from "react";
import axios from "axios";
import qs from "qs";

export default function TrendingAds() {
	var [posts, setPosts] = useState([]);


  useEffect(() => {
	  let postdata={
		featured:true,
		start:0
	  }
    axios
      .post(`${BaseURLUser}listPosts`, qs.stringify(postdata), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      })
      .then((data) => {
        console.log("DATA",data);
        setPosts(data.data.post);
      });
  }, []);
  return (
    <>
    <section className="popular-deals section bg-grey">
				
		<div className="container-fluid">
			<div className="row justify-content-center">
				<div className="col-md-10">
					<div className="section-title">
						<h2>Featured Ads</h2>
						<p>Some Trending Advertisement.</p>
					</div>
				</div>
			</div>
			<div className="row justify-content-center pl-5 pr-5">
				
				{/* <!-- offer 01 --> */}
				 
					
				{posts.length === 0 ? <h1>No Posts</h1> : null}
					{posts.map((ele, index) => (
					<Card  key={index+1} price={ele.price} name={ele.title} img={ele.imgs[0]} des={ele.description} id={ele._id}/> 
				))}
									



						
					

				
			</div>
		</div>
	</section>

    </>
  );
}
