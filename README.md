# Galvanize Reads Server

[Open Heroku Deployed Database](https://shrouded-retreat-53312.herokuapp.com)

View repository for front-end [HERE](https://github.com/Ryanholly3/galvanize-reads-client).


## Run the Project
Required Installation:
psql

On command line:

```sh
git clone https://github.com/Ryanholly3/galvanize-reads-server.git
cd galvanize-reads-server
npm install
createdb galvreadsdb
knex migrate:latest
knex seed:run
npm start
```

Then visit http://localhost:3001/

## Routes
* http://localhost:3001/authors
* http://localhost:3001/books


## Technologies Used
* Node.js
* postgreSQL
* Express.js
* Knex.js

## Author
Ryan Holly
