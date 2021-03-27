const moment = require('moment');
const { Op } = require('../utils/database');
const Participant = require('../models/Participant');

module.exports = {
    findAll: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;

            const fDay = new Date(new Date().getFullYear(), 0, 1);
            const lDay = new Date(new Date().getFullYear(), 11, 31);
            const dateRange = [fDay, lDay].map(v => moment(v).format('YYYY-MM-DD'));

            const participants = await Participant.findAll({
                where: {
                    accountId,
                    activityDate: { 
                        [Op.between]: dateRange
                    }
                },
                attributes: ['activityId']
            });

            const activityIds = participants.map(v => v.activityId);
            const activities = new Set(activityIds);
            const activityCount = activities.size;

            res.send({activityCount});
        } catch (error) {
            next(error);
        }
    }
};