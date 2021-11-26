var rpc = new (require("./kafkarpc"))();

//make request to kafka
function make_request(queue_name, msg_payload, callback) {
  console.log("in make request");
  console.log(msg_payload, queue_name);
  rpc.makeRequest(queue_name, msg_payload, function (error, response) {
    console.log("post make request ")
    if (error) {
      console.log("make request error "+ error)
      callback(error, null);
    } else {
      console.log("response post make request", response);
      callback(null, response);
    }
  });
}

exports.make_request = make_request;
