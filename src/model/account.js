const DB = require('../integration/database');
const jwt = require('jsonwebtoken');

/**
 * Creates a new user account.
 * @async
 * @function createAccount
 * @param {UserDTO} user - A UserDTO containing all needed information that will be saved about the user.
 * @returns {Promise<Object>} Returns a object with a succes field which marks the succes or failure of creation and field for email, pnr, username that will show if they are used already in database.
 */
async function createAccount(user) {
    try{
        const data = await DB.checkIfNotUserExists(user.body.user)
        console.log("does account exist: " + data.success)
        if (data.success){
            const accCreated = DB.createAccount(user.body.user)
            if(accCreated && data.success){
                return {success: false}
            }
        }
        return data;
    }catch(e){
        console.error(e)
    }
   
    // Implementation for createAccount
}

/**
 * Authenticates a user based on the provided username and password.
 * @async
 * @function login
 * @param {Object} req - The request object containing the user's credentials.
 * @param {string} req.body.username - The username of the user attempting to log in.
 * @param {string} req.body.password - The password of the user attempting to log in.
 * @returns {Promise<Object>} A Promise that resolves with an object containing a JWT token and user information if authentication is successful; otherwise, resolves with the result of the authentication attempt.
 */
async function login(req) {
    const { username, password } = req.body;
    try {
        const user = await DB.login(username, password);
        if (user.exists) {
            const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '300' });
            return { token, user };
        }
        return user;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    createAccount,
    login
};
