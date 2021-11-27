const JobPostings = require('../../models/JobPostingsModel');
// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;

async function handle_request(msg, callback){

    //console.log("Inside getRes using mongo id"+resId);
    const data = msg;
    try{
        let jobPosting  = new JobPostings({
            job_company_id: data.job_company_id,
            job_title: data.job_title,
            job_industry: data.job_industry,
            job_location: {
                street: data.job_street,
                city: data.job_city,
                state: data.job_state,
                zipcode: data.job_zipcode,
                country: data.job_country,
            },
            job_work_type: data.job_work_type,
            job_salary_details: data.job_salary_details,
            job_compensation: data.job_compensation,
            job_what_you_do: data.job_what_you_do,
            job_what_you_love: data.job_what_you_love,
            job_what_you_need: data.job_what_you_need,
            job_created_at: new Date(),
            job_company_rating: data.rating
        });

        jobPosting.save((err, result) => {
            if(err){
                console.error("Error in createJobPostings : " + err);
                callback(null,{ response_code: 500, response_data: "Something went wrong!", err: err});
            } else {

                callback(null, { response_code: 200,
                    response_data: { message: "Job posting created successfully" }});
            }
        });

    } catch(err){
        console.error("Error in createJobPostings : " + err);
        callback(null,{ response_code: 500, response_data: "Something went wrong!", err: err});
    }

};

exports.handle_request = handle_request;