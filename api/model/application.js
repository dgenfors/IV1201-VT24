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
async function submitApplication(app) {
    try{
        const db = await DB.createNewApplication(app.body.application , app.user.username)
        return db
    }catch(e){
        throw e;
    }
}

/**
 * Fetches application data.
 * @function fetchApplicationData
 * @param {String} user - Username of the user linked to the specific application.
 * @returns {ApplicationDTO} DTO containing all the information that is in the application.
 * @todo Implement this function.
 * @deprecated This function is not implemented, do not use
 */
function fetchApplicationData(user) {

}

/**
 * Processes an application.
 * @function processApplication
 * @param {String} user - Username of the user linked to the specific application.
 * @param {String} status - The new status of the application
 * @returns {Boolean} Boolean confirming the success.
 * @todo Implement this function.
 * @deprecated This function is not implemented, do not use
 */
function processApplication(user, status) {

}


module.exports = {
    listAllApplications,
    submitApplication,
    /*fetchApplicationData,
    processApplication*/
};
