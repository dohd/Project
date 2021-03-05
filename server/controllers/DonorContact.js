// const { DatabaseError } = require('sequelize');
// const { Op } = require('../utils/database');
// const createError = require('http-errors');
const DonorContact = require('../models/DonorContact');

module.exports = {
    create: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const data = req.body;

            const donor_contact = await DonorContact.create({
                firstName: data.firstName,
                lastName: data.firstName,
                telephone: data.phone,
                email: data.email,
                donorId: data.donorId,
                accountId
            });

            const saved_donor_contact = donor_contact.toJSON();
            delete saved_donor_contact.accountId;

        } catch (error) {
            next(error);
        }
    },

    findAll: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const donor_contacts = await DonorContact.findAll({
                where: { accountId }, attributes: { exclude: ['accountId'] }
            });
            res.send(donor_contacts);
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const { id } = req.params;
            await DonorContact.update(req.body, { where: { id, accountId } });
            res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    },

    delete: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const { id } = req.params;
            await DonorContact.destroy({ where: { id, accountId } });
            res.sendStatus(204);
        } catch (err) {
            next(err);
        }
    }
};