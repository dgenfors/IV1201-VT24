# Project Overview.
This is the server part of an application following the MVVM pattern,
you can find the front end part @https://github.com/dgenfors/iv1201-vt24-frontend

Index is the entry point of the server from there the requests are routed to the folder apireq
where the different requets are handled. Unauthorized.js file is the only file in the folder that will not 
go through authentication via the file `authJWT.js`

In the folder model there is two files, one handles the accounts of users(`account.js`) the other file(`application.js`) 
handles the application part of the application.

The `database.js` file manages all communication between the backend and the database infrastructure. It leverages the pg framework, renowned for its ease of use, allowing seamless connectivity by establishing a connection to the database via `client = pool.connect`. This connection establishment occurs prior to each query execution. Subsequently, queries are executed using `client.query`. Each function within the database is designed to return a value or object contingent upon the query results. In the event of an error, the function is designed to throw an exception.

The `sql.js` file contains all essential queries necessary for the application's operation. These queries are structured as functions that accept required inputs and integrate them into pre-established queries. This approach guarantees the prevention of wrongly defined queries within the `database.js` file, while facilitating the seamless addition of new queries.

# Frameworks used
express,
sequelize,
cookie-parser,
Dotenv,
jsonwebtoken,
pg.
# Getting Started
Clone this repository.

Navigate to the project directory in your terminal.

Run `npm install` to install the necessary dependencies.

## To start the project

In the api directory, run:

### `node server.js`

# Using the application

Modify the URLs in `index.js` to fit your needs.

Create a .env file following the structure of .env.example.






