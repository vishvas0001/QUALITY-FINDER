const categoryModel=require('./catModel')
const subCategoryModel=require('./subCatModel')

exports.listCategories = (req,res)=>{
 categoryModel.find()
    .then(data=>{
        res.json({
            "message":"All categories",
            "status":200,
            "success":true,
            categories:data
        })
    })
    
}

exports.addCategory = (req,res)=>{
    console.log (req.body)
    if(req==undefined|| req.body==undefined|| 
        req.body.name==undefined){
        
        res.json({
            "message":"Fill the Form",
            "status":400,
            "success":false
        })
    }else{
     categoryModel.findOne({name:req.body.name})
        .then(async data=>{
            if(data!=null){                
                res.json({
                    "message":"Category with same name already exists",
                    "status":400,
                    "success":false
                })
            }else{
                let total = await categoryModel.countDocuments().exec();
                let catObj = new categoryModel()
                catObj.name = req.body.name;
                catObj.description = req.body.description;

                catObj.save()
                .then(catg=>{
                    res.json({
                        "message":"category Added",
                        "status":200,
                        "success":true,
                        "data":catg
                    })
                })
                .catch(err=>{
                    res.json({
                        "message":"Error in Add category",
                        "status":500,
                        success:false,
                        error:String(err)
                    })
                })
            }
        })
    }
}



        
    
exports.deleteCategory = (req,res)=>{
    if(req.body.catId==undefined||req.body.catId==null){
        res.json({
            "message":"Please select a Category",
            "status":400,
            "success":false,
            })
    }
    else{
     subCategoryModel.deleteMany({"cat_Id":req.body.catId})
        .then(data=>{
            categoryModel.deleteOne({_id:req.body.catId}).then(data=>{
                res.json({
                    message:"Category deleted successfully",
                    status:200,
                    success:true
                })
            })
            })
            
       .catch(err=>{
           res.json({
               "message":"Error in deletion",
               "status":500,
               "success":false,
               "error":String(err)
           })
       })     
    }
}