// const {uploadFile} = require('../aws/s3/FileUpload')
// const { unlinkSync } = require('fs');
// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;
const connection = require("../database/mysqlConnection");
var kafka = require("../kafka/client");
const jobPostings = require("../models/JobPostingsModel");
// const jwt = require('jsonwebtoken');
// const { secret } = require('../jwt/config');
// const { auth } = require("../jwt/passport");
// auth();


// exports.getSearchByTitleorLocation = async function (req, res) {
//   const searchQuery = req.query.searchQuery;
//   console.log("search query: ", req.query);
//   try {
//     let company_ids = await jobPostings.find({
//       $or: [
//         { job_title: { $regex: ".*" + searchQuery + ".*" } },
//         { job_location: { $in: [searchQuery] } },
//       ],
//     });
//     console.log("company_ids ", company_ids.length);
//     let results = [];
//     let sql = 'SELECT * FROM company_details WHERE comp_id = "';
//     for (var idx = 0; idx < company_ids.length; idx++) {
//       await connection.con.query(
//         sql + company_ids[idx].job_company_id + '"',
//         async (err, company_details) => {
//           console.log("company_details ", company_details, " idx", idx);
//           await results.push(company_details);
//         }
//       );
//     }
//     console.log("results ", results);
//     if (results) {
//       res.status(200).end(JSON.stringify(results));
//     } else {
//       res.status(200).end(JSON.stringify([]));
//     }
//   } catch (err) {
//     res
//       .status(500)
//       .send(JSON.stringify({ message: "Something went wrong!", error: err }));
//   }
// };


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
      .send(JSON.stringify({ message: "Something went wrong!", error: err }));
  }
};


exports.getSearchByCompanyName = async function (req, res) {
  try {
    kafka.make_request("search_byCompanyName", req.query, (err, resp) => {
      if (err || !resp) {
        console.log(err);
          res
          .status(500)
          .send(
            JSON.stringify({ message: "Something went wrong!", error: err })
          );
      } else {
        res.status(200).end(JSON.stringify(results));
      }
    });
  } catch (err) {
    res
      .status(500)
      .send(JSON.stringify({ message: "Something went wrong!", error: err }));
  }
};

exports.saveJobs = async function (req, res) {
  try {
    console.log("In save Jobs");
    kafka.make_request(
      "save_jobs",
      { ...req.body, jobSeekerId: req.query.jobSeekerId },
      (err, resp) => {
        if (err || !resp) {
          console.log("err", err);
          res
            .status(500)
            .send(
              JSON.stringify({ message: "Something went wrong!", error: err })
            );
        } else {
          res.status(200).end(JSON.stringify(resp));
        }
      }
    );
  } catch (err) {
    res
      .status(500)
      .send(JSON.stringify({ message: "Something went wrong!", error: err }));
  }
};

exports.getSavedJobs = async function (req, res) {
  try {
    kafka.make_request("get_saved_jobs", req.query, (err, resp) => {
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

exports.addReviews = async function (req, res) {
  try {
    kafka.make_request("add_reviews", req.query, (err, resp) => {
      if (err || !resp) {
        console.log(err);
        res
          .status(500)
          .send(
            JSON.stringify({ message: "Something went wrong!", error: err })
          );
      } else {
        res.status(200).end(JSON.stringify(results));
      }
    });
  } catch (err) {
    res
      .status(500)
      .send(JSON.stringify({ message: "Something went wrong!", error: err }));
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
}


exports.getJobseekerProfile = async function (req, res) {
    console.log(req.query)
    await kafka.make_request("get_jobseeker_profile", req.query, (err, resp) => {
        if (err || !resp) {
            console.log(err);
            return err.status(500).json({ error: err });
        }
        res.send(resp);
    })
}

exports.updateJobseekerProfile = async function (req, res) {
    console.log(JSON.stringify(req.body)+"---------")
    await kafka.make_request("update_jobseeker_profile", req.body, (err, resp) => {
        if (err || !resp) {
            console.log(err);
            return resp.status(500).json({ error: err });
        }
        console.log("update profile response"+ JSON.stringify(resp))
        res.send(resp);
    })
}

exports.getJobseekerResume = async function (req, res) {
    await kafka.make_request("get_resume", req.query, (err, resp) => {
        if (err || !resp) {
            console.log(err);
            return err.status(500).json({ error: err });
        }
        res.send(resp);
    })
}

exports.updateJobseekerResume = async function (req, res) {
  console.log("called here!0", req.file)
    await kafka.make_request("update_resume", req.query, (err, resp) => {
        if (err || !resp) {
            console.log(err);
            return err.status(500).json({ error: err });
        }
        res.send(resp);
    })
};

exports.deleteJobseekerResume = async function (req, res) {
    console.log("inside delete resume")
    await kafka.make_request("delete_resume", req.query, (err, resp) => {
        if (err || !resp) {
            console.log(err);
            return err.status(500).json({ error: err });
        }
        res.send(resp);
    })
};




