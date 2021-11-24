const connection = require("../../database/mysqlConnection");
const jobPostings = require("../../models/JobPostingsModel");

async function handle_request(msg, callback) {

    const searchQuery = msg.searchQuery;
    console.log("searchQuery",searchQuery);
    try{
        let jobCards = await jobPostings.find( {$or:[
            {job_title: {$regex: '.*'+searchQuery+'.*'}},
            {job_location: searchQuery},
            {job_company_name: {$regex: '.*'+searchQuery+'.*'}}
        ]});
        if(jobCards){
            callback(null, jobCards);
        }
        else{
            console.log(err);
            callback(null,[]);
        }

    } catch(err){
        callback({isError: true, error: err, status:500}, null);
    }
}

exports.handle_request = handle_request;
