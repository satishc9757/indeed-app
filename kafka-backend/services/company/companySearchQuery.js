const connection = require("../../database/mysqlConnection");
async function handle_request(msg, callback) {
    const companySearchText = msg.companySearchText;
    const locationSearchText = msg.locationSearchText;

    const companyNameQuery = companySearchText && companySearchText !== "" ? "and C.comp_name like ? " : "";
    const locationQuery = locationSearchText && locationSearchText !== "" ? "and C.comp_headquarters like ? " : "";

    try{
        let sql = "select C.comp_id, C.comp_name, ROUND(avg(R.review_company_rating), 2) as comp_avg_rating "
                    +"from company_details as C, company_reviews as R "
                    +"where C.comp_id = R.review_company_id "
                    + companyNameQuery
                    + locationQuery
                    +"group by C.comp_id, C.comp_name ";

        let params = []

        if(companySearchText && companySearchText !== ""){
            params.push("%"+companySearchText+"%");
        }

        if(locationSearchText && locationSearchText !== ""){
            params.push("%"+locationSearchText+"%");
        }
        console.log("query : "+sql);
        console.log("params "+ params);
        await connection.con.query(sql, params, (err, results)=>{
            if(err){
                console.error("error in query : "+err);
                callback(null, { response_code: 500, response_data: "Something went wrong!", err});
            }
            else{
                callback(null, { response_code: 200, response_data: results});
            }
        })

    } catch(err){
        console.error("error : "+err);
        callback({isError: true, error: err, status:500}, null);
    }
}

exports.handle_request = handle_request;