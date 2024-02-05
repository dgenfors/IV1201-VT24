
const Application = require('../model/application');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'hiphop2',
    password: '1234',
    port: 5432, // Default PostgreSQL port
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
module.exports = {
    listAllApplications
}



