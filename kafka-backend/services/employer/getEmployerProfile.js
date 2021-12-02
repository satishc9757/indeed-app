const Employer = require('../../models/EmployersModel')

async function handle_request(msg, callback) {
  console.log('inside get employer' + msg.empID);
  const empID = msg.empID;
  console.log("message",msg)
  try {
    let employer = await Employer.find({ emp_id: empID });
    //console.log('employer', employer);
    callback(null, employer);
  } catch (err) {
    console.log(err);
    callback({ isError: true, error: err, status: 500 }, null);
  }
}

exports.handle_request = handle_request;