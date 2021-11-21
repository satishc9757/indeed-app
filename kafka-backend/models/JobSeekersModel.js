const mongoose = require('mongoose');
const schema = mongoose.Schema;

let jobSeekersSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    seeker_name: {type: String, required: true},
    seeker_email: {type: String, required: true},
    seeker_city: {type: String, required: false},
    seeker_state: [{type: String, required: false}],
    seeker_country: {type: String, required: true},
    seeker_age: {type: Number, required: false},
    seeker_contact: {type: String, required: true},
    seeker_resume_location: {type: String, required: true},
    seeker_job_applied: {type: Array, required: false},
    seeker_job_saved: {type: Array, required: false},
    seeker_created_at: {type: Date, required: true},
});

const jobSeekersModel = mongoose.model('jobSeekers', jobSeekersSchema);
module.exports = jobSeekersModel;