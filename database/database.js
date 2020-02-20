const mongoose = require('mongoose');


//  MONGODB/mongoose SETUP

const url = process.env.DATABASEURL || 'mongodb://localhost:27017'

const dbName = 'moviesDB';

class Database {
    constructor() {
      this._connect()
    }

    _connect() {
        mongoose.connect(`mongodb://${url}/${dbName}`)
          .then(() => {
            console.log('Database connection successful')
          })
          .catch(err => {
            console.error('Database connection error')
          })
     }
   }
   
   module.exports = new Database();