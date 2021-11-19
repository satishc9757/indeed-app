// const {uploadFile} = require('../aws/s3/FileUpload')
// const { unlinkSync } = require('fs');
// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;
const Redis = require('ioredis')
const REDIS_PORT = require('../cache/redisConfig');
const kafka = require("../kafka/client");
const Reviews = require("../models/CompanyReviewsModel");


const redisConfig =  require('../cache/redisConfig');
const redis_client = new Redis(redisConfig)

// const jwt = require('jsonwebtoken');
// const { secret } = require('../jwt/config');
// const { auth } = require("../jwt/passport");
// auth();

exports.getReviewsByCompanyIdKafka = async function (req, res) {
  kafka.make_request("company.getreviews", req.query, (err, resp) => {
    if (err || !resp) {
      console.log(err);
      return err.status(500).json({ error: err });
    }
    return res.status(200).json(resp);
  });
};

exports.getReviewsByCompanyId = async function (req, res) {
  const compId = req.query.compId;
  try {
    let reviews = await Reviews.findAll({ where: { review_company_Id: compId } });

    if (reviews) {
      res.send(JSON.stringify(reviews));
    } else {
      res.send(JSON.stringify([]));
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

exports.getJobsByCompanyId = async function (req, res) {
  const compId = req.query.compId;

  try {
    let jobPostings = await JobPostings.find({ jobCompanyId: compId });

    if (jobPostings) {
      res.send(JSON.stringify(jobPostings));
    } else {
      res.send(JSON.stringify([]));
    }
  } catch (err) {
    res
      .status(500)
      .send(JSON.stringify({ message: "Something went wrong!", error: err }));
  }
};
