const fs = require('fs');
/**
 * Appends a specified string to the error log text file
 * @function appendErrorLineToFile
 * @param {String} line - The line that is logged to the errorLogs.txt log file
 */
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
/**
 * Appends a specified string to the event log text file
 * @function appendEventLineToFile
 * @param {String} line - The line that is logged to the eventLogs.txt log file
 */
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
/**
 * Appends a specified string to the request log text file
 * @function appendRequestLineToFile
 * @param {String} line - The line that is logged to the requestLogs.txt log file
 */
function appendReqLineToFile(req, res , next) {
    const line = '\nMethod: ' + JSON.stringify(req.method) +'\nSource: '+ JSON.stringify(req.headers['origin']) + '\nTarget: ' +  JSON.stringify(req._parsedUrl.pathname) +
    '\nCookies: ' + JSON.stringify(req.cookies) + '\n\n'
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
    next();
}
module.exports = {appendErrorLineToFile, appendReqLineToFile, appendEventLineToFile};
