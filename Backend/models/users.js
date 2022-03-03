const mongoose = require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    uname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15
    },
     
    uemail: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
    },
    upass: {
        type: String,
        required: true,
        minlength: 6,
       
    },
    role: {
            type: String,
            required: true,
           
       
    }
})
module.exports =mongoose.model('users',userSchema)