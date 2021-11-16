const mongoose = require('mongoose');
const schema = mongoose.Schema;

let jobPostingsSchema = new mongoose.Schema({
    jobCompanyId: {type: schema.ObjectId, required: true},
    jobTitle: {type: String, required: true},
    jobIndustry: {type: String, required: false},
    jobLocation: [{type: String, required: false}],
    jobWorkType: {type: String, required: false},
    jobSalaryDetails: {type: String, required: false},
    jobCompensation: {type: Number, required: false},
    jobWhatYouDo: {type: String, required: false},
    jobWhatYouLove: {type: String, required: false},
    jobWhatYouNeed: {type: String, required: false},
    jobCreatedAt: {type: Date, required: false},
});

const jobPostingsModel = mongoose.model('jobPostings', jobPostingsSchema);
module.exports = jobPostingsModel;
