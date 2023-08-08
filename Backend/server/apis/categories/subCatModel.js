var mongoose = require('mongoose');
var subCatSchema = mongoose.Schema({
    name : {type: 'String', required: true, default :""},
    description : {type: 'String', required: true , default :""},
    cat_Id : { type: mongoose.Schema.Types.ObjectId, default: null ,required: true},
    createdAt: {type:"Date", default: Date.now()}

    
})
var subCategory = (module.exports = mongoose.model("subCategorie", subCatSchema));
