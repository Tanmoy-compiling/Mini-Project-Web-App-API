const multer = require('multer');
const { uploadFileToS3 } = require('../config/awsS3');

const upload = multer();

// Middleware to handle the file upload
exports.uploadFile = upload.single('file');

// Middleware to upload to S3 and attach URL to request
exports.uploadToS3 = async (req, res, next) => {
    if (req.file) {
        try {
            const bucketName = process.env.AWS_BUCKET_NAME;
            const fileUrl = await uploadFileToS3(req.file, bucketName, `notes`);
            req.fileUrl = fileUrl; // Attach the S3 URL to the request object
            next();
        } catch (error) {
            console.error('Error uploading file to S3:', error);
            res.status(500).send("Error uploading file.");
        }
    } else {
        next();
    }
};
