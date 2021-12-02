const Jobseeker = require('../../models/JobSeekersModel');
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require('path');

const s3 = new aws.S3({
    // accessKeyId: 'AKIAXUKC3TYXL6D6T2QM',
    // secretAccessKey: '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',
    // Bucket: 'uber-bucket-kd'
    //-----------------------add s3 details--------------------------------------------
   });

   function checkFileType( file, cb ){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|pdf/;
    // Check ext
    const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
    // Check mime
    const mimetype = filetypes.test( file.mimetype );if( mimetype && extname ){
        return cb( null, true );
    } else {
        cb( 'Error: Images Only!' );
    }
    }

const profileImgUpload = multer({
    storage: multerS3({
     s3: s3,
     bucket: 'indeed-bucket-273',
     acl: 'public-read',
     key: function (req, file, cb) {
      cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
     }
    }),
    limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function( req, file, cb ){
     checkFileType( file, cb );
    }
   }).single('profileImage');

async function handle_request(req, res) {
    console.log("-------------------"+req)
    profileImgUpload(req, res, (error) => {
        console.log('requestOkokok', req.file);
        console.log('requestOkokok', req.body);
        if (error) {
            console.log('errors', error);
            res.json({ error: error });
        } else {
            // If File not found
            if (req.file === undefined) {
                //console.log( 'Error: No File Selected!' );
                res.json('Error: No File Selected');
            } else {
                // If Success
                const imageLocation = req.file.location;// Save the file name into database into profile model
                const ID = req.file.ID;
                Jobseeker.findOneAndUpdate({ "seeker_id": msg.seeker_id }, {
                    "seeker_resume_location": imageLocation
                })
                    .exec().then(doc => {
                    console.log("Success add resume" + doc)
                    let res={
                        message: "Success",
                        res: JSON.stringify(doc)
                    }
                    callback(null, res);
                }).catch(error => {
                    callback({ isError: true, error: error, status: 500 });
                })
            }
        }
    })
};

exports.handle_request = handle_request;