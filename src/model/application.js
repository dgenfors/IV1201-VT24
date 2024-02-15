const DB = require('../integration/database');

/**
 * Retrieves a list of all applications from the database.
 * @async
 * @function listAllApplications
 * @param {int} max - The maximum applications to list.
 * @returns {Promise<Array<ListAppDTO>>} A Promise that resolves with an array of application objects.
 */
async function listAllApplications(max) {
    return DB.listAllApplications();
}

/**
 * Submits a new application.
 * @function submitApplication
 * @param {ApplicationDTO} app - A DTO with all the information that is in the application.
 * @returns {Boolean} Boolean confirming the sucess.
 */
function submitApplication(app) {
    // Implementation for submitApplication
}

/**
 * Fetches application data.
 * @function fetchApplicationData
 * @param {String} user - Username of the user linked to the specific application.
 * @returns {ApplicationDTO} DTO containing all the information that is in the application.
 */
function fetchApplicationData(user) {
    // Implementation for fetchApplicationData
}

/**
 * Processes an application.
 * @function processApplication
 * @param {String} user - Username of the user linked to the specific application.
 * @param {String} status - The new status of the application
 * @returns {Boolean} Boolean confirming the sucess.
 */
function processApplication(user, status) {
    // submitApplication
}

module.exports = {
    listAllApplications,
    submitApplication,
    fetchApplicationData,
    processApplication
};
