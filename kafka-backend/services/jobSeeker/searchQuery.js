const connection = require("../../database/mysqlConnection");
const jobPostings = require("../../models/JobPostingsModel");

async function handle_request(msg, callback) {

    const searchQuery = msg.searchQuery;
    const location = msg.location;
    let jobCards;
    console.log("searchQuery",searchQuery, location);
    try{
        if(location===''){
            console.log("hello");
            jobCards = await jobPostings.find( {$or:[
                {job_title: {$regex: '.*'+searchQuery+'.*'}},
                {job_company_name: {$regex: '.*'+searchQuery+'.*'}}
            ]});
        }
        else{

            jobCards = await jobPostings.find( {$and:[
                {$or:[
                    {job_title: {$regex: '.*'+searchQuery+'.*'}},
                    {job_company_name: {$regex: '.*'+searchQuery+'.*'}}
                ]},
                {"job_location.state": location},
            ]});
        }
        console.log(jobCards);
        if(jobCards){
            callback(null, jobCards);
        }
        else{
            console.log(err);
            callback(null,[]);
        }

    } catch(err){
        console.log(err)
        callback({isError: true, error: err, status:500}, null);
    }
}

exports.handle_request = handle_request;
