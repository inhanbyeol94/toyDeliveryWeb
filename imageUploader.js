require('dotenv').config();
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3_SECRET_ACCESS_KEY, S3_ACCESS_KEY } = process.env;

AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const imageUploader = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'toydeliverycloud',
        key: (req, file, callback) => {
            callback(null, `profileImage/${req.session.user.member_id}_${file.originalname}`);
        },
        acl: 'public-read',
    }),
});

module.exports = imageUploader;
