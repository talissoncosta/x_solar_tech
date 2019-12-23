
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

module.exports = (req,res,next) =>{
    try{
        if(!req.headers.authorization){
            throw Error;
        }
        const token = req.headers.authorization.split(" ")[1];
        const content = jwt.verify(token, secret);

        req.body.username = content.username;
        
        next();
    } catch(error){
        return res.status(401).send({
            error: "Auth failed"
        })
    }

};