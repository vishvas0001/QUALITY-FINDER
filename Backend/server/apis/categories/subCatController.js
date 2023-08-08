var mongoose = require('mongoose');

const subCategory=require('./subCatModel')

exports.addSubCategory=(req,res)=>{
    console.log(req.body)
    if(req.body.description==undefined||req.body.name==undefined){
        res.json({
            "message":"Fill all detailss",
            "status":400,
            "success":false,
        })
    }else{
        subCategory.findOne({"name":req.body.name})
        .then(data=>{
            if(data!=null){
                res.json({
                    "message":"SubCategory already exists",
                    "status":400,
                    "success":false,
                })
            }else{
                let subObj=new subCategory()
                subObj.name=req.body.name==undefined?"":req.body.name
                subObj.description=req.body.description==undefined?"":req.body.description
                subObj.cat_Id = req.body.cat_Id


                subObj.save()
                .then(data=>{
                    res.json({
                        "message":"Subcategory added",
                        "status":200,
                        "success":true,
                        "data":data
                    })
                })
                .catch(err=>{
                    res.json({
                        "message":"error occured",
                        "status":500,
                        success:false,
                        "error":String(err)
                    })
                })

            }
        })
    }
}
exports.listSubCategories=(req,res)=>{
    subCategory.find({cat_Id : req.body.cat_id})
    .then(data=>{
        res.json({
            "message":"All subcategories",
            "status":200,
            "success":true,
            subCategories:data
        })
    })
    

}
exports.deleteSubCategory=(req,res)=>{
    console.log(req.body)
    if(req.body.id==undefined||req.body.id==null){
        res.json({
            "message":'Fill the ID',
            "status":400,
            "success":false,
        })
    }else{
        subCategory.deleteOne({"_id":req.body.id})
        .then(data=>{
            res.json({
                "message":"Subcategory deleted",
                "status":200,
                "success":true,
            })
        })
        .catch(err=>{
            res.json({
                "message":"error occured",
                "status":500,
                "success":false,
                "error":String(err)
            })
        })

    }
    
}
exports.listSubCategories = (req,res)=>{
    subCategory.find({cat_Id:req.body.catId})
    .then(data=>{
        res.json({
            "message":"All subcategories",
            "status":200,
            "success":true,
            subCategories:data
        })
    })
    

}

// exports.updateSubcategory=(req,res)=>{
//     subCategory.findOne({'_id':req.body._id})
//     .then(data=>{
//         if(data!=null){
//             data.subcategoryName=req.body.subcategoryName
//             data.save()
//             res.json({
//                 "message":"data updated",
//                 "status":200,
//                 "success":true,
//                 "data":data
//             })
//         }else{
//             res.json({
//                 "message":"data not updated",
//                 "status":400,
//                 "success":false,
//             })
//         }
//     })
//     .catch(err=>{
//         res.json({
//             "message":"error in update",
//             "status":500,
//             "success":false,
//             "error":String(err)
//         })
//     })
// }
