// const {uploadFile} = require('../aws/s3/FileUpload')
// const { unlinkSync } = require('fs');
// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;
// const Redis = require('ioredis')
// const REDIS_PORT = require('../cache/redisConfig');
const kafka = require("../kafka/client");
const Reviews = require("../models/CompanyReviewsModel");

// const redisConfig =  {
//   'port': 6379,
//   'host': '3.144.231.148'
// }

// const redisConfig =  require('../cache/redisConfig');
// const redis_client = new Redis(redisConfig)

// const jwt = require('jsonwebtoken');
// const { secret } = require('../jwt/config');
// const { auth } = require("../jwt/passport");
// auth();

exports.getReviewsByCompanyIdKafka = async function (req, res) {
  var result=[]
  for(let i=0;i<10000;i+=1000){
    req.query["offset"]=i
  await kafka.make_request("company.getreviews", req.query, (err, resp) => {
    if (err || !resp) {
      console.log(err);
      return err.status(500).json({ error: err });
    }
    console.log("Response length ",resp.length)
    result.push(...resp)
    console.log({"res_len":result.length});
    if(i==9000){
      return res.status(200).json({"res_len":result});
    }
  });

}

};

exports.getReviewsByCompanyId = async function (req, res) {
  const compId = req.query.compId;
  console.log("here in get reviews compId : "+compId);
  try {
    let reviews = await Reviews.findAll({ where: { review_company_Id: compId } });
    console.log(reviews)
    if (reviews) {
      res
      .status(200)
      .end(JSON.stringify(reviews));
    } else {
      res
      .status(200)
      .end(JSON.stringify([]));
    }
  } catch (err) {
    res
      .status(500)
      .send(JSON.stringify({ message: "Something went wrong!", error: err }));
  }
};

exports.getReviewsByCompanyIdSQLCaching = async function (req, res) {
    const compId = req.query.compId;
    const cacheKey = "ReviewsByCompanyId="+compId;
    try {
      let cacheData = await redis_client.get(cacheKey);
      if(cacheData){
        res.send(cacheData);
      } else {
        let reviews = await Reviews.findAll({ where: { review_company_Id: compId } });

        if (reviews) {

          redis_client.set(cacheKey, JSON.stringify(reviews), 'EX', 60 * 60);
          res.send(JSON.stringify(reviews));
        } else {
          res.send(JSON.stringify([]));
        }
      }

    } catch (err) {
      res
        .status(500)
        .send(JSON.stringify({ message: "Something went wrong!"+ err }));
    }
  };

  exports.getReviewsByCompanyIdSQLCachingKafka = async function (req, res) {
    const compId = req.query.compId;
    const cacheKey = "ReviewsByCompanyIdWithKafka="+compId;
    let cacheData = await redis_client.get(cacheKey);
      if(cacheData){
        res.send(cacheData);
      } else {
        kafka.make_request("company.getreviews", req.query, (err, resp) => {
          if (err || !resp) {
            console.log(err);
            return err.status(500).json({ error: err });
          }
          redis_client.set(cacheKey, JSON.stringify(resp), 'EX', 60 * 60);
          return res.status(200).json(resp);
        });
      }

  };


exports.getJobDetailsById = async function (req, res) {
  const jobId = req.query.jobId;
  console.log("Debug : jobId : "+jobId)
  kafka.make_request("employer.getJobPosting", jobId, (err, results) => {
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

exports.getEmployerProfile = async function (req, res) {
  
  try {
    kafka.make_request("get_emp_profile", req.query, (err, resp) => {
      if (err || !resp) {
        console.log(err);
        res
          .status(500)
          .send(
            JSON.stringify({ message: "Something went wrong!", error: err })
          );
      } else {
        res.status(200).json(resp);
      }
    });
  } catch (err) {
    res
      .status(500)
      .send(JSON.stringify({ message: "Something went wrong!", error: err }));
  }


};


exports.createJobPosting = async function (req, res) {

      const data = req.body;
      kafka.make_request("employer.createJobPosting", data, (err, results) => {
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

exports.updateJobPosting = async function (req, res) {

  const data = req.body;
  kafka.make_request("employer.updateJobPosting", data, (err, results) => {
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

exports.updateApplicationStatus = async function (req, res) {

  const data = req.body;
  kafka.make_request("employer.updateApplicationStatus", data, (err, results) => {
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

exports.getJobApplicationsByJobId = async function (req, res) {
  const jobId = req.query.jobId;

  kafka.make_request("employer.getJobApplications", req.query, (err, results) => {
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

exports.updateEmployerDetails = async function (req, res) {
  const emp=req.body;
  console.log("request received to update profile at the backend",req.body)
  kafka.make_request("update_employer_details", emp, (err, results) => {
    if (err){
      res
      .status(500)
      .send(JSON.stringify({ message: "Something went wrong!", err }));

    } else if(results.response_code == 200){

        res.send(JSON.stringify("Update Successfully"));
    } else {
        res
        .status(500)
        .send(JSON.stringify({ message: "Something went wrong!", err }));
    }
  });


};