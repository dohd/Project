const Agenda = require('../models/Agenda');

module.exports = {
    create: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const data = req.body;
            const { activityId } = data;

            const agenda = await Agenda.create({
                accountId,activityId,
                startTime: data.startTime,
                endTime: data.endTime,
                task: data.task,
                assignee: data.assignee,
                designation: data.designation,
            });

            const saved_agenda = agenda.toJSON();
            delete saved_agenda.accountId;

            res.send(saved_agenda);
        } catch (err) {
            next(err);
        }
    },

    findAll: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const agenda = await Agenda.findAll({
                where: { accountId }, attributes: { exclude: ['accountId'] }
            });
            res.send(agenda);
        } catch (err) {
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const { id } = req.params;
            await Agenda.update(req.body, { where: { id, accountId } });
            res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    },

    delete: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const { id } = req.params;
            await Agenda.destroy({ where: { id, accountId } });
            res.sendStatus(204);
        } catch (err) {
            next(err);
        }
    }
};