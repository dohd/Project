const moment = require('moment');
const { Op, db } = require('../utils/database');
const Participant = require('../models/Participant');

module.exports = {
    findAll: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;

            const yr = new Date().getFullYear();
            const jan = new Date(yr, 0, 1);
            const dec = new Date(yr, 11, 31);
            const range = [jan, dec].map(v => moment(v).format('YYYY-MM-DD'));

            const participants = await Participant.findAll({
                where: {
                    accountId,
                    activityDate: { 
                        [Op.between]: range
                    }
                },
                attributes: [db.fn('distinct', db.col('activityId')),'activityId']
            });

            const count = participants.length;
            res.send({count});
        } catch (error) {
            next(error);
        }
    }
};