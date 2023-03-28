import AWS from "aws-sdk";
import stream from "stream";
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

const handler = async ({ Bucket, Key }) => {
  // Stream to read the file from the bucket
  const readStream = readStreamFromS3({ Key, Bucket });
  // Stream to resize the image
  const resizeStream = streamToSharp(width);
  // Stream to upload to the bucket
  const { writeStream, upload } = writeStreamToS3({
    Bucket,
    Key: newKey,
  });

  // Trigger the streams
  readStream.pipe(resizeStream).pipe(writeStream);

  // Wait for the file to upload
  await upload;
};

module.exports = handler;

