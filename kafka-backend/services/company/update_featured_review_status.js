
const connection = require("../../database/mysqlConnection");
async function handle_request(msg, callback){

    
console.log("Inside update feature status"+msg);

    try{
        let sql = 'update company_reviews set review_is_featured='+msg.review_status+' where review_company_id="'+msg.review_company_id+'" and review_id='+msg.review_id+';';
    
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