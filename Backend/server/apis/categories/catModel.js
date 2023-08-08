var mongoose = require('mongoose');
var catSchema = mongoose.Schema({
    name : {type: 'string', required: true},
    description : {type: 'string', required: true},
    createdAt: {type:"Date", default: Date.now()}
    
})
var category = (module.exports = mongoose.model("categorie", catSchema));
