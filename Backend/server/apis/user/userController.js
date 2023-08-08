const uinfoModel = require("../userinfo/uinfoModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("./userModel");
const salts = 10;
const SECRET = "finder";


//for user
exports.register = (req, res) => {
  if (
    req.body == undefined ||
    req.body.name == undefined ||
    req.body.name == "" ||
    req.body.email == undefined ||
    req.body.email == "" ||
    req.body.password == undefined ||
    req.body.password == ""
  ) {
    console.log(req.body);
    res.json({
      message: "Please fill the form",
      satus: 204,
      success: false,
    });
  } else {
    console.log(req.body);
    userModel.findOne({ email: req.body.email }).then((udata) => {
      if (udata != null) {
        if (udata.isBlocked == true) {
          res.json({
            message: "blocked",
            satus: 204,
            success: false,
          });
        } else {
          res.json({
            message: "User already exists with this email or phone",
            satus: 200,
            success: false,
          });
        }
      } else {
        let uinfoObj = new uinfoModel();
        uinfoObj.name = req.body.name;
        uinfoObj.email = req.body.email;
        uinfoObj.gender = req.body.gender;
        let dp = "public/images/dp/default.jpg";
        if(req.file!=undefined && req.file.filename!=undefined){
          dp = "public/images/dp/"+req.file.filename;
        }
        uinfoObj.profile = dp;
        uinfoObj.number = req.body.number;
        uinfoObj.state = req.body.state;
        uinfoObj.city = req.body.city;
        // uinfoObj.tags = req.body.gender;

        uinfoObj
          .save()
          .then((uobj) => {
            // console.log(uobj_)
            let userObj = new userModel();
            userObj.name = req.body.name;
            userObj.user_Id = uobj._id;
            let pass = bcrypt.hashSync(req.body.password, salts);

            userObj.password = pass;
            userObj.email = req.body.email;
            // userObj.tags = req.body.
            userObj
              .save()
              .then((data) => {
                res.json({
                  message: "Registered",
                  status: 200,
                  success: true,
                  user: uobj,
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
    });
  }
};
exports.countUsers = (req, res) => {};

//Login Api
exports.login = (req, res) => {
  if (
    req.body.email == undefined ||
    req.body.email == "" ||
    req.body.password == undefined ||
    req.body.password == ""
  ) {
    res.json({
      message: "Enter Email and Password",
      status: 200,
      success: false,
    });
  } else {
    userModel
      .findOne({ email: req.body.email })
      .then(async(uObj) => {
        if (uObj == null) {
          res.json({
            message: "Account not found",
            status: 200,
            success: false,
          });
        } else {
          if (uObj.isBlocked == true) {
            res.json({
              message: "Account blocked",
              status: 200,
              success: false,
            });
          } else {
            if (!bcrypt.compareSync(req.body.password, uObj.password)) {
              res.json({
                message: "Email-Password Not Match",
                status: 400,
                sucess: false,
              });
            } else {
              let payload = {
                _id: uObj._id,
                name: uObj.name,
                email: uObj.email,
                uType: uObj.uType,
                user_Id: uObj.user_Id,
              };
              let token = jwt.sign(payload, SECRET, {
                expiresIn: 60 * 60 * 24 * 365,
              });
              userData=await uinfoModel.findOne({ _id: uObj.user_Id }).exec();
              console.log(userData);
              res.json({
                message: "Login Successfull",
                status: 200,
                success: true,
                token: token,
                uinfo:userData,
                uid:uObj._id,
                
              });
            }
          }
        }
      })
      .catch((err) => {
        // console.log(err);
        res.json({
          message: "Error Login API",
          status: 500,
          success: false,
          err: String(err),
        });
      });
  }
};
//Login API for Admin
exports.AdminLogin = (req, res) => {
  if (
    req.body.email == undefined ||
    req.body.email == "" ||
    req.body.password == undefined ||
    req.body.password == ""
  ) {
    res.json({
      message: "Enter Email and Password",
      status: 200,
      success: false,
    });
  } else {
    userModel
      .findOne({ email: req.body.email })
      .then((uObj) => {
        if (uObj == null) {
          res.json({
            message: "Account not found",
            status: 200,
            success: false,
          });
        } else {
          if (uObj.isBlocked == true) {
            res.json({
              message: "Account blocked",
              status: 200,
              success: false,
            });
          } else {
            if (!bcrypt.compareSync(req.body.password, uObj.password)) {
              res.json({
                message: "Email-Password Not Match",
                status: 400,
                sucess: false,
              });
            } else {
              let payload = {
                _id: uObj._id,
                name: uObj.name,
                email: uObj.email,
                uType: uObj.uType,
                user_Id: uObj.user_Id,
              };
              let token = jwt.sign(payload, SECRET, {
                expiresIn: 60 * 60 * 24 * 365,
              });
              res.json({
                message: "Login Successfull",
                status: 200,
                success: true,
                token: token,
              });
            }
          }
        }
      })
      .catch((err) => {
        // console.log(err);
        res.json({
          message: "Error Login API",
          status: 500,
          success: false,
          err: String(err),
        });
      });
  }
};
//admin

exports.countUsers = (req, res) => {
  userModel.countDocuments({ uType: 0 }).then((data) => {
    res.json({
      message: "Count",
      status: 200,
      success: true,
      count: data,
    });
  });
};
exports.countAdmins = (req, res) => {
  userModel.countDocuments({ uType: 1 }).then((data) => {
    res.json({
      message: "Count",
      status: 200,
      success: true,
      count: data,
    });
  });
};

exports.countBlockedUsers = (req, res) => {
  userModel.countDocuments({ isBlocked: true }).then((data) => {
    res.json({
      message: "Count",
      status: 200,
      success: true,
      count: data,
    });
  });
};
//deleter user by admin
exports.deleteUser = (req, res) => {
  userModel.deleteOne({ _id: req.body.userId }).then((data) => {
    uinfoModel
      .deleteOne({ _id: req.body.uinfoId })
      .then((data) => {
        res.json({
          message: "User Deleted",
          status: 200,
          success: true,
        });
      })
      .catch((err) => {
        res.json({
          message: "Error while deleting",
          status: 500,
          success: false,
          error: String(err),
        });
      });
  });
};

//list Users
exports.listUsers = (req, res) => {
  userModel
    .find({ uType: 0 })
    .populate("user_Id")
    .then((data) => {
      res.json({
        message: "Users List",
        status: 200,
        success: true,
        users: data,
      });
    })

    .catch((err) =>
      res.json({
        message: "Error",
        status: 200,
        success: false,
      })
    );
};
//Block Users Admin
exports.blockUser = (req, res) => {
  userModel
    .updateOne({ _id: req.body.userId }, { isBlocked: true })
    .then((data) => {
      uinfoModel
        .updateOne({ _id: req.body.uinfoId }, { isBlocked: true })
        .then((data) => {
          res.json({
            message: "User Blocked",
            status: 200,
            success: true,
          });

        })
        .catch((err) => {
          userModel.updateOne({ _id: req.body.uinfoId }, { isBlocked: false });
          res.json({
            message: "Error while Blocking user",
            status: 500,
            success: false,
          })
        })
    })
    .catch((err) => {
      res.json({
        message: "Error while Blocking user",
        status: 500,
        success: false,
      })
    })
};

//Unblock User Admin
exports.unblockUser = (req, res) => {
  userModel
    .updateOne({ _id: req.body.userId }, { isBlocked: false })
    .then((data) => {
      uinfoModel
        .updateOne({ _id: req.body.uinfoId }, { isBlocked: false })
        .then((data) => {
          res.json({
            message: "User Un-Blocked",
            status: 200,
            success: true,
          });

        })
        .catch((err) => {
          userModel.updateOne({ _id: req.body.uinfoId }, { isBlocked: true });
          res.json({
            message: "Error while Un-Blocking user",
            status: 500,
            success: false,
          })
        })
    })
    .catch((err) => {
      res.json({
        message: "Error while Un-Blocking user",
        status: 500,
        success: false,
      })
    })
};

//list BBlocked Users
exports.listBlockedUsers = (req, res) => {
  userModel
    .find({ isBlocked: true })    
    .populate("user_Id")
    .then((data) => {
      res.json({
        message: "Blocked Users List",
        status: 200,
        success: true,
        users: data,
      });
    })

    .catch((err) =>
      res.json({
        message: "Error",
        status: 200,
        success: false,
      })
    );
};
//changing password
exports.updatePassword = (req, res) => {
  let pass = bcrypt.hashSync(req.body.password, salts);

  userModel.updateOne({ _id: req.body.id }, {$set: {password:pass}}).then((data) => {
    res.json({
      message: "Password Updated",
      status: 200,
      success: true,
    }); 
  }).catch(err=>{
    res.json({
      message: "Error",
      status: 500,
      success: false,
      error: String(err)
    })
  })
}
//updating user info name and phone number
exports.updateInfo=(req,res)=>{
  uinfoModel.updateOne({_id:req.body.id},{$set:{name:req.body.name,number:req.body.number}}).then((data)=>{ 
    res.json({
      message: "Info Updated",
      status: 200,
      success: true,
    })
  }).catch((err)=>{
      res.json({
        message: "Error",
        status: 500,
        success: false,
        error: String(err)
      })
    })
  
}



