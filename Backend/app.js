const express = require('express')
const mongoose = require('mongoose')
const cors=require('cors') 
const app = express();

const dbUrl='mongodb+srv://mythri:Mythrikm234@cluster0.ywzlq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
//Connecting through mongodb database
mongoose.connect(dbUrl,{ 
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(!err){
        console.log("DB connected successfully");
    }else{
        console.log("Db not connected");
    }
})

//cors level middleware
app.use(cors())

const userRoutes= require('./routes/users');

//Body Parser Middleware
app.use(express.urlencoded({extended: true}))

//json Middleware
app.use(express.json());

//Router Level Middleware
app.use('/users',userRoutes);



//Error level Route
app.get('/error',(req, res)=>{
    res.status(500).send('something went wrong')
})

module.exports=app