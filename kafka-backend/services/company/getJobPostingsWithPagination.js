const JobPostings = require('../../models/JobPostingsModel');


async function handle_request(msg, callback){

    const compId = msg.compId;
    const limit = msg.limit;
    const page = msg.page;
    //console.log("Inside getRes using mongo id"+resId);

    try{
        let jobPostings  = await JobPostings.find(
            {jobCompanyId: compId})
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();


        const count = await jobPostings.length;
        const data = {
                jobPostings,
                totalPages: Math.ceil(count / limit),
                currentPage: page
        };
        if(data){
            callback(null, { response_code: 200, response_data: data});
        } else{
            callback(null, { response_code: 200, response_data: {}});
        }



    } catch(err){
        console.error("getJobsByCompanyId : " + err);
        callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
    }

};

exports.handle_request = handle_request;