
const connection = require("../../database/mysqlConnection");
async function handle_request(msg, callback){

    
console.log("Inside update feature status"+msg);

    try{
        let sql = 'update company_reviews set found_helpful=found_helpful+'+msg.helpful+', found_not_helpful=found_not_helpful+'+msg.not_helpful+' where review_id='+msg.review_id+';';
        console.log(sql)
        await connection.con.query(sql, (err, results)=>{
            if(err){
              console.log("error ",err)
                callback(err,null);
            }
            else{
              console.log("results",results)
                callback(null, results);
            }
        })
    } catch(err){
        console.error("getJobsByCompanyId : " + err);
        callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
    }

};

exports.handle_request = handle_request;