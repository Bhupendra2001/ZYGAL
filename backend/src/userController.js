const userModel = require("./userModel")
const jwt = require('jsonwebtoken')
require('dotenv').config()

const registerUser = async (req , res)=>{

    try{
        const data = req.body;

        if(Object.keys(data).length == 0)
        return res.status(400).send({ status : false , message : "All fields is mandatory"})

        const { name , email , password} = data;


        if(!name) return res.status(400).send({status : false , message : "name is required"})
        if(!email) return res.status(400).send({status : false , message : "email is required"})
        if(!password) return res.status(400).send({status : false , message : "password is required"})

        const checkuniqeEmail = await userModel.findOne({email })
        if(checkuniqeEmail) return res.status(400).send({status : false, message : "email already registed"})

        await userModel.create(data);
        return res.status(201).send({ status : true , message :"User Registed Successfully" })
    }catch(err){
        return res.status(500).send({ status : false , message :err.message , msg : "server error" })
    }
}

const loginUser = async (req, res)=>{
    try{

      let  email = req.body.email;
      let  password = req.body.password;
      
      if(!email) return res.status(400).send({status : false , message : "email is required"})
      if(!password) return res.status(400).send({status : false , message : "password is required"})

      let getUser = await userModel
      .findOne({ email: email })
      .select({ password: 1 , name : 1});

      if (!getUser)
      return res.status(404).send({ status: false, message: "User not found" });

      if(password !== getUser.password)
      return res
      .status(401)
      .send({ status: false, message: "Password is incorrect" });

      let payload = { userId : getUser._id , email : getUser.email}

      const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : '3d'})

      return res.status(200).send({ message : "login successfully", token : token})

    }catch(err){
        return res.status(500).send({ status : false , message :err.message , msg : "server error" })
    }
}

module.exports = { registerUser , loginUser}