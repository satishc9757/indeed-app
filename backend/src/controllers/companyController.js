// const {uploadFile} = require('../aws/s3/FileUpload')
// const { unlinkSync } = require('fs');
// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;

var kafka = require('../kafka/client');
const con = require('../database/mysqlConnection');
const jobPostingsModel = require('../models/JobPostingsModel');
// const jwt = require('jsonwebtoken');
// const { secret } = require('../jwt/config');
// const { auth } = require("../jwt/passport");
auth();


exports.getCompanyDetailsByCompanyID = async function (req,res){
    let compId = req.query.compId;

    try{
        let sql = 'SELECT * FROM company_details WHERE comp_id = '+compId;
        let results = await con.query(sql);

        if (results) {
            res
            .status(200)
            .end(JSON.stringify(results));
        } else {
            res
            .status(200)
            .end(JSON.stringify([]));
        }
    } catch(err){
        res
        .status(500)
        .send(JSON.stringify({ message: 'Something went wrong!', error: err }));
    }
};

exports.getJobRoleDetailsByCompanyID = async function (req,res){
    let compId = req.query.compId;
    let jobId = req.query.jobId;
    try{
        let sql = 'SELECT review_content FROM company_reviews WHERE review_company_id = '+compId;
        let reviews = await con.query(sql);
        if (reviews.length>0) {
            sql = 'SELECT * FROM company_details WHERE comp_id = '+compId;
            let details = await con.query(sql);
            if(details.length>0){
                let results = await jobPostingsModel.find({job_id: jobId});
                results =  Object.assign({}, results, details[0])
                results = Object.assign({}, results, {'reviews':reviews});
                res
                .status(200)
                .end(JSON.stringify(results));
            } else{
                res
                .status(200)
                .end(JSON.stringify([]));
            }
        } else {
            res
            .status(200)
            .end(JSON.stringify([]));
        }
    } catch(err){
        res
        .status(500)
        .send(JSON.stringify({ message: 'Something went wrong!', error: err }));
    }
};