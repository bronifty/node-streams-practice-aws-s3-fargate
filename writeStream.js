// Import the required modules
const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv').config();

// Configure the AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
});

// Create an instance of the S3 client
const s3 = new AWS.S3();

// Define the S3 bucket, key, and local file path
const params = {
  Bucket: process.env.BUCKET_SOURCE,
  Key: 'file1'
};
const localFilePath = './data/file1';

// Create a readable stream from the S3 bucket
const s3Stream = s3.getObject(params).createReadStream();

// Create a writable stream for the local file
const localFileStream = fs.createWriteStream(localFilePath);

// Pipe the readable stream from the S3 bucket to the writable stream of the local file
s3Stream.pipe(localFileStream);

// Listen for 'finish' and 'error' events
s3Stream.on('error', (error) => {
  console.error(`Error streaming from S3: ${error}`);
});

localFileStream.on('finish', () => {
  console.log(`Successfully downloaded file from S3 to ${localFilePath}`);
});

localFileStream.on('error', (error) => {
  console.error(`Error writing to local file: ${error}`);
});
