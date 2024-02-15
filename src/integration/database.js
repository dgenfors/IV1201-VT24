
const Application = require('../model/application');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'hiphop2',
    password: 'kali',
    port: 5433, // Default PostgreSQL port
  });
  

    async function listAllApplications(){
        try{
            const client = await pool.connect();
        
            const data = await client.query('SELECT name FROM person')
        
            client.release();
            return data.rows;
          }catch {
            console.error("OPSIE, something went wrong :(")
          }
    }
    async function login(username, password){
      try{
          const client = await pool.connect();
          const data = await client.query('SELECT EXISTS(SELECT 1 FROM person WHERE username=\'' + username + '\' AND password=\'' + password + '\');');
          client.release();
          return data.rows;
        }catch(e) {
          console.error(e)
        }
  }
module.exports = {
    listAllApplications,
    login
}



