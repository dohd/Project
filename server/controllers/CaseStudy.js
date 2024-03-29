const { CaseStudy } = require('../models/NarrativeReport');
const { NarrativeReport } = require('../models/NarrativeReport');
const Activity = require('../models/Activity');

module.exports = {
    findAll: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const cases = await CaseStudy.findAll({
                where: { accountId }, 
                attributes: ['id','case'],
                include: [{
                    model: NarrativeReport ,
                    as: 'narrativeReport',
                    attributes: ['id'],
                    include: [{
                        model: Activity,
                        as: 'activity',
                        attributes: ['id','action']
                    }]
                }]
            });
            res.send(cases);
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const { id } = req.params;
            await CaseStudy.update(req.body, { where: { id, accountId } });
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }
};