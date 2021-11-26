// const {uploadFile} = require('../aws/s3/FileUpload')
// const { unlinkSync } = require('fs');
// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;

var kafka = require('../kafka/client');
const connection = require('../database/mysqlConnection');
const MessagesModel = require('../models/MessagesModel');
// const jwt = require('jsonwebtoken');
// const { secret } = require('../jwt/config');
// const { auth } = require("../jwt/passport");
// auth();


exports.addChatMessage = async function (req,res){
    try {
        kafka.make_request("addChatMessage", req.body, (err, resp) => {
            if (err || !resp) {
              console.log(err);
                res
                .status(500)
                .send(JSON.stringify({ message: 'Something went wrong!', error: err }));
            }
            else{
                res
                .status(200)
                .end(JSON.stringify(resp));
            }
        });

    }catch (err) {
        res
        .status(500)
        .send(JSON.stringify({ message: 'Something went wrong!', error: err }));
    }
};


exports.getChatMessage = async function (req,res){

    try {
        kafka.make_request("getChatMessage", req.query, (err, resp) => {
            if (err || !resp) {
              console.log(err);
                res
                .status(500)
                .send(JSON.stringify({ message: 'Something went wrong!', error: err }));
            }
            else{
                res
                .status(200)
                .end(JSON.stringify(resp));
            }
        });
        
    } catch (err) {
        res
        .status(500)
        .send(JSON.stringify({ message: 'Something went wrong!', error: err }));
    }
};

