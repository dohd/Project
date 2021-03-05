const { db, DataTypes } = require('../utils/database');

const Gender = db.define('gender', {
    type: DataTypes.STRING
}, {freezeTableName: true, timestamps: false});

module.exports = Gender;