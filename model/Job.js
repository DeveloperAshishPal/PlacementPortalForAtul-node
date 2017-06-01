var mongoose = require("mongoose");

var jobSchema =mongoose.Schema({
    title : {
        type : 'string'
    },
    company : {
        type : 'string'
    },
    location : {
        type : 'string'
    },
    salary : {
        type : 'string'
    }
});
module.exports = mongoose.model("Job",jobSchema);