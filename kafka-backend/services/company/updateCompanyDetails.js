const connection = require("../../database/mysqlConnection");
const JobPostingsModel = require("../../models/JobPostingsModel");
async function handle_request(msg, callback) {

    const compId = msg.comp_id;

    try{
        let sql = 'UPDATE company_details SET comp_name="'+msg.comp_name+'", comp_size="'+msg.comp_size+ '", comp_type="'+msg.comp_type+ '", comp_website="';
        sql+= msg.comp_website + '" ,comp_revenue='+msg.comp_revenue+ ' ,comp_headquarters="'+msg.comp_headquaters+ '" ,comp_founded="'+msg.comp_founded;
        sql+='" ,comp_mission="'+msg.comp_mission+ '" ,comp_ceo="'+msg.comp_ceo+ '" ,comp_about="'+msg.comp_about+'" ,comp_work_culture="'+msg.comp_work_culture;
        sql+='" ,comp_value="'+msg.comp_value+ '" ,comp_description="'+msg.comp_description+'" ,comp_work_happiness='+msg.comp_work_happiness+' ,comp_learning=';
        sql+=msg.comp_learning+ ' ,comp_appreciation='+msg.comp_appreciation+ ' WHERE comp_id= '+ compId +';'

        await connection.con.query(sql, (err, results)=>{
            if(err){
                console.log(err);
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
