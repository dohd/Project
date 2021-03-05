const createError = require('http-errors');
const { Op } = require('../utils/database');
const { DatabaseError } = require('sequelize');
const { TargetGroup } = require('../models/Essential');

module.exports = {
    create: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;

            const group_match = await TargetGroup.findOne({
                attributes: ['id'],
                where: {
                    accountId,
                    group: { [Op.iLike]: req.body.group }
                }
            });
            if (group_match) throw new createError.Conflict(
                'target group already exists'
            );

            const group = await TargetGroup.create({ 
                group: req.body.group, accountId 
            });
            const saved_group = group.toJSON();
            delete saved_group.accountId;

            res.send(saved_group);
        } catch (error) {
            next(error);
        }
    },

    findAll: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const groups = await TargetGroup.findAll({ 
                where: { accountId }, 
                attributes: ['id','group']
            });
            res.send(groups);
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const { id } = req.params;
            const { group } = req.body;

            const group_match = await TargetGroup.findOne({
                attributes: ['id'],
                where: {
                    accountId,
                    id: { [Op.ne]: id },
                    group: { [Op.iLike]: group }
                }
            });
            if (group_match) throw new createError.Conflict(
                'target group already exists'
            );

            await TargetGroup.update({ group }, { 
                where: { id, accountId } 
            });
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const { id } = req.params;
            await TargetGroup.destroy({ where: { id, accountId } });
            res.sendStatus(204);
        } catch (error) {
            if (error instanceof DatabaseError) {
                const msg = 'group has dependencies in activity plan';
                return next(new createError.FailedDependency(msg));
            }
            next(error);
        }
    }
};