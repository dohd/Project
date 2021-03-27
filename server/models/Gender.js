const { db, DataTypes } = require('../utils/database');
const Participant = require('../models/Participant');

const Gender = db.define('gender', {
    type: DataTypes.STRING
}, {freezeTableName: true, timestamps: false});

module.exports = Gender;

// One-to-Many Association
Gender.hasMany(Participant, {
    foreignKey: { name: 'genderId', allowNull: false },
    as: 'participants',
    onDelete: 'set null'
});
Participant.belongsTo(Gender, { as: 'gender' });