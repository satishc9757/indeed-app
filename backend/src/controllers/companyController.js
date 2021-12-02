// const {uploadFile} = require('../aws/s3/FileUpload')
// const { unlinkSync } = require('fs');
// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;

var kafka = require('../kafka/client');
const connection = require('../database/mysqlConnection');
const jobPostingsModel = require('../models/JobPostingsModel');
// const jwt = require('jsonwebtoken');
// const { secret } = require('../jwt/config');
// const { auth } = require("../jwt/passport");
// auth();


exports.getCompanyDetailsByCompanyID = async function (req,res){
    let compId = req.query.compId;
    try {
        kafka.make_request("company_details", req.query, (err, resp) => {
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

exports.updateCompanyDetailsByCompanyID = async function (req, res){
  
  try{
    kafka.make_request("updateCompanyDetails", req.body, (err, resp) => {
      if (err || !resp) {
        console.log(err);
          res
          .status(500)
          .send(JSON.stringify({ message: 'Something went wrong!', error: err }));
      }
      else{
          console.log(resp);
          res
          .status(200)
          .end(JSON.stringify(resp));
      }
    })
  }catch (err) {
    res
    .status(500)
    .send(JSON.stringify({ message: 'Something went wrong!', error: err }));
  }

}

exports.getJobRoleDetailsByCompanyID = async function (req,res){
    let compId = req.query.compId;
    let jobId = req.query.jobId;
    console.log(jobId, compId);
    try {
        kafka.make_request("job_role", req.query, (err, resp) => {
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


exports.getJobsByCompanyId = async function (req, res) {

    kafka.make_request("company.getCompanyJobPostings", req.query, (err, results) => {
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

  exports.getJobsByCompanyIdWithPagination = async function (req, res) {
    // const compId = req.query.compId;

    kafka.make_request("company.getCompanyJobPostingsWithPagination", req.query, (err, results) => {
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

  exports.updateFeaturedReviewStatus = async function (req, res) {
    const review_details = req.body;
  
    kafka.make_request("update_featured_review_status", review_details, (err, results) => {
      console.log(results)
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


  exports.getFeaturedReviewsByCompId = async function (req, res) {
    const compId = req.query.compId;
  
    kafka.make_request("get_featured_reviews", compId, (err, results) => {
      console.log(results)
  
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

  exports.getJobStatsByCompanyId = async function (req, res) {

    kafka.make_request("company.getJobStats", req.query, (err, results) => {
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

exports.getCompaniesBySearchQuery = async function (req, res) {
    const query = req.query;

    kafka.make_request("company.companySearchQuery", query, (err, results) => {
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
  }
  
  exports.getAvgSalaryByDeptId = async function (req, res) {
    
    const data={
      compId : req.query.compId,
      dept :req.query.deptId
    }

    kafka.make_request("get_avg_salary_by_dept", data, (err, results) => {
      console.log("here are your results",results)

      if (err){
        res
        .status(500)
        .send(JSON.stringify({ message: "Something went wrong!", err }));

      } else if(results){

          res.status(200).send(JSON.stringify(results));
      } else {
          res
          .status(500)
          .send(JSON.stringify({ message: "Something went wrong!", err }));
      }
    });


  };
  exports.getTitleByDepts = async function (req, res) {
    
    const data={
      compId : req.query.compId,
    }

    kafka.make_request("get_company_dept_titles_list", data, (err, results) => {
      console.log("here are your results",results)

      if (err){
        res
        .status(500)
        .send(JSON.stringify({ message: "Something went wrong!", err }));

      } else if(results){

          res.status(200).send(JSON.stringify(results));
      } else {
          res
          .status(500)
          .send(JSON.stringify({ message: "Something went wrong!", err }));
      }
    });


  };

  exports.addSalaryReview = async function (req, res) {
    const review_details = req.body;

    kafka.make_request("add_salary_review", review_details, (err, results) => {
      console.log("here are your results",results)
      if (err){
        res
        .status(500)
        .send(JSON.stringify({ message: "Something went wrong!", err }));

      } else if(results.affectedRows >0){

          res.status(200).send("Added successfully");
      } else {
          res
          .status(500)
          .send(JSON.stringify({ message: "Something went wrong!", err }));
      }
    });
    

  };
