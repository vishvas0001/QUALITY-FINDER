const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1/finder")
  .then((conn) => {
    console.log("--DB connnected--");
  })
  .catch((err) => {
    console.log("--Error Occured--", err);
  });
