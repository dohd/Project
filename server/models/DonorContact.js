const { db, DataTypes } = require('../utils/database');

const DonorContact = db.define('donor_contact', {
    accountId: { type: DataTypes.INTEGER, allowNull: false  },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    telephone: { type: DataTypes.STRING(15), allowNull: false },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: { isEmail: true } 
    }
});

module.exports = DonorContact;