const mongoose = require('mongoose');
const schema = mongoose.Schema;

let EmployersSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    emp_name: {type: String, required: true},
    app_email: {type: String, required: true},
    emp_role: {type: String, required: true},
    emp_address: {type: String, required: false},
    emp_company_id: {type: String, required: true},
    emp_created_on: {type: Date, required: false},
    emp_updated_on: {type: Date, required: false},
});

const EmployersModel = mongoose.model('Employers', EmployersSchema);
module.exports = EmployersModel;
