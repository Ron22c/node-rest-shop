const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
  try{
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);
    const decode = jwt.verify(token, process.env.jwt_key)
    res.userdata = decode
    next()
  }
  catch(error){
    console.log(error);
    res.status(400).json({
      message: 'Auth failed'
    })
  }
}
