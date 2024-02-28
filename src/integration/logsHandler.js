const fs = require('fs');

function appendErrorLineToFile(line) {
    const filePath = "integration/errorLogs.txt"
    const timestamp = new Date().toISOString();
    const content = `${timestamp}: ${line}\n`;
    fs.appendFile(filePath, content, (err) => {
        if (err) {
            console.error(`Error appending to file: ${err}`);
        } else {
            console.log('Line appended to file successfully.');
        }
    });
}
function appendEventLineToFile(line) {
    const filePath = "integration/eventLogs.txt"
    const timestamp = new Date().toISOString();
    const content = `${timestamp}: ${line}\n`;
    fs.appendFile(filePath, content, (err) => {
        if (err) {
            console.error(`Error appending to file: ${err}`);
        } else {
            console.log('Line appended to file successfully.');
        }
    });
}
function appendReqLineToFile(line) {
    const filePath = "integration/reqLogs.txt"
    const timestamp = new Date().toISOString();
    const content = `${timestamp}: ${line}\n`;
    fs.appendFile(filePath, content, (err) => {
        if (err) {
            console.error(`Error appending to file: ${err}`);
        } else {
            console.log('Line appended to file successfully.');
        }
    });
}
module.exports = {appendErrorLineToFile, appendReqLineToFile, appendEventLineToFile};
