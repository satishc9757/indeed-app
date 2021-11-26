const connection = require("../../database/mysqlConnection");
async function handle_request(msg, callback) {

    try{
        let sql = 'select comp_id, comp_name, count_of_total_reviews from (select review_company_id, count(*) as count_of_total_reviews from company_reviews group by review_company_id order by count_of_total_reviews desc LIMIT 5) A left join (select comp_id, comp_name from company_details) B on A.review_company_id = B.comp_id';

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
