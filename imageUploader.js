require('dotenv').config();
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3_SECRET_ACCESS_KEY, S3_ACCESS_KEY } = process.env;
const path = require('path');

AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp', '.gif'];

const imageUploader = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'toydeliverycloud',
        key: (req, file, callback) => {
            // const extension = path.extname(file.originalname);
            // if (!allowedExtensions.includes(extension)) throw new CustomError('지원하지 않는 파일 확장자 입니다.', 406);
            callback(null, `profileImage/${req.session.user.member_id}_${file.originalname}`);
        },
        acl: 'public-read',
    }),
});

module.exports = imageUploader;
