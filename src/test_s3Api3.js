const s3Api = require("./s3Api3");
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
  // uploadType: "s3",
  sourceKey: "20230321/20230321.csv",
  sourceBucket: "bronifty.xyz",
  targetKey: "20230321.csv",
  targetBucket: "bronifty.xyz.target",
});
