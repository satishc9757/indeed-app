const connection = require("../../database/mysqlConnection");
const jobPostings = require("../../models/JobPostingsModel");

async function handle_request(msg, callback) {

    const searchQuery = msg.searchQuery;
    const location = msg.location;
    const limit = msg.limit;
    const page = msg.page;
    let jobCards;
    console.log("searchQuery",searchQuery, location);
    try{
        if(location===''){
            console.log("hello");
            jobCards = await jobPostings.find( {$or:[
                {job_title: {$regex: '.*'+searchQuery+'.*', $options: 'i'}},
                {job_company_name: {$regex: '.*'+searchQuery+'.*', $options: 'i'}}
            ]})
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        }
        else{

            jobCards = await jobPostings.find( {$and:[
                {$or:[
                    {job_title: {$regex: '.*'+searchQuery+'.*', $options: 'i'}},
                    {job_company_name: {$regex: '.*'+searchQuery+'.*', $options: 'i'}}
                ]},
                {"job_location.state": {$regex: location, $options:'i'}},
            ]})
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        }
        console.log(jobCards);
        const count = await jobPostings.countDocuments();
        const data = {
            jobCards,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        };
        console.log("data", data);
        if(jobCards){
            callback(null, data);
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
