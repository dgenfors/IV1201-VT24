const Application = require('../model/application');
const sql = require('./sql');
const { Pool } = require('pg');

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
  } catch (error) {
    console.error("OPSIE, something went wrong :(", error);
    throw error;
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
    client.release();
    return data.rows[0];
  } catch (error) {
    console.log("Couldn't login!")
    console.error(error);
    throw error;
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
    return data.rows[0];
  } catch (error) {
    console.log("Couldn't check if user doesn't exists")
  }
}

async function createAccount(userDTO) {
  try {
    const client = await pool.connect();
    const data = await client.query(sql.createNewAccount(userDTO));
    return true;
  } catch (e) {
    console.error(e);
    console.log("Couldn't create new account")
  }
}


async function createNewApplication(application, username) {
  try {
    const client = await pool.connect();
    const data = await client.query(sql.createNewApplication(application, username))
    return true
  } catch (e) {
    //console.error(e);
    console.log("Couldn't create a new application!\n\n" + e)
  }
}

module.exports = {
  listAllApplications,
  login,
  checkIfNotUserExists,
  createAccount,
  createNewApplication
};


