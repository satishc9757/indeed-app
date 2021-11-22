// const {uploadFile} = require('../aws/s3/FileUpload')
// const { unlinkSync } = require('fs');
const JobPostings = require('../models/JobPostingsModel');
// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;
const con = require('../database/mysqlConnection');
var kafka = require('../kafka/client');
const jobPostingsModel = require('../models/JobPostingsModel');
// const jwt = require('jsonwebtoken');
// const { secret } = require('../jwt/config');
// const { auth } = require("../jwt/passport");
// auth();

exports.getSearchByTitleorLocation = async function (req, res) {
    const searchQuery = req.query.searchQuery;
    try {
        let company_ids = await jobPostingsModel.find(
            {job_title: { $regex: '.*'+searchQuery+'.*'},
            job_location: { $regex: '.*'+searchQuery+'.*'}
            });

        let results = [];
        let sql = 'SELECT * FROM company_details WHERE comp_id = ';
        for(var idx=0; idx<company_ids.length; i++){
            let company_details = await con.query(sql+company_ids[idx]);
            await results.append(company_details);
        }
        if (results) {
            res
            .status(200)
            .end(JSON.stringify(results));
        } else {
            res
            .status(200)
            .end(JSON.stringify([]));
        }
    } catch (err) {
        res
        .status(500)
        .send(JSON.stringify({ message: 'Something went wrong!', error: err }));
    }
};
  
exports.getSearchByCompanyName = async function (req, res){
    const searchQuery = req.query.searchQuery;

    try{
        let sql = 'SELECT * FROM company_details WHERE comp_name LIKE '+searchQuery+'%';
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


