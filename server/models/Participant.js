const { db, DataTypes } = require('../utils/database');

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
    designation: { type: DataTypes.STRING, allowNull: false },
    activityDate: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Participant;