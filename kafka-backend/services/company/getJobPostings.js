const JobPostings = require('../../models/JobPostingsModel');


async function handle_request(msg, callback){

    const compId = msg.compId;
    console.log("Inside getRes using mongo id"+compId);

    try{
        let jobPostings  = await JobPostings.find({job_company_id: compId});

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