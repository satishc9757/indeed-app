const connection = require("../../database/mongoConnection");
const jobSeeker = require("../../models/JobSeekersModel");
const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  console.log("msg from save jobs", msg);

  const jobId = msg.jobId;
  const jobSeekerId = msg.jobSeekerId;
  try {
    const seeker = await jobSeeker.findOne({
      _id: jobSeekerId,
    });

    if (seeker.seeker_job_saved && seeker.seeker_job_saved.length > 0) {
      if (
        !seeker.seeker_job_saved.find((s) => {
          return s === jobId;
        })
      ) {
        const updatedJobSeeker = await jobSeeker.updateOne(
          { _id: jobSeekerId },
          {
            $push: {
              seeker_job_saved: jobId,
            },
          },
          { new: true }
        );

        callback(null, { message: "Job saved" });
      } else {
        callback(null, { message: "Job Already Saved" });
      }
    } else {
      const updatedJobSeeker = await jobSeeker.updateOne(
        { _id: jobSeekerId },
        {
          $push: {
            seeker_job_saved: jobId,
          },
        },
        { new: true }
      );
      callback(null, { message: "Job saved" });
    }
  } catch (err) {
    console.log(err);
    callback({ isError: true, error: err, status: 500 }, null);
  }
}

exports.handle_request = handle_request;
