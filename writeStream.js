// Import the required modules
const AWS = require('aws-sdk');
const fs = require('fs');

// Configure the AWS SDK
AWS.config.update({
  accessKeyId: 'your_access_key_id',
  secretAccessKey: 'your_secret_access_key',
  region: 'your_region'
});

// Create an instance of the S3 client
const s3 = new AWS.S3();

// Define the S3 bucket, key, and local file path
const params = {
  Bucket: 'your_bucket_name',
  Key: 'your_file_key'
};
const localFilePath = 'local_file_path.ext';

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
