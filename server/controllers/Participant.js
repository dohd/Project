const { Op } = require('../utils/database');
const createError = require('http-errors');
const Participant = require('../models/Participant');
const Gender = require('../models/Gender');
const { KeyProgramme, Region } = require('../models/Essential');

module.exports = {
    create: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const data = req.body;
            const { activityId, genderId, activityPlanId, activityDate } = data;

            const isMatch = await Participant.findOne({ 
                where: { accountId, activityId, activityDate, email: data.email }, 
                attributes: ['id'] 
            });
            if (isMatch) throw new createError.Conflict('Participant exists!');

            const participant = await Participant.create({
                accountId, 
                activityId, 
                genderId,
                activityPlanId,
                fName: data.fName,
                lName: data.lName,
                disability: data.disability,
                phone: data.phone,
                email: data.email,
                region: data.region,
                designation: data.designation,
                activityDate: data.activityDate,
            });

            const saved_participant = participant.toJSON();
            delete saved_participant.accountId;

            res.send(saved_participant);
        } catch (err) {
            next(err);
        }
    },

    findAll: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const participants = await Participant.findAll({
                where: { accountId },
                attributes: { exclude: ['accountId','genderId','createdAt','updatedAt'] },
                include: [
                    { 
                        model: Gender, 
                        as: 'gender', 
                        attributes: ['id','type'] 
                    },
                    {
                        model: Region,
                        as: 'region',
                        attributes: ['id','area']
                    },
                    {
                        model: KeyProgramme,
                        as: 'keyProgramme',
                        attributes: ['id', 'programme']
                    }
                ]
            });
            res.send(participants);
        } catch (err) {
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const { id } = req.params;
            const { activityId, email, activityDate } = req.body;

            const isMatch = await Participant.findOne({ 
                where: { id: { [Op.ne]: id }, activityId, email, activityDate, accountId }, 
                attributes: ['id'] 
            });
            if (isMatch) throw new createError.Conflict('Participant exists!');

            await Participant.update(req.body, { where: { id, accountId } });
            res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    },

    delete: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const { id } = req.params;
            await Participant.destroy({ where: { id, accountId } });
            res.sendStatus(204);
        } catch (err) {
            next(err);
        }
    }
};