const ApplicationDetails = require('../../models/ApplicationDetailsModel');
const jobPostings = require('../../models/JobPostingsModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

async function handle_request(msg, callback){

    //console.log("Inside getRes using mongo id"+resId);
    const data = msg;
    try{
        let application  = new ApplicationDetails({
            app_job_id: ObjectId(data.app_job_id),
            app_job_seeker_id: Number(data.app_job_seeker_id),
            app_date: new Date(),
            app_name: data.app_name,
            app_email: data.app_email,
            app_gender: data.app_gender,
            app_address: {
                street: data.app_street,
                city: data.app_city,
                state: data.app_state,
                zipcode: data.app_zipcode,
                country: data.app_country,
            },
            app_resume_link: data.app_resume_link,
            app_cover_letter_link: data.app_cover_letter_link,
            app_status: "Submitted",
            app_created_on: new Date(),
            app_updated_on: new Date(),
        });

        application.save((err, result) => {
            if(err){
                console.error("Error in createJobApplication : " + err);
                callback(null,{ response_code: 500, response_data: "Something went wrong!", err: err});
            } else {
                var res = await jobPostings.findOneAndUpdate({"_id":ObjectId(data.app_job_id)},{$inc:{job_applicants:1}});
                callback(null, { response_code: 200,
                    response_data: { message: "Job application created successfully" }});
            }
        });

    } catch(err){
        console.error("Error in createJobApplication : " + err);
        callback(null,{ response_code: 500, response_data: "Something went wrong!", err: err});
    }

};

exports.handle_request = handle_request;