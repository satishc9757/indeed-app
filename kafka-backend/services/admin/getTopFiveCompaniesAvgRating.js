const connection = require("../../database/mysqlConnection");
async function handle_request(msg, callback) {

    try{
        let sql = 'select comp_id, comp_name, avg_company_ratings from (select review_company_id, sum_of_company_ratings/count_of_total_reviews as avg_company_ratings from (select review_company_id, count(*) as count_of_total_reviews, sum(review_company_rating) as sum_of_company_ratings from company_reviews group by review_company_id) as A  order by avg_company_ratings desc LIMIT 5) as B left join (select comp_id, comp_name from company_details) C on B.review_company_id = C.comp_id';
        
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
