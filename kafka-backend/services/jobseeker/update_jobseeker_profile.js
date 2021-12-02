const Jobseeker = require('../../models/JobSeekersModel');

async function handle_request(msg, callback) {
    console.log(msg.seeker_id)
    Jobseeker.updateOne({ seeker_id: msg.seeker_id }, {
    seeker_name: msg.seeker_name,
    seeker_email: msg.seeker_email,
    seeker_city: msg.seeker_city,
    seeker_state: msg.seeker_state,
    seeker_country: msg.seeker_country,
    seeker_age: msg.seeker_age,
    seeker_contact:msg.seeker_contact,
    seeker_resume_location: msg.seeker_resume_location,
    }).exec().then(doc => {
        console.log("Success update profile" + doc)
        let res={
            message: "Success",
            res: JSON.stringify(doc)
        }
        callback(null, res);
    }).catch(error => {
        console.log(error + "error update profile")
        callback({ isError: true, error: error, status: 500 });
    })
}
exports.handle_request = handle_request;