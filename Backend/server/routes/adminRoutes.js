const router = require('express').Router();
const postController = require('../apis/post/postController');

const userController = require("../apis/user/userController");
const catController = require("../apis/categories/catController");
const subCatController = require("../apis/categories/subCatController");

router.post('/login',userController.AdminLogin)
router.use(require('../common/adminmiddleware'))

router.post("/countUsers", userController.countUsers);
router.post("/countAdmins", userController.countAdmins);
router.post("/countBlockedUsers", userController.countBlockedUsers);
router.post("/listUsers", userController.listUsers)
router.post("/deleteUser", userController.deleteUser)
router.post("/blockUser", userController.blockUser)
router.post("/unblockUser", userController.unblockUser)
router.post("/listBlockedUsers", userController.listBlockedUsers)
router.post("/addCategory",catController.addCategory)
router.post("/listCategories",catController.listCategories)
router.post("/deleteCategory",catController.deleteCategory)
router.post("/listSubCategories",subCatController.listSubCategories)
router.post("/addSubCategory",subCatController.addSubCategory)
router.post("/deleteSubCategory",subCatController.deleteSubCategory)
router.post("/listPosts",postController.listPosts)
router.post("/deletePost",postController.deletePost)
router.post("/makeFeatured",postController.makeFeatured)






// router.post("/showuser", userController.showuser);


module.exports = router;