var mongoose = require("mongoose");

var adminSchema =mongoose.Schema({
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
        default : true
    }
});
module.exports = mongoose.model("Admin",adminSchema);