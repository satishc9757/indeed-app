const mongoose = require('mongoose');
const schema = mongoose.Schema;

let EmployersSchema = new mongoose.Schema({
    emp_id: {type: Number, required: true},
    emp_name: {type: String, required: true},
    emp_email: {type: String, required: true},
    emp_role: {type: String, required: true},
    emp_city: {type: String, required: false},
    emp_state: {type: String, required: false},
    emp_country: {type: String, required: false},
    emp_contact: {type: String, required: false},
    emp_company_id: {type: Number, required: true},
    emp_created_on: {type: Date, required: false},
    emp_updated_on: {type: Date, required: false},
});

const EmployersModel = mongoose.model('Employers', EmployersSchema);
module.exports = EmployersModel;
