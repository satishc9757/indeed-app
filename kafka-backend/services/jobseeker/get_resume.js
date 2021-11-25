const Jobseeker = require('../../models/JobSeekersModel');

async function handle_request(msg, callback) {
  console.log('inside get resume');
  const seeker_id = msg.seeker_id;
  console.log("message",msg)
  try {
    let jobseeker = await Jobseeker.findOne({ _id: seeker_id });
    callback(null, jobseeker.seeker_resume_location);
  } catch (err) {
    console.log(err);
    callback({ isError: true, error: err, status: 500 }, null);
  }
}

exports.handle_request = handle_request;