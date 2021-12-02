const Jobseeker = require('../../models/JobSeekersModel');

async function handle_request(msg, callback) {
    Jobseeker.updateOne({ seeker_id: msg.seeker_id }, {
    
    seeker_resume_location: "",
    
    }).exec().then(doc => {
        console.log("Success delete resume" + doc)
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