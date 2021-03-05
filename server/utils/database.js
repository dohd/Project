const { Sequelize, DataTypes, Op } = require('sequelize');

// Initiate SQL database connection
const db = new Sequelize(process.env.PSQL_URI);

// Confirm database connection
db.authenticate()
.then(() => {
    console.log('Pgsql_db connected successfully. \n');
    db.sync({ logging: false, force: false, alter: true });
    // db.drop();
})
.catch( err => {
    console.error('Unable to connect to Pgsql_db:', err);
});

module.exports = { db, DataTypes, Op };