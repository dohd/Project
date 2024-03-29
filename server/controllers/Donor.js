const { DatabaseError } = require('sequelize');
const { Op } = require('../utils/database');
const createError = require('http-errors');
const Donor = require('../models/Donor');

module.exports = {
    create: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const { name, phone, email } = req.body;

            const donor_match = await Donor.findOne({
                attributes: ['id'],
                where: {
                    accountId,
                    [Op.or]: [
                        { name: { [Op.iLike]: name } }, 
                        {phone}, 
                        {email}
                    ]
                },
            });
            if (donor_match) throw new createError.FailedDependency(
                'name or email or phone already exists'
            );

            const donor = await Donor.create({name, phone, email, accountId});
            const saved_donor = donor.toJSON();
            delete saved_donor.accountId;

            res.send(saved_donor);
        } catch (err) {
            next(err);
        }
    },

    findAll: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const donors = await Donor.findAll({ 
                where: { accountId },
                attributes: ['id','name','phone','email']
            });
            res.send(donors);
        } catch (err) {
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const { id } = req.params;
            const { name, phone, email } = req.body;

            const donor_match = await Donor.findOne({
                attributes: ['id'],
                where: {
                    accountId,
                    id: { [Op.ne]: id },
                    [Op.or]: [
                        { name: { [Op.iLike]: name } }, 
                        {phone}, 
                        {email}
                    ]
                },
            });

            if (donor_match) throw new createError.FailedDependency(
                'name or email or phone already exists'
            );
            await Donor.update({ name, phone, email }, { where: { id, accountId } });

            res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    },

    delete: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const { id } = req.params;
            await Donor.destroy({ where: { id, accountId } });
            res.sendStatus(204);
        } catch (err) {
            if (err instanceof DatabaseError) {
                const msg = 'donor has dependency in proposal';
                return next(new createError.FailedDependency(msg));
            }
            next(err);
        }
    }
};