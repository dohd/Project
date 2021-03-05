const { db, DataTypes } = require('../utils/database');
const Participant = require('./Participant');
const Agenda = require('./Agenda');
const { NarrativeReport } = require('./NarrativeReport');
const { ActivityPlan } = require('./ActivityPlan');


const Activity = db.define('activity', {
    action: { type: DataTypes.STRING, allowNull: false },
    accountId: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Activity;

// One-to-one Association
Activity.hasOne(NarrativeReport, {
    foreignKey: { name: 'activityId', allowNull: false },
    as: 'narrativeReport'
});
NarrativeReport.belongsTo(Activity, { as: 'activity' });

// One-to-Many Association
Activity.hasMany(Agenda, { 
    foreignKey: { name: 'activityId', allowNull: false }, 
    as: 'agenda' 
});
Agenda.belongsTo(Activity, { as: 'activity' });

Activity.hasMany(Participant, { 
    foreignKey: { name: 'activityId', allowNull: false }, 
    as: 'participants' 
});
Participant.belongsTo(Activity, { as: 'activity' });

Activity.hasMany(ActivityPlan, { 
    foreignKey: { name: 'activityId', allowNull: false }, 
    as: 'activityPlans' 
});
ActivityPlan.belongsTo(Activity, { as: 'activity' });