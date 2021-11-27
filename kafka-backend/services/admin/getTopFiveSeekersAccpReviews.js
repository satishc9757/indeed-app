const connection = require("../../database/mysqlConnection");
async function handle_request(msg, callback) {

    try{
        let sql = 'select review_user_id, count(*) as count_of_accepted_reviews from company_reviews where inappropriate <> 1 group by review_user_id order by count_of_accepted_reviews LIMIT 5 ';

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
