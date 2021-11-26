const JobPostings = require('../../models/JobPostingsModel');
const ApplicationDetails = require('../../models/ApplicationDetailsModel');


async function handle_request(msg, callback){

    const compId = msg.compId;
    //console.log("Inside getRes using mongo id"+resId);
    // console.log("Debug : jobId : "+jobId)
    try{
        let lastYear = new Date().getFullYear() - 1;
        let jobStatsData  = await JobPostings.aggregate([
            { $match: { "job_company_id": compId } },
            { $lookup:{
                    from: "applicationdetails",
                    localField: "_id",
                    foreignField: "app_job_id",
                    as: "jobApplications"
                }
            },
            {
                $project: {
                    id : "$_id",
                    job_title: "$job_title",
                    job_company_name: "$job_company_name",
                    job_year: {$year: "$job_created_at"},
                    applicants_applied: {
                            $filter : {
                                input: "$jobApplications",
                                as : "jobApplication",
                                cond : {
                                    $eq: ["$$jobApplication.app_status","Submitted"]
                                }
                            }
                        },
                    applicants_selected: {
                            $filter : {
                                input: "$jobApplications",
                                as : "jobApplication",
                                cond : {
                                    $eq: ["$$jobApplication.app_status","Hired"]
                                }
                            }
                        },
                    applicants_rejected: {
                            $filter : {
                                input: "$jobApplications",
                                as : "jobApplication",
                                cond : {
                                    $eq: ["$$jobApplication.app_status","Rejected"]
                                }
                            }
                        }
                }
            },
            {$match: {job_year: lastYear}}
        ]);

        if(jobPosting){
            callback(null, { response_code: 200, response_data: jobStatsData});
        } else{
            callback(null, { response_code: 200, response_data: []});
        }


    } catch(err){
        console.error("getJobStats : " + err);
        callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
    }

};

exports.handle_request = handle_request;