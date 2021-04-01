const fs = require('fs');
const { multer, multerError } = require('../utils/multer');
const { 
    EventPhoto, NarrativeReport 
} = require('../models/NarrativeReport');
const Activity = require('../models/Activity');

const upload = multer.single('event_photo');

const readPhoto = photo => new Promise((resolve, reject) => {
    const { name, ext, id } = photo;
    const filepath = `./uploads/${name}.${ext}`;
    fs.readFile(filepath, { encoding: 'base64' }, (err, data) => {
        if (err) {
            console.log(err);
            reject(err);
        }
        const imageUrl = 'data:image/png;base64,' + data;
        resolve({id, name, imageUrl});
    });
});

module.exports = {
    update: async (req, res, next) => {
        upload(req, res, async err => {
            if (err) multerError(err, next);
            try {
                const accountId = req.payload.aud;
                const { id } = req.params;
                if (!req.file) return res.sendStatus(204);

                const photo = req.file;
                const [ext, ...rest] = photo.filename.split('.').reverse();
                const name = rest.reverse().join('.');
                const { size } = photo;

                const event_photo = await EventPhoto.create({
                    name, ext, size, accountId, 
                    narrativeReportId: id
                });

                const saved_photo = event_photo.toJSON();
                delete saved_photo.accountId;
                res.send(saved_photo);
            } catch (error) {
                next(error);
            }
        });
    },

    findAll: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;

            const reports = await NarrativeReport.findAll({ 
                where: { accountId }, 
                attributes: ['id'],
                include: [
                    { 
                        model: Activity, 
                        as: 'activity',
                        attributes: ['id','action'] 
                    },
                    {
                        model: EventPhoto,
                        as: 'eventPhotos',
                        attributes: ['name','ext','id']
                    }
                ]
            });

            // clone to remove model clutter
            const new_reports = JSON.parse(JSON.stringify(reports));

            for (const report of new_reports) {
                const { eventPhotos } = report;
                const metadata = eventPhotos.map(async photo => await readPhoto(photo));
                report.eventPhotos = await Promise.all(metadata);
            }
            res.send(new_reports);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            const photo = await EventPhoto.findByPk(id, {
                attributes: ['name', 'ext']
            });
            const filename = `${photo.name}.${photo.ext}`;
            const filepath = './uploads/' + filename;

            await EventPhoto.destroy({ where: { id } });
            fs.unlink(filepath, (err) => {
                if (err) console.log(err);
            });
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
};