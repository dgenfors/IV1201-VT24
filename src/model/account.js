const DB = require('../integration/database')


function createAccount(){
    // Implementation for createAccount
}

async function login(req){
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Basic ')) {
        const credentials = authHeader.split(' ')[1];
        const decodedCredentials = Buffer.from(credentials, 'base64').toString('ascii');
        const [username, password] = decodedCredentials.split(':');
        return DB.login(username, password);
    }
}
module.exports = {
    createAccount,
    login
};
