const mongoose = require("mongoose");
const uinfoSchema = mongoose.Schema({
  name: { type: String, default: "" },
  profile: { type: String, default: "" },
  email: { type: String, default: "" },
  gender: { type: String, default: "" },
  state: { type: String, default: ""},
  city: { type: String, default: "" },
  number: { type: String, default: "" },
  isBlocked: { type: Boolean, default: false },  
  createAt: { type: Date, default: Date.now() },
  updateAt: { type: Date }
});
const uinfo = (module.exports = mongoose.model("uinfo", uinfoSchema));
