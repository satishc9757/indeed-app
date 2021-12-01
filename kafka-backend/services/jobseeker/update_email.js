const Jobseeker = require('../../models/JobSeekersModel');

async function handle_request(msg, callback) {
    console.log(msg.seeker_id)
    Jobseeker.updateOne({ _id: msg.seeker_id }, {
    seeker_email: msg.seeker_email,
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