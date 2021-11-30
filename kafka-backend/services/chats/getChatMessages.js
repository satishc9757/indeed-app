const connection = require("../../database/mysqlConnection");
async function handle_request(msg, callback) {

    const id = msg.id;

    try{
        let sql = 'SELECT * FROM messages WHERE msg_sender= "'+id+'" OR msg_receiver= "'+id+'" order by msg_created_on;';

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
