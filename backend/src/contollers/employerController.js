// const {uploadFile} = require('../aws/s3/FileUpload')
// const { unlinkSync } = require('fs');
// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;

var kafka = require("../kafka/client");
// const jwt = require('jsonwebtoken');
// const { secret } = require('../jwt/config');
// const { auth } = require("../jwt/passport");
// auth();
exports.getReviewsByCompanyId = async function (req, res) {
  const compId = req.query.compId;
  try {
    let reviews = await Reviews.find({ reviewCompId: compId });

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
