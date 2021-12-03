const connection = require("../../database/mongoConnection");
const JobSeeker = require("../../models/JobSeekersModel");
const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  const jobId = msg.jobId;
  const jobSeekerId = msg.jobSeekerId;

  try {
    const seeker = await JobSeeker.findOne({
      _id: mongoose.Types.ObjectId(String(jobSeekerId)),
    });

    console.log(seeker.seeker_job_saved);
    let jobsArray = seeker.seeker_job_saved;

    if (jobsArray.length > 0) {
      jobsArray = jobsArray.filter((ele) => ele !== jobId);
    }

    console.log(jobsArray);
    const updatedJObSeeker = await JobSeeker.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(String(jobSeekerId)),
      },
      {
        $set: {
          seeker_job_saved: jobsArray,
        },
      },
      {
        new: true,
      }
    );

    callback(null, { message: "Successfully Deleted" });
  } catch (err) {
    console.log(err);
    callback({ isError: true, error: err, status: 500 }, null);
  }
}

exports.handle_request = handle_request;
