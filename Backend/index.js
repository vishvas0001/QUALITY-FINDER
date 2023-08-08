const express = require("express");
const app = express();
const userRoutes = require("./server/routes/userRoutes");
const adminRoutes = require('./server/routes/adminRoutes')
const seed = require('./server/config/seed')
const db = require("./server/config/db");
const cors = require("cors");
app.use(cors());
seed.insertUser()
// to handle the request body parse into post method
app.use(express.static(__dirname+"/server/public"))
app.use(express.urlencoded({ extended: false }));

app.use("/", userRoutes);
app.use('/admin',adminRoutes)
app.listen(8080, (err, res) => {
  if(err){
    console.log("Error in initializing server");
  }
  else{
    console.log("Server is running on port 8080");
  }
});
           