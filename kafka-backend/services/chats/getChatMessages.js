const connection = require("../../database/mysqlConnection");
async function handle_request(msg, callback) {

    const employerId = msg.employerId;
    const jobSeekerId = msg.jobSeekerId;

    try{
        let sql = 'SELECT * FROM messages WHERE msg_sender= "'+employerId+'" AND msg_receiver= "'+jobSeekerId+'";';

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
