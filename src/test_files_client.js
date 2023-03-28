const fs = require("fs");
const { filesClient } = require("./files_api_upload");

// Usage example:
const Body = fs.createReadStream("../data/file3.csv");
filesClient.upload({ Key: "file3.csv", Body });
