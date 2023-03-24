import stream from "stream";
import AWS from "aws-sdk";
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

// Sharp resize stream
function streamToSharp(width) {
  return sharp().resize(width);
}

export const handler: S3Handler = async (event) => {
  const s3Record = event.Records[0].s3;

  // Grab the filename and bucket name
  const Key = s3Record.object.key;
  const Bucket = s3Record.bucket.name;

  // Check if the file has already been resized
  if (Key.startsWith(prefix)) {
    return;
  }

  // Create the new filename with the dimensions
  const newKey = `${prefix}-${Key}`;

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

export default handler;








function readStreamFromS3({ Bucket, Key }) {
  return S3.getObject({ Bucket, Key }).createReadStream();
}
const readStream = readStreamFromS3({ Key, Bucket });


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

const { writeStream, upload } = writeStreamToS3({
  Bucket,
  Key
});

// Trigger the streams
readStream.pipe(resizeStream).pipe(writeStream);

// Wait for the file to upload
await upload;


const handlerFunction = ({Bucket, Key}) => {
  // Stream to read the file from the bucket
  const readStream = readStreamFromS3({ Key, Bucket });
  // Stream to write the file to the local file system
  
  
}