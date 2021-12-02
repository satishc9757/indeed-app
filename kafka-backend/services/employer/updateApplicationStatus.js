const ApplicationDetails = require('../../models/ApplicationDetailsModel');

async function handle_request(msg, callback){
  const data = msg;
  var response = await ApplicationDetails.findOneAndUpdate(
    {_id: data.app_id},
    {
        $set: {
            app_status: data.app_status
        }
    },
    {new: true},
    (err, result) => {
        if(err){
          console.error("Err in updateApplicationStatus : " + err);
          callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
        } else {
            callback(null, { response_code: 200, response_data : result});

        }
    });

};

exports.handle_request = handle_request;