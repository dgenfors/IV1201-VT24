const Application = require('../model/application');
const sql = require('./sql');
const { Pool } = require('pg');
const logs = require('./logsHandler')
const beginTransaction = 'BEGIN'
const endTranscation = 'COMMIT'
const rollbackTransaction =  'ROLLBACK'

/**
 * Represents a pool of connections to a PostgreSQL database.
 * @type {Pool}
 */
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'hiphop2',
  password: '1234',
  port: 5432, // Default PostgreSQL port
});

/**
 * Retrieves a list of all applications from the database.
 * @async
 * @function listAllApplications
 * @returns {Promise<Array<Object>>} A Promise that resolves with an array of application objects.
 * @throws {Error} Throws an error if there is an issue executing the query.
 */
async function listAllApplications() {
  const client = await pool.connect();
  try {
    await client.query(beginTransaction)
    const data = await client.query(sql.listAllApplications());
    await client.query(endTranscation)
    client.release();
    return data.rows;
  } catch (e) {
    logs.appendErrorLineToFile(e);
    await client.query(rollbackTransaction)
    throw e;
  }
}

/**
 * Authenticates a user based on username and password.
 * @async
 * @function login
 * @param {string} username - The username of the user to authenticate.
 * @param {string} password - The password of the user to authenticate.
 * @returns {Promise<Object>} A Promise that resolves with an object representing the authentication.
 * @throws {Error} Throws an error if there is an issue executing the query.
 */
async function login(username, password) {
  const client = await pool.connect();
  try {
    await client.query(beginTransaction)
    const data = await client.query(sql.checkIfCredentialsMatch(username, password));
    await client.query(endTranscation)
    if(!data.rows[0].exists){
      client.release();
      return {exists: data.rows[0].exists, role: null}
    }
    const roleResponse = await client.query(sql.checkRoleID(username))
    client.release();
    return {exists: data.rows[0].exists, role: roleResponse.rows[0].role_id};
  } catch (e) {
    logs.appendErrorLineToFile(e);
    await client.query(rollbackTransaction)
    throw e;
  }
}


/**
 * Queries the database for already existing userdata, and adds data if account can be created.
 * @async
 * @function createAccount
 * @param {userDTO} user - A DTO with the soon-to-be-user's data.
 * @returns {Promise<Object>} A Promise that resolves with an object containing the resulting rows of the query
 * @throws {Error} Throws an error if there is an issue executing the query.
 */
async function checkIfNotUserExists(user) {
  const client = await pool.connect();
  try {
    await client.query(beginTransaction)
    const data = await client.query(sql.checkIfAnyFieldNotUsed(user.username, user.email, user.pnumbr));
    await client.query(endTranscation)
    client.release();
    return data.rows[0];
  } catch (e) {
    console.log("Couldn't check if user doesn't exists")
    logs.appendErrorLineToFile(e);
    await client.query(rollbackTransaction)
    throw e;
  }
}
/**
 * Asynchronously creates a new account.
 * 
 * @param {userDTO} userDTO - The user data transfer object containing information for creating the account.
 * @returns {Promise<boolean>} - A Promise that resolves to true if the account is created successfully.
 * @throws {Error} - If an error occurs during the account creation process.
 */
async function createAccount(userDTO) {
  const client = await pool.connect();
  try {
    await client.query(beginTransaction)
    await client.query(sql.createNewAccount(userDTO));
    await client.query(endTranscation)
    client.release();
    logs.appendEventLineToFile("Created account: " + userDTO.username);
    return true;
  } catch (e) {
    logs.appendErrorLineToFile(e);
    console.error(e);
    console.log("Couldn't create new account")
    await client.query(rollbackTransaction)
    throw e;
  }
}

/**
 * Asynchronously creates a new application for a user.
 * 
 * @param {applicationDTO} application - The application object containing information for the new application.
 * @param {string} username - The username of the user for whom the application is being created.
 * @returns {Promise<boolean>} - A Promise that resolves to true if the application is created successfully.
 * @throws {Error} - If an error occurs during the application creation process.
 */
async function createNewApplication(application, username) {
    const client = await pool.connect();
  try {
    await client.query(beginTransaction)
    for (let i = 0; i < application.competence.length; i++) 
      await client.query(sql.createCompetence(application.competence[i].exp, username));
    for (let i = 0; i < application.competence.length; i++) 
      await client.query(sql.createComp_profile(application.competence[i], username));
    for (let i = 0; i < application.availability.length; i++) 
      await client.query(sql.createAvailability(application.availability[i], username));
    await client.query(endTranscation)
    client.release();
    logs.appendEventLineToFile("Created new application for user: " + username);
    return true
  } catch (e) {
    //console.error(e);
    logs.appendErrorLineToFile(e);
    console.log("Couldn't create a new application!\n\n" + e)
    await client.query(rollbackTransaction)
    throw e;
  }
}

module.exports = {
  listAllApplications,
  login,
  checkIfNotUserExists,
  createAccount,
  createNewApplication
};


