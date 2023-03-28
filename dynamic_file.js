const s3Client = require("./aws_client");
const { generateDateRangeArray } = require("./date");

const dateRange = generateDateRangeArray(7);
// console.log(dateRange);

// loop over the dateRange array and for each date, list the files in the folder
dateRange.forEach((date) => {
  const params = {
    Bucket: "bronifty.xyz",
    Prefix: `${date}/`,
  };

  s3Client.listObjectsV2(params, (err, data) => {
    if (err) {
      console.error(`Error reading contents of the folder: ${err}`);
    } else {
      console.log("Contents of the folder:");
      data.Contents.forEach((content) => {
        if (content.Key.endsWith(".csv")) {
          console.log(`File: ${content.Key}`);
        }
        // console.log(`File: ${content.Key}`);
      });
    }
  });
});

// const params = {
//   Bucket: "bronifty.xyz",
//   Prefix: "20230327/",
// };

// s3Client.listObjectsV2(params, (err, data) => {
//   if (err) {
//     console.error(`Error reading contents of the folder: ${err}`);
//   } else {
//     console.log("Contents of the folder:");
//     data.Contents.forEach((content) => {
//       console.log(`File: ${content.Key}`);
//     });
//   }
// });
