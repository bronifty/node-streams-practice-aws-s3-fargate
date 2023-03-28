const s3Api = require("./s3Api2");
// const filesClient = require("./files_api_min");

// const readStream = s3Api.readStreamFromS3({
//   Bucket: "your_bucket",
//   Key: "your_key",
// });

// const { writeStream, upload } = s3Api.writeStreamToS3({
//   Bucket: "your_bucket",
//   Key: "your_key",
// });

s3Api.streamUpload({
  uploadType: "files",
  sourceKey: "file3.csv",
  sourceBucket: "bronifty.xyz",
  targetKey: "file3.csv",
  targetBucket: "bronifty.xyz.target",
});
