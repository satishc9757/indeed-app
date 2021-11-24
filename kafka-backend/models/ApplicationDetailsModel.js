const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const AddressSchema = require('./AddressModel');

let applicationDetailsSchema = new mongoose.Schema({
    app_job_id: {type: ObjectId, required: true},
    app_job_seeker_id: {type: ObjectId, required: true},
    app_date: {type: Date, required: true},
    app_name: {type: String, required: true},
    app_email: {type: String, required: true},
    app_gender: {type: String, required: true},
    app_address: {type: AddressSchema, required: false},
    app_resume_link: {type: String, required: true},
    app_cover_letter_link: {type: String, required: true},
    app_status: {type: String, required: true},
    app_created_on: {type: Date, required: false},
    app_updated_on: {type: Date, required: false},
});

const applicationDetailsModel = mongoose.model('applicationDetails', applicationDetailsSchema);
module.exports = applicationDetailsModel;
