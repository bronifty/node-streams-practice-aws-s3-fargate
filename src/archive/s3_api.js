const AWS = require("aws-sdk");
require("dotenv").config();
const fs = require("fs");
const stream = require("stream");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const S3 = new AWS.S3();

// Read stream for downloading from S3
function readStreamFromS3({ Bucket, Key }) {
  return S3.getObject({ Bucket, Key }).createReadStream();
}

// Write stream for uploading to S3
function writeStreamToS3({ Bucket, Key }) {
  const pass = new stream.PassThrough();

  return {
    writeStream: pass,
    upload: S3.upload({
      Key,
      Bucket,
      Body: pass,
    }).promise(),
  };
}
const streamUpload = async () => {
  // Stream to read the file from the bucket
  const readStream = readStreamFromS3({
    Key: "file3.csv",
    Bucket: "bronifty.xyz",
  });
  // Stream to upload to the bucket
  const { writeStream, upload } = writeStreamToS3({
    Bucket: "bronifty.xyz.target",
    Key: "file3.csv",
  });

  // Trigger the streams
  readStream.pipe(writeStream);
  // Wait for the file to upload
  await upload;
};
streamUpload();
// // Named export
// exports.S3 = S3;

// // Default export
// module.exports = S3;
