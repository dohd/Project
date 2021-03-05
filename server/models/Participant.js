const { db, DataTypes } = require('../utils/database');
const Gender = require('./Gender');

const Participant = db.define('participant', {
    accountId: { type: DataTypes.INTEGER, allowNull: false },
    fName: { type: DataTypes.STRING, allowNull: false },
    lName: { type: DataTypes.STRING, allowNull: false },
    disability: { 
        type: DataTypes.STRING,
        set(value) {
            if (!value) return this.setDataValue('disability', 'n/a');
            this.setDataValue('disability', value);
        }
    },
    phone: { type: DataTypes.STRING(15), allowNull: false },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: { isEmail: true }
    },
    region: { type: DataTypes.STRING, allowNull: false },
    designation: { type: DataTypes.STRING, allowNull: false },
    activityDate: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Participant;

// One-to-Many Association
Gender.hasMany(Participant, {
    foreignKey: { name: 'genderId', allowNull: false },
    as: 'participants',
    onDelete: 'set null'
});
Participant.belongsTo(Gender, { as: 'gender' });