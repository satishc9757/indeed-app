const connection = require("../../database/mysqlConnection");
async function handle_request(msg, callback) {

    try{
        let sql = 'INSERT INTO messages (msg_content, msg_sender, msg_receiver, msg_sender_type, msg_receiver_type, msg_created_on, created_at, updated_at, msg_sender_name, msg_receiver_name) VALUES ("'+msg.msg_content+'" , '+msg.msg_sender+','+msg.msg_receiver+',"'+msg.msg_sender_type+'","'+msg.msg_receiver_type+'",now(), now(), now(),"'+msg.msg_sender_name+'", "'+msg.msg_receiver_name+'");'
        await connection.con.query(sql, (err, results)=>{
            if(err){
                callback(null, []);
            }
            else{
                callback(null, "Added Successfully!");
            }
        })

    } catch(err){
        callback({isError: true, error: err, status:500}, null);
    }
}

exports.handle_request = handle_request;
