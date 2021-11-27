const connection = require("../../database/mysqlConnection");
async function handle_request(msg, callback) {

    const date = Date.now();

    try{
        let sql = 'INSERT INTO messages (msg_content, msg_sender, msg_receiver, msg_sender_type,';
        sql += 'msg_receiver_type, msg_created_on, created_at, updated_at) VALUES ("'+msg.msgContent+'","';
        sql += msg.employerId+'","'+msg.jobSeekerId+'","'+msg.msgSenderType+'","'+msg.msgRecieverType+'",';
        sql += date+','+date+','+date+')';

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
