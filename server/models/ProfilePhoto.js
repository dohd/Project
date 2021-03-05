const { db, DataTypes } = require('../utils/database');

const ProfilePhoto = db.define('profile_photo', {
    size: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    ext: { type: DataTypes.STRING, allowNull: false },
});

module.exports = ProfilePhoto;