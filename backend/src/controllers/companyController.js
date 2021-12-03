// const {uploadFile} = require('../aws/s3/FileUpload')
// const { unlinkSync } = require('fs');
// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;
const aws = require('aws-sdk');
const Photos = require('../models/Photos');
var kafka = require('../kafka/client');
const connection = require('../database/mysqlConnection');
const jobPostingsModel = require('../models/JobPostingsModel');
const path = require( 'path' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
// const jwt = require('jsonwebtoken');
// const { secret } = require('../jwt/config');
// const { auth } = require("../jwt/passport");
// auth();
const s3 = new aws.S3({
    accessKeyId: 'AKIAXUKC3TYXKYCP3T44',
    secretAccessKey: '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',
    Bucket: 'indeed-bucket-273'
   });


exports.getCompanyDetailsByCompanyID = async function (req,res){
    let compId = req.query.compId;
    console.log("comp_id ", req.query);
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
     bucket: 'indeed-bucket-273',
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


   


exports.uploadPhotos = async function (req, res) {
  let compID = req.query.compId;
  profileImgUpload( req, res, ( error ) => {
		console.log( 'file', req.file );
		if( error ){
			console.log( 'errors', error );
			res.json( { error: error } );
		} else {
			// If File not found
			if( req.file === undefined ){
				console.log( 'Error: No File Selected!' );
				res.json( 'Error: No File Selected' );
      } else {
        
        const imageLocation = req.file.location;// Save the file name into database 
        console.log(imageLocation)

        const photos = new Photos ({ "comp_id": compID,
                    "comp_photos": imageLocation
        })
          photos.save().then(doc => {
                    console.log("Success photos============" + photos)
                    let res={
                        message: "Success",
                        res: photos
                    }
                    res.status(200).end("Photos Added!");
                }).catch(error => {
                    return res.status(500).json({ error: error });
                })


				// If Success
				
				
				// Save the file name into database
				// res.json( {
				// 	filesArray: fileArray,
				// 	locationArray: galleryImgLocationArray
				// } );
			}
		}
	});
}

exports.uploadCompanyProfilePicture = async function (req, res) {
  console.log("inside update resume", req.params)
  console.log(req.query.compId+"--------------")
  let compID = req.query.compId;
  await profileImgUpload(req, res, async (error) => {
    console.log('requestOkokok', req.file);
    console.log('requestOkokok', req.params, compID);
    if (error) {
      console.log('errors', error);
      res.json({ error: error });
    } else {
      //  If File not found
      if (req.file === undefined) {
        //console.log( 'Error: No File Selected!' );
        res.json('Error: No File Selected');
      } else {
        // If Success
        const imageLocation = req.file.location;// Save the file name into database into profile model
        const ID = req.file.ID;
                
        const query = "UPDATE company_details set comp_profile_location='" + imageLocation + "' where comp_id= " + compID;
        connection.con.query(query, (err, results) => {
          if (err) {
            console.log(err);
            
return res.status(500).json({ error: error });
                
          }
          else {
            console.log(results);
            res.status(200).end("Profile Added!");
          }
        })

      }
    }
  })
}



  exports.getFeaturedReviewsByCompId = async function (req, res) {
    const compId = req.query.compId;
  
    kafka.make_request("get_featured_reviews", compId, (err, results) => {

      console.log("resutls from kafka",results)

  
      if (err){
        res
        .status(500)
        .send(JSON.stringify({ message: "Something went wrong!", err }));
  

      } 
      else{
          res.send(results);
      }
    });
  
  
  };

exports.getJobStatsByCompanyId = async function (req, res) {
    console.log("inside stats")
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


exports.getCompanies = async function (req, res) {
  kafka.make_request("company.getAllCompanies", null, (err, results) => {
    if (err){
      res
      .status(500)
      .send(JSON.stringify({ message: "Something went wrong!", err }));

    } else if(results){

        res.send(JSON.stringify(results));
    } else {
        res
        .status(500)
        .send(JSON.stringify({ message: "Something went wrong!", err }));
    }
  });
}





  exports.addEmployeeReview = async function (req, res) {
    const review_details = req.body;

    kafka.make_request("add_employee_review", review_details, (err, results) => {
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

  exports.getReviewsByCompId = async function (req, res) {
    const compId = req.query.compId;
  
    kafka.make_request("get_reviews", compId, (err, results) => {

      console.log("response--------------->",results)
      if (err){
        res
        .status(500)
        .send(JSON.stringify({ message: "Something went wrong!", err }));
  
      } else if(results.length>0){
  
          res.send(JSON.stringify(results));
      } else {
          res
          .status(500)
          .send(JSON.stringify({ message: "Something went wrong!", err }));
      }
    });
  
  
  };

