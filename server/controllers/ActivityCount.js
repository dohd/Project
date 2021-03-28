const moment = require('moment');
const { Op, db } = require('../utils/database');
const Participant = require('../models/Participant');

module.exports = {
    findAll: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;

            const year = new Date().getFullYear();
            const fDay = new Date(year, 0, 1);
            const lDay = new Date(year, 11, 31);
            const dateRange = [fDay, lDay].map(v => moment(v).format('YYYY-MM-DD'));

            const participants = await Participant.findAll({
                where: {
                    accountId,
                    activityDate: { 
                        [Op.between]: dateRange
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