const fs = require("fs");
const filesClient = require("./files_api");

// Usage example:
const Body = fs.createReadStream("../data/file4.csv");
filesClient.upload({ Key: "file4.csv", Body });
