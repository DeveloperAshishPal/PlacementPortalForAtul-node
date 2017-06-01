var mongoose = require("mongoose");

var userDetailSchema =mongoose.Schema({
    userId : {
      type : 'string'  
    },
    firstname : {
        type : 'string'
    },
    lastname : {
        type : 'string'
    },
    email : {
        type : 'string'
    },
    phone :{
        type : 'string'
    },
    address : {
        type : 'string'
    },
    state : {
        type : 'string'
    },
    city : {
        type : 'string'
    },
    gender : {
        type : 'string'
    },
    dob : {
        type : 'string'
    },
    rollNo : {
        type : 'string'
    },
    course : {
        type : 'string'
    },
    branch :{
        type : 'string'
    },
    yearOfPassing : {
        type : 'string'
    },
    noOfBacklogs : {
        type : 'string'
    },
    percentage : {
        type : 'string'
    },
    sgpa : {
        type : 'string'
    },
    educations : {
        type : 'string'
    }
});
module.exports = mongoose.model("UserDetail",userDetailSchema);