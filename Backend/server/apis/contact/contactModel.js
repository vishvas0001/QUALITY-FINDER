var mongoose = require('mongoose');
var contactSchema = mongoose.Schema({
    email: {type: String, required: true, default: ''},
    name: {type: String, required: true, default: ''},
    subject: {type: String, required: true, default: ''},
    message: {type: String, required: true, default: ''},
    createdAt: {type: Date, default: Date.now}

})
module.exports = mongoose.model('contact', contactSchema);
