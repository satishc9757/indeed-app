const Reviews = require('../../models/CompanyReviewsModel')


async function handle_request(msg, callback){

    const resId = msg.resId;
    //console.log("Inside getRes using mongo id"+resId);

    try{
        await Reviews.find({_id:msg._id,review_is_featured:true},(err,results)=>{

            if(err){
                callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
            }
            else{
                callback(null, { response_code: 200, response_data: results});
            }
        });

    } catch(err){
        console.error("getJobsByCompanyId : " + err);
        callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
    }

};

exports.handle_request = handle_request;