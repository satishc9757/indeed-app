const connection = require("../../database/mysqlConnection");
async function handle_request(msg, callback) {

    const compId = msg.compId;
    const dept = msg.dept

    try{
        let sql = 'SELECT * FROM salary_reviews WHERE comp_id= "'+compId+'" and department="'+dept+'";';

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
