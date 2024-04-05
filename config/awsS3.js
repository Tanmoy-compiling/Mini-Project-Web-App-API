require('dotenv').config();
const { S3Client, ListBucketsCommand, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

async function verifyS3Connection() {
    try {
        const response = await s3Client.send(new ListBucketsCommand({}));
        console.log('Successfully connected to AWS S3. Buckets:', response.Buckets.map(bucket => bucket.Name));
    } catch (error) {
        console.error('Failed to connect to AWS S3:', error);
    }
}

verifyS3Connection();

async function uploadFileToS3(file, bucketName, keyPrefix) {
  const key = `${keyPrefix}/${Date.now()}_${file.originalname}`;
  const command = new PutObjectCommand
    Bucket: bucketName,({
    Key: key,
    Body: file.buffer,
    ACL: 'public-read',
  });
  await s3Client.send(command);
  return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

module.exports = { s3: s3Client, uploadFileToS3 };
