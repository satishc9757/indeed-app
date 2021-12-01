const connection = require("../../database/mysqlConnection");
const JobPostingsModel = require("../../models/JobPostingsModel");
async function handle_request(msg, callback) {


    try{
        let sql = 'SELECT * FROM company_details;';

        await connection.con.query(sql, (err, results)=>{
            if(err){
                console.log(err);
                callback(null, []);
                
            }
            else{
                console.log(results);
                callback(null, results);
            }
        })

    } catch(err){
        callback({isError: true, error: err, status:500}, null);
    }
}

exports.handle_request = handle_request;
