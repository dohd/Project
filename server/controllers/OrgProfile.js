const { db } = require('../utils/database');
const Detail = require('../models/Detail');
const ContactPerson = require('../models/ContactPerson');

module.exports = {
    findOne: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;

            const detail = await Detail.findOne({ 
                where: { accountId },
                attributes: { exclude: ['accountId','createdAt','updatedAt'] },
            });

            const person = await ContactPerson.findOne({ 
                where: { accountId },
                attributes: { exclude: ['accountId','createdAt','updatedAt'] },
            });

            res.send({ person, detail});
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const data = req.body;

            const detail = {
                name: data.orgName,
                telephone: data.orgTelephone,
                email: data.orgEmail,
            };
            const person = {
                telephone: data.cpTelephone,
                email: data.cpEmail,
                firstName: data.firstName,
                lastName: data.lastName,
            };

            await db.transaction(async t => {
                const transaction = t;
                await Detail.update(detail, { where: { accountId }, transaction });
                await ContactPerson.update(person, { where: { accountId }, transaction });
                return;
            });
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }
};