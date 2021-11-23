const Employer = require('../../models/EmployersModel');


async function handle_request(msg, callback){

    
    //console.log("Inside getRes using mongo id"+resId);

    try{
        await Employer.updateOne({_id:msg._id},msg,(err,results)=>{

            if(err){
                callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
            }
            else{
                callback(null, { response_code: 200, response_data: jobPostings});
            }
        });


    } catch(err){
        console.error("getJobsByCompanyId : " + err);
        callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
    }

};

exports.handle_request = handle_request;