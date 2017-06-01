var mongoose = require("mongoose");

var userSchema =mongoose.Schema({
    username : {
        type : 'string',
        unique : true
    },
    email : {
        type : 'string',
        unique : true
    },
    encryptedPassword : {
        type : 'string'
    },
    isAdmin :{
        type : 'boolean',
        default : false
    }
});
module.exports = mongoose.model("User",userSchema);