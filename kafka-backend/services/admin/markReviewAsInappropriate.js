const connection = require("../../database/mysqlConnection");
async function handle_request(msg, callback) {
    const review_id = msg.review_id;
    try{
        let sql = 'update company_reviews set inappropriate = 1 where review_id = "'+review_id+'"';

        await connection.con.query(sql, (err, results)=>{
            if(err){
                callback(null, []);
            }
            else{
                callback(null, results);
            }
        })

    } catch(err){
        callback({isError: true, error: err, status:500}, null);
    }
}

exports.handle_request = handle_request;
