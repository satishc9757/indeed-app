const mongoose = require('mongoose');
const schema = mongoose.Schema;

let jobPostingsSchema = new mongoose.Schema({
    _id: {type: schema.ObjectId, required:true},
    job_company_id: {type: String, required: true},
    job_company_name: {type: String, required:true},
    job_id: {type: String, required: true},
    job_title: {type: String, required: true},
    job_industry: {type: String, required: false},
    job_location: {type: Array, required: true},
    job_work_type: {type: String, required: true},
    job_salary_details: {type: String, required: false},
    job_compensation: {type: Number, required: true},
    job_what_you_do: {type: String, required: true},
    job_what_you_love: {type: String, required: false},
    job_what_you_need: {type: String, required: true},
    job_created_at: {type: Date, required: true},
    job_company_rating: {type: Number}
});

const jobPostingsModel = mongoose.model('jobPostings', jobPostingsSchema);
module.exports = jobPostingsModel;
