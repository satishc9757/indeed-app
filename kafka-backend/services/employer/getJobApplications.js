const ApplicationDetails = require('../../models/ApplicationDetailsModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

async function handle_request(msg, callback){

    const jobId = msg.jobId;
    //console.log("Inside getRes using mongo id"+resId);

    try{
        let jobApplications  = await ApplicationDetails.find({app_job_id: ObjectId(jobId)});

        if(jobApplications){
            callback(null, { response_code: 200, response_data: jobApplications});
        } else{
            callback(null, { response_code: 200, response_data: {}});
        }


    } catch(err){
        console.error("getJobPosting : " + err);
        callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
    }

};

exports.handle_request = handle_request;