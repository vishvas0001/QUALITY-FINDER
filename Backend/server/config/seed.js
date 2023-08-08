const user = require('../apis/user/userModel')
const bcrypt = require('bcrypt');
const saltRounds = 10;
exports.insertUser = ()=>{
    let adminData = new user();
    adminData.name = 'admin';
    adminData.email = 'admin@example.com';
    let pass = bcrypt.hashSync('this_is_password', saltRounds);

    adminData.password = pass;
    adminData.uType=1;
    user.findOne({'email': adminData.email})
    .then(data =>{
        if(data==null){
            adminData.save().then(data=>{
                console.log('admin user added')
            })
            .catch(err =>{
                console.log('error adding admin')
            })
        }
    })
    
    
}