const Employer = require('../../models/EmployersModel');

var mongoose = require('mongoose');
async function handle_request(msg, callback){

    
    console.log("Inside update employer",msg);

    await Employer.updateOne({ emp_id: msg.emp_id }, {
        $set: {
            emp_name: msg.emp_name,
            emp_id: msg.emp_id,
            emp_city: msg.emp_city,
            emp_state: msg.emp_state,
            emp_country: msg.country,
            emp_role: msg.role
            
        }
    },
            (err, result) => {
                if(err){
                  console.error("Err in update Employer details : " + err);
                  callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
                } else {
                    callback(true, { response_code: 200, response_data : "Exmployer status updated successfully"});
        
                }
            }).clone();
};

exports.handle_request = handle_request;