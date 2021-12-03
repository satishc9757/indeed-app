const Photos = require('../../models/Photos');
var mongoose = require('mongoose');

async function handle_request(msg, callback){
    
    console.log("Inside MarkPhotoAsInappropriate",JSON.stringify(msg.photo_id));

    try{
        await Photos.findOne({_id : msg.photo_id}, async(err, photo) => {
            if(err){
                callback(err, {error : "photo not found"})
            }
            if(photo){
                photo.inappropriate = 1
        
                photo.save()
                .then(() => callback(null, photo) )
                .catch(err => callback(null, {error : "Could not update details"}))
            }
            else {
                callback(null, {error : "photo not found"})
            }
            })
      }
      catch(err){
        console.log(err)
      }
};

exports.handle_request = handle_request;