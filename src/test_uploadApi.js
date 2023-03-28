const uploadApi = require("./UploadApi");

uploadApi.streamUpload({
  // uploadType: "s3",
  sourceKey: "20230321/20230321.csv",
  sourceBucket: "bronifty.xyz",
  targetKey: "20230321.csv",
  targetBucket: "bronifty.xyz.target",
});
