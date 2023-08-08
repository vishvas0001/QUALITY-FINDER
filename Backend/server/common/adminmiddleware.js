const jwt = require('jsonwebtoken')
module.exports = (req,res,next) => {
  const token = req.headers['authorization']
  console.log(token)
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, 'finder', function(err, decoded) {
        if (err) {          
            return res.json({"success": false,"status":401,"message": 'Unauthorized access.' });
        }
        req.decoded = decoded;
        if(req.decoded==null || req.decoded.uType==null||req.decoded.uType !=1){
          res.json({
            "message":"Not Allowed",
            "status":403,
            "success":false
          })
        }else
          next()
    });
  } 
  else {
    return res.json({
        status:403,
        success:false,
        message:"Un Authorized. Token Invalid"
    });
  }
}