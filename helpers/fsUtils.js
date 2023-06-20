const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

//  Function to write data to the JSON file given a destination which is the destination of the file you want to write to, and some content which is the content you want to write to that file 
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\n ${destination} has been updated`)
  );

//  Function to read data from a given a file which is the path to the file you want to save to, and append some content to that file
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
  };

  module.exports = { readFromFile, writeToFile, readAndAppend };