const mongoose = require('mongoose');
const schema = mongoose.Schema;

let jobPostingsSchema = new mongoose.Schema({
    job_company_id: {type: schema.ObjectId, required: true},
    job_title: {type: String, required: true},
    job_industry: {type: String, required: false},
    job_location: [{type: String, required: false}],
    job_work_type: {type: String, required: false},
    job_salary_details: {type: String, required: false},
    job_compensation: {type: Number, required: false},
    job_what_you_do: {type: String, required: false},
    job_what_you_love: {type: String, required: false},
    job_what_you_need: {type: String, required: false},
    job_created_at: {type: Date, required: false},
});

const jobPostingsModel = mongoose.model('jobPostings', jobPostingsSchema);
module.exports = jobPostingsModel;
