const express = require("express")
const usermiddleware = express.Router()
const jwt = require('jsonwebtoken');


usermiddleware.use((req,res,next)=>{

let token = req.headers.authorization

    jwt.verify(token, 'user', function(err, decoded) {
        if(decoded){
            req.body.userID=decoded.userID
            next()
        }else{
            res.send({"msg":"It is a Private route and User is not authenticated we need a token for authenticate"})
        }
      });




})

module.exports={
    usermiddleware
}