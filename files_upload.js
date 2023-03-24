// import Files from "files.com/lib/Files";
const Files = require("files.com/lib/Files").default;
const File = require("files.com/lib/models/File").default;
const Folder = require("files.com/lib/models/Folder").default;
const { LogLevel } = require("files.com/lib/Logger").default;
require("dotenv").config();
// dotenv.config();
const FILES_API_KEY = process.env.FILES_API_KEY;
const FILES_SUBDOMAIN = process.env.FILES_SUBDOMAIN;
// set your subdomain or custom domain
Files.setBaseUrl(`https://${FILES_SUBDOMAIN}.files.com`);
Files.setApiKey(FILES_API_KEY);
Files.setLogLevel(LogLevel.INFO);
Files.configureDebugging({
  // enable debug logging of API requests (default: false)
  debugRequest: false,

  // enable debug logging of API response headers (default: false)
  debugResponseHeaders: false,
});
Files.configureNetwork({
  // max retries (default: 3)
  maxNetworkRetries: 3,

  // minimum delay in seconds before retrying (default: 0.5)
  minNetworkRetryDelay: 0.5,

  // max delay in seconds before retrying (default: 1.5)
  maxNetworkRetryDelay: 1.5,

  // network timeout in seconds (default: 30.0)
  networkTimeout: 30.0,

  // auto-fetch all pages when results span multiple pages (default: `true`)
  autoPaginate: true,
});
const listDirFiles = async () => {
  const dirFiles = await Folder.listFor("/");
  console.log("dirFiles: ", dirFiles);
};
// listDirFiles();

// async function to upload a file
const uploadFile = async ({ destinationFileName, sourceFilePath }) => {
  await File.uploadFile(destinationFileName, sourceFilePath);
};
// uploadFile({
//   destinationFileName: "test.txt",
//   sourceFilePath: "./examplefile",
// });
// console.log("Files API Key: ", FILES_API_KEY);
// console.log("test");

module.exports = {
  uploadFile,
};
