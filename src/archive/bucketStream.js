// Import the required modules
const AWS = require('aws-sdk');
const fs = require('fs');
const stream = require("stream");
require('dotenv').config();

// Configure the AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
});

// Create an instance of the S3 client
const s3 = new AWS.S3();

// Define the source and destination S3 buckets and keys
const sourceParams = {
  Bucket: process.env.BUCKET_SOURCE,
  Key: 'file2'
};

const destinationParams = {
  Bucket: process.env.BUCKET_TARGET,
  Key: 'file2'
};

// Create a readable stream from the source S3 bucket
const s3ReadStream = s3.getObject(sourceParams).createReadStream();

// Create a pass-through stream for piping data from the readable stream to the writable stream
const passThrough = new stream.PassThrough();

// Listen for the s3ReadStream data event and log to the console when it starts
s3ReadStream.on('data', () => {
  console.log('Started streaming from source bucket');
  s3.upload({
    ...destinationParams,
    Body: passThrough
  }, (error, data) => {
    if (error) {
      console.error(`Error uploading to destination bucket: ${error}`);
    } else {
      console.log(`Successfully uploaded file to ${data.Location}`);
    }
  });
}).on('error', (error) => {
  console.error(`Error streaming from source bucket: ${error}`);
}).on('finish', () => {
  console.log(`Successfully transferred file from source bucket to destination bucket`);
});

// Pipe the readable stream from the source S3 bucket to the pass-through stream
s3ReadStream.pipe(passThrough)
  .on('data', () => {
    console.log(`s3ReadStream piped to passThrough`);
  })
  .on('error', (error) => {
  console.error(`Error with pass-through stream: ${error}`);
})
.on('finish', () => {
  console.log(`s3ReadStream finished streaming to passThrough`);
});
