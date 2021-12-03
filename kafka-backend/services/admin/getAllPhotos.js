const Photos = require('../../models/Photos');

async function handle_request(msg, callback){

    console.log("Inside Phots using mongo id");

    try{
        let photos  = await Photos.find();

        if(photos){
            callback(null, { photos: photos});
        } else{
            callback(null, { response_code: 200, response_data: {}});
        }


    } catch(err){
        console.error("photosError : " + err);
        callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
    }

};

exports.handle_request = handle_request;