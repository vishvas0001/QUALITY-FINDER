const postModel = require("./postModel");

exports.addpost = (req, res) => {
  if (
    req.body.title == undefined ||
    req.body.title == "" ||
    req.body.description == undefined ||
    req.body.description == ""
  ) {
    res.json({
      message: "Please fill the form",
      status: 204,
      success: false,
    });
  } else {
    let postObj = new postModel();
    postObj.user_Id = req.body.user_id;
    postObj.title = req.body.title;
    postObj.description = req.body.description;
    postObj.price = req.body.price;
    postObj.negotiable = req.body.negotiable;
    postObj.featured = req.body.featured;
    postObj.cat_Id = req.body.cat_Id;
    // postObj.subCat_Id = req.body.subCat_Id;
    // postObj.latitude = req.body.lat != undefined ? req.body.lat : 0;
    // postObj.longitude = req.body.long != undefined ? req.body.long : 0;
    postObj.state = req.body.state;
    postObj.city = req.body.city;
    let post = "public/images/post/default.jpg";
    if (req.files != undefined) {
      req.files.forEach((file) => {
        postObj.imgs.push(file.filename);
      });
      // post = "public/images/post/"+req.file.filename;
    }

    // postObj.imgs = req.body.imgs;
    postObj
      .save()
      .then((data) => {
        res.json({
          message: "Post Added",
          status: 200,
          success: true,
          post: data,
        });
      })
      .catch((err) => {
        res.json({
          message: "Error while adding",
          status: 500,
          success: false,
          error: String(err),
        });
      });
  }
};

exports.searchPost = (req, res) => {
  let finder = {};
  if (req.body.title != undefined) {
    let f = `/${req.body.title}/`;
    finder = { title: { $regex: req.body.title, $options: "i" } };
  } //.*m.*/
  if (req.body.title != undefined && req.body.cat_Id != undefined) {
    finder = {
      $and: [
        { title: { $regex: req.body.title, $options: "i" } },
        { cat_Id: req.body.cat_Id },
      ],
    };
  }
  console.log(JSON.stringify(finder))
  postModel.find(finder).then((data) => {
    res.json({
      message: "Post Found",
      status: 200,
      success: true,
      post: data,
    });
  });
};
exports.listPosts = (req, res) => {
  let find={}
  limit=1000000
  if(req.body!= undefined )
    find = req.body
  if(req.body!=undefined && req.body.start!= undefined){
    limit=10
    delete find.start
  }

  postModel
    .find(find)
    .populate("user_Id")
    .then((data) => {
      res.json({
        message: "All Posts",
        status: 200,
        success: true,
        post: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error while adding",
        status: 500,
        success: false,
        error: String(err),
      });
    });
};

exports.deletePost = (req, res) => {
  postModel
    .deleteOne({ _id: req.body.id })
    .then((data) => {
      res.json({
        message: "Post Deleted",
        status: 200,
        success: true,
        post: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error while deleting post",
        status: 500,
        success: false,
        error: String(err),
      });
    });
};
exports.listPostsByCategory = (req, res) => {
  postModel
    .find({ cat_Id: req.body.id })
    .then((data) => {
      res.json({
        message: "All Posts",
        status: 200,
        success: true,
        posts: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error while adding",
        status: 500,
        success: false,
        error: String(err),
      });
    });
};

exports.viewPost = (req, res) => {
  postModel
    .findOne({ _id: req.body.id })
    .populate("user_Id")
    .populate("cat_Id")
    .then((data) => {
      res.json({
        message: "Post Found",
        status: 200,
        success: true,
        post: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error while adding",
        status: 500,
        success: false,
        error: String(err),
      });
    });
};

exports.makeFeatured = (req, res) => {
  postModel
    .updateOne({ _id: req.body.id }, { $set: { featured: true } })
    .then((data) => {
      res.json({
        message: "Post Featured",
        status: 200,
        success: true,
        post: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error while featuring",
        status: 500,
        success: false,
        error: String(err),
      });
    });
};

exports.myPosts = (req, res) => {
  postModel
    .find({ user_Id: req.body.id })
    .populate("cat_Id")
    .then((data) => {
      res.json({
        message: "All Posts",
        status: 200,
        success: true,
        post: data,
      });
    }).catch(err=>{
      res.json({
        message: "Error while adding",
        status: 500,
        success: false,
        error: String(err),
      });
    })
}
