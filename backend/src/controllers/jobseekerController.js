// const {uploadFile} = require('../aws/s3/FileUpload')
// const { unlinkSync } = require('fs');
// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;
const aws = require('aws-sdk');
const path = require( 'path' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const connection = require("../database/mysqlConnection");
var kafka = require("../kafka/client");
const jobPostings = require("../models/JobPostingsModel");
// const jwt = require('jsonwebtoken');
// const { secret } = require('../jwt/config');
// const { auth } = require("../jwt/passport");
// auth();

const s3 = new aws.S3({
    accessKeyId: 'AKIAXUKC3TYXKYCP3T44',
    secretAccessKey: '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',
    Bucket: 'indeed-bucket-273'
   });

function checkFileType( file, cb ){
// Allowed ext
const filetypes = /jpeg|jpg|png|gif|pdf/;
// Check ext
const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
// Check mime
const mimetype = filetypes.test( file.mimetype );if( mimetype && extname ){
    return cb( null, true );
} else {
    cb( 'Error: Images Only!' );
}
}

const profileImgUpload = multer({
    storage: multerS3({
     s3: s3,
     bucket: 'uber-bucket-kd',
     acl: 'public-read',
     key: function (req, file, cb) {
      cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
     }
    }),
    limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function( req, file, cb ){
     checkFileType( file, cb );
    }
   }).single('profileImage');

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
  console.log("inside update resume" + req)
  let seeker_id = req.params.seeker_id;
  profileImgUpload(req, res, (error) => {
        console.log('requestOkokok', req.file);
        console.log('requestOkokok', req.body);
        if (error) {
            console.log('errors', error);
            res.json({ error: error });
        } else {
            // If File not found
            if (req.file === undefined) {
                //console.log( 'Error: No File Selected!' );
                res.json('Error: No File Selected');
            } else {
                // If Success
                const imageLocation = req.file.location;// Save the file name into database into profile model
                const ID = req.file.ID;
                Jobseeker.findOneAndUpdate({ "_id": seeker_id }, {
                    "seeker_resume_location": imageLocation
                })
                    .exec().then(doc => {
                    console.log("Success add resume" + doc)
                    let res={
                        message: "Success",
                        res: JSON.stringify(doc)
                    }
                    callback(null, res);
                }).catch(error => {
                    callback({ isError: true, error: error, status: 500 });
                })
            }
        }
    })
    // await kafka.make_request("update_resume", req, (err, resp) => {
    //     if (err || !resp) {
    //         console.log(err);
    //         return err.status(500).json({ error: err });
    //     }
    //     res.send(resp);
    // })
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




