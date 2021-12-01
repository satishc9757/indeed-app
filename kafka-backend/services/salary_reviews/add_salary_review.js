const connection = require("../../database/mysqlConnection");
async function handle_request(msg, callback) {

    console.log(msg)
    try{
        let sql = `insert into salary_reviews(salary_user_id,salary_company_id,salary_is_working,salary_end_date,salary_job_title,salary_job_location,salary_pay,salary_workex,salary_paid_timeoff,salary_health_insurance,salary_retirement,salary_other_benifits,category,other_benifits) values("${msg.salary_user_id}","${msg.salary_company_id}",${msg.salary_is_working},"${msg.salary_end_date}","${msg.salary_job_title}","${msg.salary_job_location}",${msg.salary_pay},${msg.salary_workex},${msg.salary_paid_timeoff},${msg.salary_health_insurance},${msg.salary_retirement},${msg.salary_other_benifits},"${msg.category}","${msg.other_benifits}");`;

        await connection.con.query(sql, (err, results)=>{
            console.log(results)
            if(err){
                console.log(err)
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
