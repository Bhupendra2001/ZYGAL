const route = require('express').Router()

const userCont = require('./userController')

route.post("/register", userCont.registerUser)
route.post("/login", userCont.loginUser)

route.all("/*", (req, res)=>{
    return res.status(400).send({status : false , message : "Your end point is wrong"})
})

module.exports = route