const s3Api = require("./s3_api");
const filesClient = require("./files_api_min");

const readStream = s3Api.readStreamFromS3({
  Bucket: "your_bucket",
  Key: "your_key",
});

const { writeStream, upload } = s3Api.writeStreamToS3({
  Bucket: "your_bucket",
  Key: "your_key",
});
