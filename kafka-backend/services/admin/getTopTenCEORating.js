const connection = require("../../database/mysqlConnection");
async function handle_request(msg, callback) {

    try{
        let sql = 'select comp_id, comp_ceo, avg_ceo_ratings from (select review_company_id, sum_of_ceo_rating/count_of_total_reviews as avg_ceo_ratings from (select review_company_id, count(*) as count_of_total_reviews, sum(ceo_rating) as sum_of_ceo_rating from company_reviews group by review_company_id) as A  order by sum_of_ceo_rating desc LIMIT 10) as B left join (select comp_id, comp_ceo from company_details) C on B.review_company_id = C.comp_id ';

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
