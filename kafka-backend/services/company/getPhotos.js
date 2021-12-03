const Photos = require("../../models/Photos")
async function handle_request(msg, callback) {
  console.log('inside');
  const compId = msg.compId;
  console.log("message",msg)
  //console.log(Reviews);
  try {
    let photos = await Photos.find({ where: { comp_id: compId },offset: msg.offset, limit: 1000 });
    //console.log('reviews', reviews);
    callback(null, photos);
  } catch (err) {
    console.log(err);
    callback({ isError: true, error: err, status: 500 }, null);
  }
}

exports.handle_request = handle_request;
