const uploadApi = require("../UploadApi");
const generateDateRangeArray = require("../GenerateDateRangeArray");

const dateRangeArray = generateDateRangeArray(2);
console.log(dateRangeArray);

dateRangeArray.forEach((date) => {
  uploadApi.streamUpload({
    // uploadType: "s3",
    sourceKey: `${date}/${date}.csv`,
    sourceBucket: "bronifty.xyz",
    targetKey: `${date}.csv`,
    targetBucket: "bronifty.xyz.target",
  });
});
// uploadApi.streamUpload({
//   // uploadType: "s3",
//   sourceKey: "20230321/20230321.csv",
//   sourceBucket: "bronifty.xyz",
//   targetKey: "20230321.csv",
//   targetBucket: "bronifty.xyz.target",
// });
