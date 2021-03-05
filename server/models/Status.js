const { db, DataTypes } = require('../utils/database');

const Status = db.define('status', {
    value: DataTypes.STRING
}, { timestamps: false });

module.exports = Status;