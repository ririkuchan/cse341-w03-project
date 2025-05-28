require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;

const initDb = (callback) => {
    if (db) {
        console.log('DB is already initialized!');
        return callback(null, db);
    }

    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            db = client.db(process.env.DB_NAME); // .envで指定するDB名
            console.log('✅ Database is connected.');
            callback(null, db);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = () => {
    if (!db) {
        throw new Error('DB has not been initialized. Call initDb first.');
    }
    return db;
};

module.exports = { initDb, getDb };