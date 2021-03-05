const { db, DataTypes } = require('../utils/database');
const Objective = require('./Objective');
const Status = require('./Status');

const Proposal = db.define('proposal', {
    title: { type: DataTypes.STRING, allowNull: false },
    startPeriod: { type: DataTypes.STRING, allowNull: false },
    endPeriod: { type: DataTypes.STRING, allowNull: false },
    dateSubmitted: { type: DataTypes.STRING, allowNull: false },
    budget: { type: DataTypes.INTEGER, allowNull: false },
});

// Hooks
Proposal.beforeValidate(async (proposal, options) => {
    const { statusId } = proposal;
    if (!statusId) proposal.statusId = 1;
});

module.exports = Proposal;

// One-to-One Association
Status.hasOne(Proposal, {
    foreignKey: { name: 'statusId', allowNull: false },
    as: 'proposal',
    onDelete: 'set null'
});
Proposal.belongsTo(Status, { as: 'status' });

// One-to-Many Association
Proposal.hasMany(Objective, { 
    foreignKey: { name: 'proposalId', allowNull: false }, 
    as: 'objectives',
});
Objective.belongsTo(Proposal, { as: 'proposal' });
