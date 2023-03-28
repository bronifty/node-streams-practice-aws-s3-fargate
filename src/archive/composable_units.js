require("dotenv").config();
const fs = require("fs");
const stream = require("stream");
const s3Client = require("./aws_client");
const { filesClient } = require("./files_api");

// Define the source and destination S3 buckets and keys
const sourceParams = {
  Bucket: process.env.BUCKET_SOURCE,
  Key: "file3.csv",
};

// Create a readable stream from the source S3 bucket
const s3ReadStream = s3Client.getObject(sourceParams).createReadStream();

// Create a pass-through stream for piping data from the readable stream to the writable stream
const passThrough = new stream.PassThrough();

const targetParams = {
  Bucket: process.env.BUCKET_TARGET,
  Key: "file3.csv",
};

// const filesS3Client = {
//   clientType: "files_api",
//   client: filesDotComBufferUpload,
// };

// const awsS3Client = {
//   clientType: "s3",
//   client: s3Client,
// };

function handleS3Upload(client, targetParams, passThrough) {
  // find out which client is being used - either s3 or files_api
  // let upload;
  // console.log(`s3Client: ${s3Client}`);
  // const { clientType, client } = s3Client;
  // if (clientType === "s3") {
  //   upload = s3Client.upload(
  //     {
  //       ...targetParams,
  //     },
  //     (error, data) => {
  //       if (error) {
  //         console.error(`Error uploading to destination bucket: ${error}`);
  //       } else {
  //         console.log(`Successfully uploaded file to ${data.Location}`);
  //       }
  //     }
  //   );
  // } else if (clientType === "files_api") {
  //   console.log(`client: ${client}`);
  //   // upload = upload({
  //   //   ...targetParams,
  //   // });
  // }

  s3ReadStream
    .on("data", () => {
      console.log("Started streaming from source bucket");
      client.upload(...targetParams, { Body: passThrough });
    })
    .on("error", (error) => {
      console.error(`Error streaming from source bucket: ${error}`);
    })
    .on("finish", () => {
      console.log(
        `Successfully transferred file from source bucket to destination bucket`
      );
    });
}

// Pipe the readable stream from the source S3 bucket to the pass-through stream
s3ReadStream
  .pipe(passThrough)
  .on("data", () => {
    console.log(`s3ReadStream piping to passThrough`);
    handleS3Upload(filesClient, targetParams, passThrough);
  })
  .on("error", (error) => {
    console.error(`Error with pass-through stream: ${error}`);
  })
  .on("finish", () => {
    console.log(`s3ReadStream finished streaming to passThrough`);
  });

// filesClient.upload(...targetParams);
