// Import the required modules
const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
});

const s3Client = new AWS.S3();
// Named export
exports.s3Client = s3Client;

// Default export
module.exports = s3Client;