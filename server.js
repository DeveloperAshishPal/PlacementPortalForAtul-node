var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var User = require('./model/User.js');
var Admin = require('./model/Admin.js');
var UserDetail = require('./model/UserDetail.js');
var Job = require('./model/Job.js');
var port = 3000;

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());


//connect to Mongoose
var configDB = require("./config/database.js");
mongoose.connect(configDB.url);
var db = mongoose.connection;


app.get('/', function (req, res) {
    res.send('please see documentation');
});

// this is admin login
app.post('/api/admin/authenticate', function (req, res) {
    var username = req.param('username');
    var password = req.param('password');

    var Passwords = require('machinepack-passwords');

     Admin.findOne({
        username: username
    }, function (err, admin) {
        if (err) {
            return res.status('500').send();
        }
        if (!admin) {
            return res.status('404').send();   
        }
        Passwords.checkPassword({
            passwordAttempt: password,
            encryptedPassword: admin.encryptedPassword,
        }).exec({
            // An unexpected error occurred.
            error: function (err) {
                return res.status('500').send();
            },
            // Password attempt does not match already-encrypted version
            incorrect: function () {
                return res.status('404').send();
            },
            // OK.
            success: function () {
                return res.send(admin);
            }
        }); 
    });
});

// this is user login
app.post('/api/user/authenticate', function (req, res) {
    var username = req.param('username');
    var password = req.param('password');

    var Passwords = require('machinepack-passwords');

    User.findOne({
        username: username
    }, function (err, user) {
        if (err) {
            return res.status('500').send();
        }
        if (!user) {
            return res.status('404').send();   
        }
        Passwords.checkPassword({
            passwordAttempt: password,
            encryptedPassword: user.encryptedPassword,
        }).exec({
            // An unexpected error occurred.
            error: function (err) {
                return res.status('500').send();
            },
            // Password attempt does not match already-encrypted version
            incorrect: function () {
                return res.status('404').send();
            },
            // OK.
            success: function () {
                return res.send(user);
            }
        }); 
    });
    
});

// this is admin registration
app.post('/api/admin/register', function (req, res) {
    var username = req.param('username');
    var email = req.param('email');
    var password = req.param('password');
    var Passwords = require('machinepack-passwords');
    // Encrypt a string using the BCrypt algorithm.
    Passwords.encryptPassword({
        password: password,
    }).exec({
        // An unexpected error occurred.
        error: function (err) {
            return res.status('404').send();
        },
        // OK.
        success: function (result) {
            var newAdmin = new Admin();
            newAdmin.username = username;
            newAdmin.email = email;
            newAdmin.encryptedPassword = result;
            newAdmin.save(function (err, savedAdmin) {
                if (err) {
                    return res.status('500').send();
                }
                return res.send(savedAdmin);
            })
        }
    });
});

// this is user registration 
app.post('/api/user/register', function (req, res) {
    var username = req.param('username');
    var email = req.param('email');
    var password = req.param('password');
    var Passwords = require('machinepack-passwords');
    // Encrypt a string using the BCrypt algorithm.
    Passwords.encryptPassword({
        password: password,
    }).exec({
        // An unexpected error occurred.
        error: function (err) {
            return res.status('404').send();
        },
        // OK.
        success: function (result) {
            var newUser = new User();
            newUser.username = username;
            newUser.email = email;
            newUser.encryptedPassword = result;
            newUser.save(function (err, savedUser) {
                if (err) {
                    return res.status('500').send();
                }
                return res.send(savedUser);
            })
        }
    });
});

// create user details
app.post('/api/user/profile/create',function(req,res){
    var profile = {};
    profile.userId = req.param('userId');
    profile.firstname = req.param('firstname');
    profile.lastname = req.param('lastname');
    profile.email = req.param('email');
    profile.phone = req.param('phone');
    profile.address = req.param('address');
    profile.state = req.param('state');
    profile.city = req.param('city');
    profile.gender = req.param('gender');
    profile.dob = req.param('dob');
    profile.rollNo = req.param('rollNo');
    profile.course = req.param('course');
    profile.branch = req.param('branch');
    profile.yearOfPassing = req.param('yearOfPassing');
    profile.noOfBacklogs = req.param('noOfBacklogs');
    profile.percentage = req.param('percentage');
    profile.sgpa = req.param('sgpa');
    
    var userDetails = new UserDetail();
    userDetails.userId = profile.userId;
    userDetails.firstname = profile.firstname;
    userDetails.lastname = profile.lastname;
    userDetails.email = profile.email;
    userDetails.phone = profile.phone;
    userDetails.address = profile.address;
    userDetails.state = profile.state;
    userDetails.city = profile.city;
    userDetails.gender = profile.gender;
    userDetails.dob = profile.dob;
    userDetails.rollNo = profile.rollNo;
    userDetails.course = profile.course;
    userDetails.branch = profile.branch;
    userDetails.yearOfPassing = profile.yearOfPassing;
    userDetails.noOfBacklogs = profile.noOfBacklogs;
    userDetails.percentage = profile.percentage;
    userDetails.sgpa = profile.sgpa;
    userDetails.save(function(err,result){
        if (err) {
                    return res.status('500').send();
                }
                return res.send(result);
    });
});

// get user detail info
app.get('/api/user/profile',function(req,res){
    if(!req.param('userId')){
        return res.send('id not found');
    }
    UserDetail.findOne({
        userId : req.param('userId')
    },function(err,data){
        if (err) return res.send(err);
        
        return res.send(data);
    });
});

// get job info
app.get('/api/find/job',function(req,res){
    Job.find().exec(function(err,data){
        if (err) return res.send(err);
        return res.send(data);
    });
});

app.get('/api/find/user',function(req,res){
    UserDetail.find().exec(function(err,data){
        if (err) return res.send(err);
        return res.send(data);
    });
});

// post a job 
app.post('/api/job/create',function(req,res){
    var data = {};
    data.title = req.param('title');
    data.company = req.param('company');
    data.location = req.param('location');
    data.salary = req.param('salary');
    
    var newJob = new Job();
    newJob.title = data.title;
    newJob.company = data.company;
    newJob.location = data.location;
    newJob.salary = data.salary
    newJob.save(function(err,result){
        if (err) {
                    return res.status('500').send();
                }
                return res.send(result);
    });
});






app.listen(port);
console.log("server started on port " + port);
