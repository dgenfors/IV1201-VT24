const Application = require('../model/application');
const sql = require('./sql');
const { Pool } = require('pg');
const logs = require('./logsHandler')

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
  try {
    const client = await pool.connect();
    const data = await client.query(sql.listAllApplications());
    client.release();
    return data.rows;
  } catch (e) {
    logs.appendErrorLineToFile(e);
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
  try {
    const client = await pool.connect();
    const data = await client.query(sql.checkIfCredentialsMatch(username, password));
    if(!data.rows[0].exists){
      client.release();
      return {exists: data.rows[0].exists, role: null}
    }
    const roleResponse = await client.query(sql.checkRoleID(username))
    client.release();
    return {exists: data.rows[0].exists, role: roleResponse.rows[0].role_id};
  } catch (e) {
    logs.appendErrorLineToFile(e);
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
  try {
    const client = await pool.connect();
    const data = await client.query(sql.checkIfAnyFieldNotUsed(user.username, user.email, user.pnumbr));
    client.release();
    return data.rows[0];
  } catch (e) {
    console.log("Couldn't check if user doesn't exists")
    logs.appendErrorLineToFile(e);
    throw e;
  }
}

async function createAccount(userDTO) {
  try {
    const client = await pool.connect();
    const data = await client.query(sql.createNewAccount(userDTO));
    client.release();
    logs.appendEventLineToFile("Created account: " + userDTO.username);
    return true;
  } catch (e) {
    logs.appendErrorLineToFile(e);
    console.error(e);
    console.log("Couldn't create new account")
    throw e;
  }
}


async function createNewApplication(application, username) {
  try {
    const client = await pool.connect();
    const data = await client.query(sql.createNewApplication(application, username))
    client.release();
    logs.appendEventLineToFile("Created new application for user: " + username);
    return true
  } catch (e) {
    //console.error(e);
    logs.appendErrorLineToFile(e);
    console.log("Couldn't create a new application!\n\n" + e)
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


