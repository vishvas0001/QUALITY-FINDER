const router = require("express").Router();
const userController = require("../apis/user/userController");
const postController = require("../apis/post/postController");
const catController = require("../apis/categories/catController");
const subCatController = require("../apis/categories/subCatController");
const multer = require("multer");
const path = require("path");
const storage=multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,"public/images/dp")
  },
  filename:function(req,file,cb){
    let extension = path.extname(file.originalname)
    const newname = req.body._id + "-" + "profile" + extension;
    cb(null,newname)
  }
})
const upload=multer({storage: storage})

const storage1=multer.diskStorage({
  destination: function(req,file,cb){
    // console.log(req)
    cb(null,"server/public/images/post")
  },
  filename:function(req,file,cb){
    let extension = path.extname(file.originalname)
    const newname = "post-"+Date.now()+ extension;
    cb(null,newname)
  }
})
const upload1=multer({storage: storage1})
router.post("/listCategories", catController.listCategories)
router.post("/register",upload.single("profile"),userController.register)
router.post("/listPosts",postController.listPosts)
router.post("/myPosts",postController.myPosts)

router.post("/listSubCategories", subCatController.listSubCategories)
router.post("/searchPost",postController.searchPost)
router.post("/viewPost",postController.viewPost)

router.post("/listPostsByCategory", postController.listPostsByCategory)
router.post('/login',userController.login)
// router.use(require('../common/usermiddleware'))
router.post("/addPost",upload1.array("image",4),postController.addpost)
router.post("/updatePassword",userController.updatePassword)
router.post("/updateInfo",userController.updateInfo)

// router.post("/updatePic",userController.updatePic)

module.exports = router;
