const connection = require("../../database/mysqlConnection");
async function handle_request(msg, callback) {

    const compId = msg.compId;
    const dept = msg.dept

    try{
        let sql = 'select salary_job_title,avg(salary_pay) from salary_reviews where salary_company_id="'+compId+'" and category="'+dept+'" group by salary_job_title;';

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
