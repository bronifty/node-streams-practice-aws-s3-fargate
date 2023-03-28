const fs = require("fs");
const Files = require("files.com/lib/Files").default;
const File = require("files.com/lib/models/File").default;
require("dotenv").config();
const FILES_API_KEY = process.env.FILES_API_KEY;
const FILES_SUBDOMAIN = process.env.FILES_SUBDOMAIN;
Files.setBaseUrl(`https://${FILES_SUBDOMAIN}.files.com`);
Files.setApiKey(FILES_API_KEY);

class FilesClient {
  async upload({ Key, Body }) {
    await File.uploadData(Key, Body);
  }
}
const filesClient = new FilesClient();

module.exports = filesClient;

// Usage example:
// const Body = fs.createReadStream("./file3.csv");
// filesClient.upload({ Key: "file3.csv", Body });
