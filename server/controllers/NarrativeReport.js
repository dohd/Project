const { db } = require('../utils/database');
const { 
    NarrativeReport, Response, CaseStudy,
    NarrativeQuiz
} = require('../models/NarrativeReport');
const Agenda = require('../models/Agenda');
const Activity = require('../models/Activity');

module.exports = {
    create: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const { activityId, caseStudy, response } = req.body;

            const result = await db.transaction(async t => {
                const transaction = t;

                const report = await NarrativeReport.create({
                    accountId, activityId
                }, {transaction});

                const case_study = await CaseStudy.create({ 
                    accountId, case: caseStudy, narrativeReportId: report.id
                }, {transaction});

                const report_responses = response.map(val => {
                    val.accountId = accountId;
                    val.narrativeReportId = report.id;
                    return val;
                });
                await Response.bulkCreate(report_responses, {transaction});

                const saved_response = await Response.findAll({
                    where: { narrativeReportId: report.id },
                    attributes: { exclude: ['accountId'] },
                    transaction
                });

                const saved_caseStudy = case_study.toJSON();
                delete saved_caseStudy.accountId;

                return {
                    caseStudy: saved_caseStudy,
                    response: saved_response,
                };
            });

            res.send(result);
        } catch (error) {
            next(error);
        }
    },

    findAll: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const reports = await NarrativeReport.findAll({
                where: { accountId },
                attributes: ['id','title'],
                include: [
                    {
                        model: Activity,
                        as: 'activity',
                        attributes: ['id','action']
                    },
                    {
                        model: Response,
                        as: 'responses',
                        attributes: ['id','response'],
                        include: [
                            {
                                model: Agenda,
                                as: 'agenda',
                                attributes: ['id','task']
                            },
                            {
                                model: NarrativeQuiz,
                                as: 'narrativeQuiz'
                            }
                        ]
                    }
                ]
            });
            res.send(reports);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const { id } = req.params;
            await NarrativeReport.destroy({ where: { id, accountId } });
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
};