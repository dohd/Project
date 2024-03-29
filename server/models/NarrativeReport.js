const { db, DataTypes } = require('../utils/database');

const NarrativeQuiz = db.define('narrative_quiz', {
    query: DataTypes.STRING
}, { freezeTableName: true, timestamps: false });

const NarrativeReport = db.define('narrative_report', {
    accountId: { type: DataTypes.INTEGER, allowNull: false }
});

const Response = db.define('response', {
    response: { type: DataTypes.STRING, allowNull: false },
    accountId: { type: DataTypes.INTEGER, allowNull: false },
});

const EventPhoto = db.define('event_photo', {
    size: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    ext: { type: DataTypes.STRING, allowNull: false },
    accountId: { type: DataTypes.INTEGER, allowNull: false },
});

const CaseStudy = db.define('case_study', {
    case: { type: DataTypes.STRING, allowNull: false },
    accountId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = { 
    NarrativeReport, Response, EventPhoto,
    CaseStudy, NarrativeQuiz 
};

// One-to-One Association
NarrativeReport.hasOne(CaseStudy, {
    foreignKey: { name: 'narrativeReportId', allowNull: false },
    as: 'caseStudy'
});
CaseStudy.belongsTo(NarrativeReport, { as: 'narrativeReport' });

// One-to-Many Association
NarrativeReport.hasMany(EventPhoto, {
    foreignKey: { name: 'narrativeReportId', allowNull: false },
    as: 'eventPhotos'
});
EventPhoto.belongsTo(NarrativeReport, { as: 'narrativeReport' });

NarrativeReport.hasMany(Response, {
    foreignKey: { name: 'narrativeReportId', allowNull: false },
    as: 'responses'
});
Response.belongsTo(NarrativeReport, { as: 'narrativeReport' });

NarrativeQuiz.hasMany(Response, { 
    foreignKey: { name: 'narrativeQuizId', allowNull: false },
    as: 'responses',
    onDelete: 'set null'
});
Response.belongsTo(NarrativeQuiz, { as: 'narrativeQuiz' });