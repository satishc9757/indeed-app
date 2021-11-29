const connection = require("../../database/mysqlConnection");
async function handle_request(msg, callback) {
    console.log("login", msg);
    try{
        var sql = "SELECT * FROM login_details where user_email='"+msg.email+"'";

        await connection.con.query(sql, (err, results)=>{
            if(err){
                callback(null, []);
            }
            else if(results && results.length>0){
                if(results[0].user_password === msg.password){
                    let userObj = {
                    "user_id": results[0].user_id, 
                    "user_email":results[0].user_email,
                    "user_type":results[0].user_type
                    }
                    callback(null, userObj);
                }
                else{
                    callback({ status:401 }, "Incorrect Password");            
                }
            }
            else{
                callback({status:401}, "No such User exists");
            }
        })

    } catch(err){
        callback({isError: true, error: err, status:500}, null);
    }
}

exports.handle_request = handle_request;
