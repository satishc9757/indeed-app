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

exports.getSearchByTitleorLocation = async function (req, res) {
    const searchQuery = req.query.searchQuery;
    console.log("search query: ", req.query);
    try {

        let company_ids = await jobPostings.find({$or: [
            {job_title: {$regex: '.*'+searchQuery+'.*'}},
            {job_location: {$in: [searchQuery]}}
        ]});
        console.log("company_ids ",company_ids.length);
        let results = [];
        let sql = 'SELECT * FROM company_details WHERE comp_id = "';
        for(var idx=0; idx<company_ids.length; idx++){
            await connection.con.query(sql+company_ids[idx].job_company_id+'"', async (err, company_details)=>{
                console.log("company_details ",company_details," idx",idx);
                await results.push(company_details);
            });
        }
        console.log("results ",results);
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
    try {
        kafka.make_request("search_byCompanyName", req.query, (err, resp) => {
            if (err || !resp) {
              console.log(err);
                res
                .status(500)
                .send(JSON.stringify({ message: 'Something went wrong!', error: err }));
            }
            else{
                res
                .status(200)
                .end(JSON.stringify(results));
            }
        });
        
    } catch (err) {
        res
        .status(500)
        .send(JSON.stringify({ message: 'Something went wrong!', error: err }));
    }

};


