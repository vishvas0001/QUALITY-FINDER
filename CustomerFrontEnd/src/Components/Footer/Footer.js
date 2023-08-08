export default function Footer() {
  return (
    <>
      <footer className="footer section section-sm">
        {/* <!-- Container Start --> */}
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-7 offset-md-1 offset-lg-0">
              {/* <!-- About --> */}
              <div className="block about">
                {/* <!-- footer logo --> */}
                <img src="assets/images/footer-logo.png" height="100"  alt="" />
                {/* <!-- description --> */}
                <p className="alt-color">
                Finder is a web-based application that provides a platform for its users to sell and purchase
                 the products listed by other users, basically it is the form of the user-to-user business model.
                </p>
              </div>
            </div>
            {/* <!-- Link list --> */}
            <div className="col-lg-2 offset-lg-1 col-md-3">
              <div className="block">
                <h4>Site Pages</h4>
                <ul>
                  <li>
                    <a href="#">Boston</a>
                  </li>
                  <li>
                    <a href="#">How It works</a>
                  </li>
                  <li>
                    <a href="#">Deals & Coupons</a>
                  </li>
                  <li>
                    <a href="#">Articls & Tips</a>
                  </li>
                  <li>
                    <a href="terms-condition.html">Terms & Conditions</a>
                  </li>
                </ul>
              </div>
            </div>
            {/* <!-- Link list --> */}
            <div className="col-lg-2 col-md-3 offset-md-1 offset-lg-0">
              <div className="block">
                <h4>Admin Pages</h4>
                <ul>
                  <li>
                    <a href="category.html">Category</a>
                  </li>
                  <li>
                    <a href="single.html">Single Page</a>
                  </li>
                  <li>
                    <a href="store.html">Store Single</a>
                  </li>
                  <li>
                    <a href="single-blog.html">Single Post</a>
                  </li>
                  <li>
                    <a href="blog.html">Blog</a>
                  </li>
                </ul>
              </div>
            </div>
            {/* <!-- Promotion --> */}
            <div className="col-lg-4 col-md-7">
              {/* <!-- App promotion --> */}
              <div className="block-2 app-promotion">
                <div className="mobile d-flex">
                  <a href="">
                    {/* <!-- Icon --> */}
                    <img src="assets/images/footer/phone-icon.png" alt="mobile-icon" />
                  </a>
                  <p>Get the Dealsy Mobile App and Save more</p>
                </div>
                <div className="download-btn d-flex my-3">
                  <a href="#">
                    <img
                      src="/assets/images/apps/google-play-store.png"
                      className="img-fluid"
                      alt=""
                    />
                  </a>
                  <a href="#" className=" ml-3">
                    <img
                      src="/assets/images/apps/apple-app-store.png"
                      className="img-fluid"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Container End --> */}
      </footer>
      {/* <!-- Footer Bottom --> */}
      <footer className="footer-bottom">
        {/* <!-- Container Start --> */}
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-12">
              {/* <!-- Copyright --> */}
              <div className="copyright">
                <p>
                  Copyright ©{" "}
                  <script>
                    var CurrentYear = new Date().getFullYear()
                    document.write(CurrentYear)
                  </script>
                  . All Rights Reserved, theme by{" "}
                  <a
                    className="text-primary"
                    href="https://google.com"
                    target="_blank"
                  >
                    Apni Company, Inc.
                  </a>
                </p>
              </div>
            </div>
            <div className="col-sm-6 col-12">
              {/* <!-- Social Icons --> */}
              <ul className="social-media-icons text-right">
                <li>
                  <a
                    className="fa fa-facebook"
                    href="https://www.google.com"
                    target="_blank"
                  ></a>
                </li>
                <li>
                  <a
                    className="fa fa-twitter"
                    href="https://www.google.com"
                    target="_blank"
                  ></a>
                </li>
                <li>
                  <a
                    className="fa fa-pinterest-p"
                    href="https://www.google.com"
                    target="_blank"
                  ></a>
                </li>
                <li>
                  <a className="fa fa-vimeo" href=""></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <!-- Container End --> */}
        {/* <!-- To Top --> */}
        <div className="top-to">
          <a id="top" className="" href="#">
            <i className="fa fa-angle-up"></i>
          </a>
        </div>
      </footer>
    </>
  );
}
