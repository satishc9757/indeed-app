const connection = require("../../database/mysqlConnection");
async function handle_request(msg, callback) {

    const compId = msg.compId;

    try{
        let sql = 'SELECT * FROM company_details';

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
