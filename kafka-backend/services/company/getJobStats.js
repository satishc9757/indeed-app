const JobPostings = require('../../models/JobPostingsModel');
const ApplicationDetails = require('../../models/ApplicationDetailsModel');


async function handle_request(msg, callback){

    const compId = msg.compId;
    //console.log("Inside getRes using mongo id"+resId);
    // console.log("Debug : jobId : "+jobId)
    try{
        let lastYear = new Date().getFullYear();
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
                    job_location: "$job_location",
                    job_created_at: {$dateToString: {date: "$job_created_at", format: "%d-%m-%Y %H:%M:%S"}},
                    job_year: {$year: "$job_created_at"},
                    applicants_applied:  { $size : {
                            $filter : {
                                input: "$jobApplications",
                                as : "jobApplication",
                                cond : {
                                    $eq: ["$$jobApplication.app_status","Submitted"]
                                }
                            }
                        }
                    },
                    applicants_selected:  { $size : {
                            $filter : {
                                input: "$jobApplications",
                                as : "jobApplication",
                                cond : {
                                    $eq: ["$$jobApplication.app_status","Hired"]
                                }
                            }
                        }
                    },
                    applicants_rejected:  { $size : {
                            $filter : {
                                input: "$jobApplications",
                                as : "jobApplication",
                                cond : {
                                    $eq: ["$$jobApplication.app_status","Rejected"]
                                }
                            }
                        }
                    }
                }
            },
            {$match: {job_year: lastYear}}
        ]);

        if(jobStatsData){
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