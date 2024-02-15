const DB = require('../integration/database')
const jwt = require('jsonwebtoken');


async function createAccount(){
    // Implementation for createAccount
}

async function login(req){
    const { username, password } = req.body;
    try{
       const user =  await DB.login(username, password);
       if(user.exists){
        const token = jwt.sign({username}, process.env.JWT_SECRET, { expiresIn: '1d' });
        return { token, user };
       }
       return user
    }catch(err){
        console.log(err)
    }  
    
}
module.exports = {
    createAccount,
    login
};
