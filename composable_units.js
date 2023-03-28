require('dotenv').config();
const s3Client = require('./aws_client');
const fs = require('fs');
const stream = require("stream");
const {uploadFile} = require('./files_api');

// Define the source and destination S3 buckets and keys
const sourceParams = {
  Bucket: process.env.BUCKET_SOURCE,
  Key: 'file3.csv'
};

const destinationParams = {
  Bucket: process.env.BUCKET_TARGET,
  Key: 'file3.csv'
};

// Create a readable stream from the source S3 bucket
const s3ReadStream = s3Client.getObject(sourceParams).createReadStream();

// Create a pass-through stream for piping data from the readable stream to the writable stream
const passThrough = new stream.PassThrough();

function handleS3Upload(s3Client, destinationParams, passThrough) {
  s3ReadStream.on('data', () => {
    console.log('Started streaming from source bucket');
    s3Client.upload({
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
}


// Pipe the readable stream from the source S3 bucket to the pass-through stream
s3ReadStream.pipe(passThrough)
  .on('data', () => {
    console.log(`s3ReadStream piping to passThrough`);
    handleS3Upload(s3Client, destinationParams, passThrough) 
  })
  .on('error', (error) => {
  console.error(`Error with pass-through stream: ${error}`);
})
.on('finish', () => {
  console.log(`s3ReadStream finished streaming to passThrough`);
});