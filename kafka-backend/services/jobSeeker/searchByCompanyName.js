const connection = require("../../database/mysqlConnection");

async function handle_request(msg, callback) {

    const searchQuery = msg.searchQuery;
    try{
        let sql = 'SELECT * FROM company_details WHERE comp_name LIKE "'+searchQuery+'%"';
        await connection.con.query(sql, (err, results)=>{
            if(err){
                callback(null, results);
            }
            else{
                callback(null, results);
            }
        });

    } catch(err){
        callback({isError: true, error: err, status:500}, null);
    }
}

exports.handle_request = handle_request;
