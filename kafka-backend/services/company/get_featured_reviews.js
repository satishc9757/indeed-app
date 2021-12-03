const Reviews = require("../../models/CompanyReviewsModel");
const connection = require("../../database/mysqlConnection");


async function handle_request(msg, callback) {
  console.log('inside');
  
  console.log("message",msg)
  //console.log(Reviews);
  try {
    let sql = 'SELECT * FROM company_reviews WHERE review_company_id= '+msg+' and review_is_featured=1';
    await connection.con.query(sql, (err, results)=>{
      if(err){
        console.log("error ",err)
          callback(err,null);
      }
      else{
        console.log("results",results)
          callback(null, JSON.stringify(results));
      }
  })

  } catch (err) {
    console.log(err);
    callback({ isError: true, error: err, status: 500 }, null);
  }
}

exports.handle_request = handle_request;
