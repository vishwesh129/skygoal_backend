var jwt = require('jsonwebtoken');

const authenticate = (req, res, next)=>{
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        res.json("Please Login");
    }

    jwt.verify(token, process.env.JWT, function(err, decoded) {
        // console.log(decoded.foo) // bar
        if(err){
            res.json({"msg" : "Something went wrong"});
        }
        else{
            req.userID = decoded.userID;
            next();
        }
      });
}

module.exports = authenticate;