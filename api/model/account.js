const DB = require('../integration/database');
const jwt = require('jsonwebtoken');

/**
 * Creates a new user account.
 * @async
 * @function createAccount
 * @param {UserDTO} user - A UserDTO containing all needed information that will be saved about the user.
 * @returns {Promise<Object>} Returns a object with a succes field which marks the success or failure of creation and field for email, pnr, username that will show if they are used already in database.
 */
async function createAccount(user) {
    try{
        const data = await DB.checkIfNotUserExists(user.body.user)
        if (data.success){
            const accCreated = await DB.createAccount(user.body.user)
            if(accCreated && data.success){
                return {success: true}
            }
        }
        return data;
    }catch(e){
        console.error(e)
        throw e
    }
}

/**
 * Authenticates a user based on the provided username and password.
 * @async
 * @function login
 * @param {Object} req - The request object containing the user's credentials.
 * @returns {Promise<Object>} A Promise that resolves with an object containing a JWT token and user information if authentication is successful; otherwise, resolves with the result of the authentication attempt.
 */
async function login(req) {
    const { username, password } = req.body;
    try {
        const user = await DB.login(username, password);
        console.log("account user:"+JSON.stringify(user))
        if (user.exists) {
            console.log()
            const token = jwt.sign({ username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30m' });
            return { token, user };
        }
        return false;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createAccount,
    login
};
