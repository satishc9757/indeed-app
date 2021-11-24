const JobPostings = require('../../models/JobPostingsModel');


async function handle_request(msg, callback){

    const jobId = msg;
    //console.log("Inside getRes using mongo id"+resId);
    console.log("Debug : jobId : "+jobId)
    try{
        let jobPosting  = await JobPostings.findById(jobId);
        console.log("Debug : jobPosting : "+jobPosting)
        if(jobPosting){
            callback(null, { response_code: 200, response_data: jobPosting});
        } else{
            callback(null, { response_code: 200, response_data: {}});
        }


    } catch(err){
        console.error("getJobPosting : " + err);
        callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
    }

};

exports.handle_request = handle_request;