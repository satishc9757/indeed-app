const jobSeeker = require("../../models/JobSeekersModel");
const mongoose = require("mongoose");
const jobPostings = require("../../models/JobPostingsModel");

async function handle_request(msg, callback) {
  const jobSeekerId = msg.jobSeekerId;
  try {
    const jobIds = await jobSeeker
      .findOne({
        seeker_id: jobSeekerId,
      })
      .select("seeker_job_saved");

    console.log(jobIds);
    // Array of job Objects
    let jobs = [];

    const existingJobs = await jobPostings.find();
    //TEmp array

    const jobMap = {};
    if(existingJobs.length > 0){
        existingJobs.forEach((job)=>{
            jobMap[job._id] = job;
        })
    }

    if (
      jobIds &&
      jobIds.seeker_job_saved &&
      jobIds.seeker_job_saved.length > 0
    ) {
      jobIds.seeker_job_saved.map((jobId) => {
        // Get details from job postings for each job Id
        jobs.push(jobMap[jobId]);
      });
    }

    console.log(jobs);
    callback(null, jobs);
  } catch (err) {
    console.error("getJobsByCompanyId : " + err);
    callback(null, {
      response_code: 500,
      response_data: "Something went wrong!",
      err,
    });
  }
}

exports.handle_request = handle_request;
