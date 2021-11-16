const JobPostings = require('../../models/JobPostingsModel');


async function handle_request(msg, callback){

    const resId = msg.resId;
    //console.log("Inside getRes using mongo id"+resId);

    try{
        let jobPostings  = await JobPostings.find({jobCompanyId: compId});

        if(jobPostings){
            callback(null, { response_code: 200, response_data: jobPostings});
        } else{
            callback(null, { response_code: 200, response_data: {}});
        }


    } catch(err){
        console.error("getJobsByCompanyId : " + err);
        callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
    }

};

exports.handle_request = handle_request;