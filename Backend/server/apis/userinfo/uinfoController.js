const uinfo = require("./uinfoModel");
const user = require("../user/userModel");

const bcrypt = require("bcrypt");

const salts = 10;
const SECRET = "finder";

exports.showuser = (req, res) => {
  uinfo
    .find()
    .then((data) => {
      res.json({
        message: "All Users",
        status: 200,
        success: true,
        student: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error in API",
        status: 500,
        success: false,
        error: String(err),
      });
    });
};
