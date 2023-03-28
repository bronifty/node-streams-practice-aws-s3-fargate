const AWS = require("aws-sdk");
require("dotenv").config();
const fs = require("fs");
const stream = require("stream");
const filesClient = require("./FilesClient");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});
const S3 = new AWS.S3();

class S3Api {
  // Read stream for downloading from S3
  readStreamFromS3({ Bucket, Key }) {
    return S3.getObject({ Bucket, Key }).createReadStream();
  }

  // Write stream for uploading to S3
  writeStreamToS3({ Bucket, Key }) {
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
  writeStreamToFiles({ Bucket, Key }) {
    const pass = new stream.PassThrough();
    // filesClient.upload({ Key: "file3.csv", Body });
    return {
      writeStream: pass,
      upload: filesClient.upload({
        Key,
        Bucket,
        Body: pass,
      }),
    };
  }

  async streamUpload({
    uploadType = "files",
    sourceKey,
    sourceBucket,
    targetKey,
    targetBucket,
  }) {
    // Stream to read the file from the bucket
    const readStream = this.readStreamFromS3({
      Key: sourceKey,
      Bucket: sourceBucket,
    });
    // Stream to upload to the bucket
    let writeStreamGlobal, uploadGlobal;
    if (uploadType === "s3") {
      console.log("uploading to s3");

      const { writeStream, upload } = this.writeStreamToS3({
        Key: targetKey,
        Bucket: targetBucket,
      });
      writeStreamGlobal = writeStream;
      uploadGlobal = upload;
    } else if (uploadType === "files") {
      console.log("uploading to files");
      const { writeStream, upload } = this.writeStreamToFiles({
        Key: targetKey,
        Bucket: targetBucket,
      });
      writeStreamGlobal = writeStream;
      uploadGlobal = upload;
    }
    // Trigger the streams
    readStream.pipe(writeStreamGlobal);
    // Wait for the file to upload
    await uploadGlobal;
  }
}

// Usage example:
const s3Api = new S3Api();
module.exports = s3Api;
