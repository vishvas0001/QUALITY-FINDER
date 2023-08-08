export default function About() {
  return (
    <>
      <section className="page-title">
        {/* <!-- Container Start --> */}
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2 text-center">
              {/* <!-- Title text --> */}
              <h3>About Us</h3>
            </div>
          </div>
        </div>
        {/* <!-- Container End --> */}
      </section>

      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-img">
                <img
                  src="/assets/images/about/about.jpg"
                  className="img-fluid w-100 rounded"
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-6 pt-5 pt-lg-0">
              <div className="about-content">
                <h3 className="font-weight-bold">Introduction</h3>
                <p>
                Finder is a web-based application that provides a platform for its users to sell and purchase 
                the products listed by other users, basically it is the form of the user-to-user business model.
                </p>
                <h3 className="font-weight-bold">How we can help</h3>
                <p>
                Our objective is to provide the user with an interacting platform where they can sell / purchase products from to other users independently. 
                It provides high level of security by providing authentication for the users of the system

                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading text-center text-capitalize font-weight-bold py-5">
                <h2>our team</h2>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="card my-3 my-lg-0">
                <img
                  className="card-img-top img-fluid w-100"
                  src="/assets/images/team/team1.jpg"
                  alt="Card image cap"
                />
                <div className="card-body bg-gray text-center">
                  <h5 className="card-title">John Doe</h5>
                  <p className="card-text">Founder / CEO</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="card my-3 my-lg-0">
                <img
                  className="card-img-top img-fluid w-100"
                  src="/assets/images/team/team2.jpg"
                  alt="Card image cap"
                />
                <div className="card-body bg-gray text-center">
                  <h5 className="card-title">John Doe</h5>
                  <p className="card-text">Founder / CEO</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="card my-3 my-lg-0">
                <img
                  className="card-img-top img-fluid w-100"
                  src="/assets/images/team/team3.jpg"
                  alt="Card image cap"
                />
                <div className="card-body bg-gray text-center">
                  <h5 className="card-title">John Doe</h5>
                  <p className="card-text">Founder / CEO</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="card my-3 my-lg-0">
                <img
                  className="card-img-top img-fluid w-100"
                  src="/assets/images/team/team4.jpg"
                  alt="Card image cap"
                />
                <div className="card-body bg-gray text-center">
                  <h5 className="card-title">John Doe</h5>
                  <p className="card-text">Founder / CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-6 my-lg-0 my-3">
              <div className="counter-content text-center bg-light py-4 rounded">
                <i className="fa fa-smile-o d-block"></i>
                <span className="counter my-2 d-block" data-count="2314">
                  0
                </span>
                <h5>Happy Customers</h5>
                {/* </script> */}
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 my-lg-0 my-3">
              <div className="counter-content text-center bg-light py-4 rounded">
                <i className="fa fa-user-o d-block"></i>
                <span className="counter my-2 d-block" data-count="1013">
                  0
                </span>
                <h5>Active Members</h5>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 my-lg-0 my-3">
              <div className="counter-content text-center bg-light py-4 rounded">
                <i className="fa fa-bookmark-o d-block"></i>
                <span className="counter my-2 d-block" data-count="2413">
                  0
                </span>
                <h5>Verified Ads</h5>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 my-lg-0 my-3">
              <div className="counter-content text-center bg-light py-4 rounded">
                <i className="fa fa-smile-o d-block"></i>
                <span className="counter my-2 d-block" data-count="200">
                  0
                </span>
                <h5>Happy Customers</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
