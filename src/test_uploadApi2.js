const uploadApi = require("./UploadApi");
const generateDateRangeArray = require("./GenerateDateRangeArray");

const dateRangeArray = generateDateRangeArray(10);
console.log(dateRangeArray);

const uploadPromises = dateRangeArray.map((date) => {
  return uploadApi.streamUpload({
    // uploadType: "s3",
    sourceKey: `${date}/${date}.csv`,
    sourceBucket: "bronifty.xyz",
    targetKey: `${date}.csv`,
    targetBucket: "bronifty.xyz.target",
  });
});

Promise.all(uploadPromises)
  .then(() => {
    console.log("All files uploaded successfully.");
  })
  .catch((error) => {
    console.error("Error uploading files:", error);
  });
