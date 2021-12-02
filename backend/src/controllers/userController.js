// const {uploadFile} = require('../aws/s3/FileUpload')
// const { unlinkSync } = require('fs');
// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;

const Login = require("../models/LoginDetailsModel");
const employer = require("../models/EmployerModel");

var kafka = require('../kafka/client');
// const jwt = require('jsonwebtoken');
// const { secret } = require('../jwt/config');
// const { auth } = require("../jwt/passport");
// auth();

exports.login = async function (req, res) {
    console.log("login details ", req.body)
    req.query
    try {
        kafka.make_request("login", req.body, (err, resp) => {
            console.log("resp",resp);
            if (err || !resp) {
              console.log(err);
                res
                .status(500)
                .send(JSON.stringify({ message: 'Something went wrong!', error: err }));
            }
            else{
                res
                .status(200)
                .end(JSON.stringify(resp));
            }
        });
        
    } catch (err) {
        res
        .status(500)
        .send(JSON.stringify({ message: 'Something went wrong!', error: err }));
    }
};

exports.signup = async function (req,res){
    console.log("signup data", req.body);
    try {
        kafka.make_request("signup", req.body, (err, resp) => {
            if (err || !resp) {
              console.log(err);
                res
                .status(500)
                .send(JSON.stringify({ message: 'Something went wrong!', error: err }));
            }
            else{
                res
                .status(200)
                .end("Successfully Signed Up!");
            }
        });    
    } catch (err) {
        res
        .status(500)
        .send(JSON.stringify({ message: 'Something went wrong!', error: err }));
    }
};

exports.getCompanyId = async function (req,res){
    console.log("signup data", req.query);

    var id = await employer.findOne({emp_id:req.query.id});
    console.log(id)
    if(id){
        res
        .status(200)
        .end(JSON.stringify({id:id.emp_company_id}));

    }
    else{
        res
        .status(500)
        .send(JSON.stringify({ message: 'Something went wrong!'}));
    }
    
};
