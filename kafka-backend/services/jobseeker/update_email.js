const Jobseeker = require('../../models/JobSeekersModel');

async function handle_request(msg, callback) {
    console.log(msg.seeker_id)
    Jobseeker.find({ seeker_email: msg.seeker_email }).exec().then(doc =>
    { console.log(doc.length) 
        if (doc.length === 0) {
        Jobseeker.updateOne({ seeker_id: msg.seeker_id }, {
    seeker_email: msg.seeker_email,
    }).exec().then(doc => {
        console.log("Success email" + doc)
        let res={
            message: "Success",
            res: JSON.stringify(doc)
        }
        callback(null, res);
    }).catch(error => {
        console.log(error + "error update profile")
        callback({ isError: true, error: error, status: 500 });
    })
        } else {
            let res={
            message: "Fail",
            res: "Duplicate Email"
        }
            console.log("okokok")
             callback(null, res);
            // callback({ isError: true, error: "Duplicate Email", status: 500 });
    }
    
        })
}
exports.handle_request = handle_request;