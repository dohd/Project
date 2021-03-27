const { Op } = require('../utils/database');
const Participant = require('../models/Participant');
const { KeyProgramme } = require('../models/Essential');
const Gender = require('../models/Gender');

module.exports = {
    findAll: async (req, res, next) => {
        try {
            const empty_params = !req.query.from && !req.query.to;
            if (empty_params) return res.send({});

            const accountId = req.payload.aud;
            const fromDate = req.query.from;
            const toDate = req.query.to;

            const participants = await Participant.findAll({
                where: { 
                    accountId,
                    activityDate: {
                        [Op.between]: [fromDate, toDate]
                    }
                },
                attributes: ['id','keyProgrammeId','genderId']
            });

            const key_programmes = await KeyProgramme.findAll({
                where: { accountId },
                attributes: ['id']
            });

            const gender = await Gender.findAll();

            const dataset = { male: [], female: [], transgender: [] };

            for (const program of key_programmes) {
                let maleCount = 0;
                let femaleCount = 0;
                let transCount = 0;

                for (const p of participants) {
                    const programme_match = p.keyProgrammeId === program.id;
                    for (const g of gender) {
                        const gender_match = g.id === p.genderId;
                        if (programme_match && gender_match && g.type === 'Male') maleCount++;
                        if ( programme_match && gender_match && g.type === 'Female') femaleCount++;
                        if (programme_match && gender_match && g.type === 'Transgender') transCount++;
                    }
                }

                dataset.male.push(maleCount);
                dataset.female.push(femaleCount);
                dataset.transgender.push(transCount);
            }

            res.send(dataset);
        } catch (error) {
            next(error);
        }
    }
};