const fs = require("fs");
const path = require("path");

const filename = "20230328.csv";
const sizeLimit = 2 * 1024 * 1024 * 1024; // 2 GB
const header = ["Column1", "Column2", "Column3", "Column4", "Column5"];

function generateRow() {
  return [
    Math.floor(Math.random() * 100000),
    (Math.random() * 100).toFixed(2),
    ["A", "B", "C", "D", "E"][Math.floor(Math.random() * 5)],
    ["X", "Y", "Z"][Math.floor(Math.random() * 3)],
    Math.floor(Math.random() * 1000),
  ].join(",");
}

fs.writeFileSync(filename, header.join(",") + "\n");

while (fs.statSync(filename).size < sizeLimit) {
  fs.appendFileSync(filename, generateRow() + "\n");
}
