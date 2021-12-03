"use strict"
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const secret = "CMPE273";
const connection = require("../database/mysqlConnection");

function auth(){
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret,
    };
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            const user_id = jwt_payload._id;
            let sql = "SELECT * FROM login_details WHERE user_id="+user_id+";"
            connection.con.query(sql, (err, results)=>{
                if(err){
                    return callback(err, false);
                }
                if(results){
                    callback(null, results);
                }
                else{
                    callback(null, false);
                }

            });
        })
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session:false });