const connection = require("../../database/mysqlConnection");
const jobPostings = require("../../models/JobPostingsModel");

async function handle_request(msg, callback) {

    const job_location = msg.job_location;
    const job_title = msg.job_title;

    let jobCards;
    console.log("getSalariesByJobTitleLocation",job_title, job_location);
    try{
        jobCards = await jobPostings.find( {$and:[
            {job_title: {$regex: '.*'+job_title+'.*', $options: 'i'}},
            {"job_location.state": {$regex: '.*'+job_location+'.*', $options: 'i'}}
        ]})
        .exec();
        
        console.log(jobCards);
        const count = await await jobPostings.find( {$and:[
            {job_title: {$regex: '.*'+job_title+'.*', $options: 'i'}},
            {"job_location.state": {$regex: '.*'+job_location+'.*', $options: 'i'}}
        ]})
        .countDocuments();

        let totalSalary = 0
        jobCards.map((job) => {
            totalSalary = totalSalary + job.job_compensation
        })

        const data = {
            avgSalary : totalSalary/count,
            avgSalaryPerYear : totalSalary/count * 8 * 261,
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
