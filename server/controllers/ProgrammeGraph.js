const { Op } = require('../utils/database');
const moment = require('moment');
const Participant = require('../models/Participant');
const { KeyProgramme } = require('../models/Essential');
const Gender = require('../models/Gender');

module.exports = {
    findAll: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;

            const yr = new Date().getFullYear();
            const jan = new Date(yr, 0, 1);
            const dec = new Date(yr, 11, 31);
            const yr_range = [jan, dec].map(v => {
                return  moment(v).format('YYYY-MM-DD');
            });

            const fromDate = req.query.from || yr_range[0];
            const toDate = req.query.to || yr_range[1];

            const participants = await Participant.findAll({
                where: { 
                    accountId,
                    activityDate: {
                        [Op.between]: [fromDate, toDate]
                    }
                },
                attributes: ['id','genderId','keyProgrammeId']
            });

            const programmes = await KeyProgramme.findAll({
                where: { accountId },
                attributes: ['id']
            });

            const gender = await Gender.findAll();

            const dataset = { 
                male: [], female: [], transgender: [] 
            };

            for (const programme of programmes) {
                let maleCount = 0;
                let femaleCount = 0;
                let transCount = 0;

                for (const p of participants) {
                    const programme_match = p.keyProgrammeId === programme.id;
                    for (const g of gender) {
                        const gender_match = g.id === p.genderId;
                        if (programme_match && gender_match) {
                            if (g.type === 'Male') maleCount++;
                            if (g.type === 'Female') femaleCount++;
                            if (g.type === 'Transgender') transCount++;
                        }
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
