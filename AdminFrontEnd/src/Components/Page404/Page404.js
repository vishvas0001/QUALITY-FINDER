import { Component } from "react";
import { Link } from "react-router-dom";

export default class Page404 extends Component {
  render() {
    return (
      <>
        <div className="container-fluid mt-5">
          {/* <!-- 404 Error Text --> */}
          <div className="text-center ">
            <div className="error mx-auto " data-text="404">
              404
            </div>
            <p className="lead text-gray-800 mb-5">Page Not Found</p>
            <p className="text-gray-500 mb-0 display-4">
              It looks like you found a glitch in the matrix...
            </p>
            <Link to="/login" className="lead">&larr; Back to Dashboard</Link>
          </div>
        </div>
      </>
    );
  }
}
