const connection = require("../../database/mysqlConnection");
async function handle_request(msg, callback) {
    console.log("here is the data received",msg)
    const compId = msg.compId;
    const dept = msg.dept
    

    try{
        let sql = 'SELECT distinct(salary_job_title),avg(salary_pay) as avg_salary,category,salary_job_location FROM salary_reviews WHERE salary_company_id= '+compId+' group by category,salary_job_title';
        
        await connection.con.query(sql, (err, results)=>{
            console.log(results)
            if(err){
                console.log("err",err)
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
