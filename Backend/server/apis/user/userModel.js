var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
  user_Id: { type: mongoose.Schema.Types.ObjectId,ref : "uinfo", default: null },
  //0 for user, 1 for afdmin
  uType : {type: Number, default: 0},
      
  email: { type: String, default: ""},
  password: { type: String, default: "" },
  adCount: { type: Number, default: 0 },
  tags: { type: Array, default: [],  },
  isBlocked: { type: Boolean, default: false },
  createAt: { type: Date, default: Date.now() },
  updateAt: { type: Date },
});
var user = (module.exports = mongoose.model("user", userSchema));

