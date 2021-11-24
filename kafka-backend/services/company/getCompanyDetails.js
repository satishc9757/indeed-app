const connection = require("../../database/mysqlConnection");
const JobPostingsModel = require("../../models/JobPostingsModel");
async function handle_request(msg, callback) {

    const compId = msg.compId;
    const jobId = msg.jobId;

    try{
        let results = await jobPostingsModel.find({$and:[
            {job_id:jobId}, 
            {job_company_id:compId}
        ]});
        if(results){
            callback(null, results);
        }
        else{
            callback(null, []);
        }

    } catch(err){
        callback({isError: true, error: err, status:500}, null);
    }
}

exports.handle_request = handle_request;
