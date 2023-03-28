const uploadApi = require("./UploadApi");
const generateDateRangeArray = require("./generateDateRangeArray");

const dateRangeArray = generateDateRangeArray(7);
console.log(dateRangeArray);

dateRangeArray.forEach((date) => {
  try {
    uploadApi.streamUpload({
      // uploadType: "s3",
      sourceKey: `${date}/${date}.csv`,
      sourceBucket: "bronifty.xyz",
      targetKey: `${date}.csv`,
      targetBucket: "bronifty.xyz.target",
    });
  } catch (error) {
    console.error(`Error uploading ${date}:`, error);
    return;
  }
});
