const connection = require("../../database/mysqlConnection");
async function handle_request(msg, callback) {

    try{
        let sql = 'select DATE_FORMAT(review_date, "%d-%m-%Y") as review_date, count(*) as count_of_total_reviews from company_reviews group by DATE_FORMAT(review_date, "%d-%m-%Y") ';

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
