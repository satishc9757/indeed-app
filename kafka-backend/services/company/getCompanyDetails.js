const connection = require("../../database/mysqlConnection");
const JobPostingsModel = require("../../models/JobPostingsModel");
async function handle_request(msg, callback) {

    const compId = msg.compId;
    console.log("compid ",compId);

    try{
        let sql = 'SELECT * FROM company_details WHERE comp_id= '+ compId +';'

        await connection.con.query(sql, async(err, results)=>{
            console.log("err ", err, results)
            if(err){
                callback(null, []);
            }
            else{
//                 sql = 'UPDATE company_details SET count ='+results[0]['count']+1+' WHERE comp_id='+compId+';'
                // await connection.con.query(sql,(error, res)=>{
                //     if(error){
                //         callback(null, [])
                //     }
                //     else{   
                //         callback(null, results);
                //     }
                // })
                callback(null, results)
            }
        })

    } catch(err){
        callback({isError: true, error: err, status:500}, null);
    }
}

exports.handle_request = handle_request;
