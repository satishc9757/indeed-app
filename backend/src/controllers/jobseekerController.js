// const {uploadFile} = require('../aws/s3/FileUpload')
// const { unlinkSync } = require('fs');
// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;
const connection = require('../database/mysqlConnection');
var kafka = require('../kafka/client');
const jobPostings = require('../models/JobPostingsModel');
// const jwt = require('jsonwebtoken');
// const { secret } = require('../jwt/config');
// const { auth } = require("../jwt/passport");
// auth();


exports.getSearch = async function (req, res){
    const searchQuery = req.query.searchQuery;
    console.log(searchQuery);
    try {
        kafka.make_request("search", req.query, (err, resp) => {
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


exports.createJobApplication = async function (req, res) {

    const data = req.body;
    kafka.make_request("jobseeker.createJobApplication", data, (err, results) => {
        if (err){
            res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));

          } else if(results.response_code == 200){

              res.send(JSON.stringify(results.response_data));
          } else {
              res
              .status(500)
              .send(JSON.stringify({ message: "Something went wrong!", err }));
          }
    });

};