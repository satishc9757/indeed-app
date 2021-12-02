const connection = require("../../database/mysqlConnection");
const Jobseeker = require('../../models/JobSeekersModel');
const Employer = require('../../models/EmployersModel');
const bcrypt = require("bcrypt");
const saltRounds = 10;


async function handle_request(msg, callback) {
    console.log("signup", msg);
    let len = 0;
    try{

        var sql = "SELECT * FROM login_details";

        await connection.con.query(sql, async(err, results)=>{
            if(err){
                callback({isError: true, error: err, status:500}, null);
            }
            else{
                len = await results.length;

                const hashPassword = await bcrypt.hash(msg.password, saltRounds);

                var user;
                if(msg.user_type==='employer'){
                    user = await new Employer({
                        emp_id: len+1,
                        emp_name: msg.name,
                        emp_email: msg.email,
                        emp_role: msg.role,
                        emp_city: msg.city,
                        emp_state: msg.state,
                        emp_country: msg.country,
                        emp_contact: msg.contact,
                        emp_company_id: msg.company_id,
                        emp_created_on: Date.now(),
                        emp_updated_on: Date.now(),
                    })
                }
                else{
                    user = await new Jobseeker({
                        seeker_id: len+1,
                        seeker_name: msg.name,
                        seeker_email: msg.email,
                        seeker_city: msg.emp_city,
                        seeker_state: msg.state,
                        seeker_country: msg.country,
                        seeker_age: msg.age,
                        seeker_contact: msg.contact,
                        seeker_resume_location: msg.seeker_resume_location || "",
                        seeker_job_applied: [],
                        seeker_job_saved: [],
                        seeker_created_at: Date.now(),
                    });
                }
                sql = "INSERT INTO login_details (user_id, user_email, user_password, user_type,created_at, updated_at)";
                sql += "VALUES ("+ String(len+1)+", '"+msg.email+"', '"+hashPassword+"', '"+msg.user_type+"',"+Date.now()+","+Date.now()+");"
                
                await connection.con.query(sql, async(error, add)=>{
                    if(error){
                        console.log(error)
                        callback({isError: true, error: error, status:500}, null);
                    }
                    else{
                        const saveUser = await user.save();
                        if(saveUser){
                                                
                            callback(null, "Added Successfully");
                        }
                        else{
                            callback({status: 401}, "Invalid Data");
                        }
                    }
                });
                    
            }
        });
    } catch(err){
        callback({isError: true, error: err, status:500}, null);
    }
}

exports.handle_request = handle_request;
