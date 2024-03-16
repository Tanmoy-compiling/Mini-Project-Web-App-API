require('dotenv').config();
const { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

async function verifyS3Connection() {
    try {
        // Use the S3 `listBuckets` method to check connectivity. This doesn't require any specific bucket name.
        const response = await s3Client.send(new ListBucketsCommand({}));
        console.log('Successfully connected to AWS S3. Buckets:', response.Buckets.map(bucket => bucket.Name));
    } catch (error) {
        console.error('Failed to connect to AWS S3:', error);
    }
}

verifyS3Connection();

module.exports = { s3: s3Client };