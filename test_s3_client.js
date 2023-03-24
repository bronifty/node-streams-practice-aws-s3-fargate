require('dotenv').config();
const s3Client = require('./aws_client');
const fs = require('fs');
const stream = require("stream");
const {uploadFile} = require('./files_api');



const sourceParams = {
  Bucket: process.env.BUCKET_SOURCE,
  Key: 'file1'
};

const destinationParams = {
  Bucket: process.env.BUCKET_TARGET,
  Key: 'file1'
};

// Create a readable stream from the source S3 bucket
const s3ReadStream = s3Client.getObject(sourceParams).createReadStream();

// Create a pass-through stream for piping data from the readable stream to the writable stream
const passThrough = new stream.PassThrough();

// Create a writable stream for the destination S3 bucket
uploadFile({ fileName: `${destinationParams.Bucket}/${destinationParams.Key}`, data: passThrough });


// s3Client.upload({
//   ...destinationParams,
//   Body: passThrough
// }, (error, data) => {
//   if (error) {
//     console.error(`Error uploading to destination bucket: ${error}`);
//   } else {
//     console.log(`Successfully uploaded file to ${data.Location}`);
//   }
// });

// Pipe the readable stream from the source S3 bucket to the pass-through stream
s3ReadStream.pipe(passThrough);

// Listen for 'error' events on the source S3 stream
s3ReadStream.on('error', (error) => {
  console.error(`Error streaming from source bucket: ${error}`);
});

// Listen for 'finish' and 'error' events on the pass-through stream
passThrough.on('finish', () => {
  console.log(`Successfully transferred file from source bucket to destination bucket`);
});

passThrough.on('error', (error) => {
  console.error(`Error with pass-through stream: ${error}`);
});
