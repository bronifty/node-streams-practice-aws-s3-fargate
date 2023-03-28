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

// for (const date of dateRangeArray) {
//   try {
//     uploadApi.streamUpload({
//       uploadType: "s3",
//       sourceKey: `${date}/${date}.csv`,
//       sourceBucket: "bronifty.xyz",
//       targetKey: `${date}.csv`,
//       targetBucket: "bronifty.xyz.target",
//     });
//   } catch (error) {
//     console.log(error);
//     continue;
//   }
// }
// dateRangeArray.forEach(async (date) => {
//   try {
//     await uploadApi.streamUpload({
//       // uploadType: "s3",
//       sourceKey: `${date}/${date}.csv`,
//       sourceBucket: "bronifty.xyz",
//       targetKey: `${date}.csv`,
//       targetBucket: "bronifty.xyz.target",
//     });
//   } catch (error) {
//     continue;
//   }
// });
