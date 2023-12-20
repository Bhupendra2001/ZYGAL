const express = require('express')
const route = require('./router')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()


app.use(express.json())
app.use(cors());

mongoose.set('strictQuery', true)
mongoose.connect( process.env.MongoUrl,{
    useNewUrlparser : true
})
.then(()=> console.log("mongoDb is connected"))
.catch((err) => console.log(err))

app.use("/",route)

app.listen(process.env.PORT || 4000,function(){
    console.log("server running on port"+" "+ (process.env.PORT || 4000) )
})
