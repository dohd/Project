const ProfilePhoto = require('../models/ProfilePhoto');
const { multer, multerError } = require('../utils/multer');
const fs = require('fs');

const upload = multer.single('profile');

const readPhoto = path => new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'base64' }, (err, data) => {
        if (err) {
            console.log(err);
            reject(err);
        };
        resolve(data);
    });
});

module.exports = {
    create: async (req, res, next) => {
        upload(req, res, async (err) => {
            if (err) multerError(err, next);
            try {
                const accountId = req.payload.aud;
                if (!req.file) return res.sendStatus(204);
            
                const photo = req.file;
                const [ext, ...rest] = photo.filename.split('.').reverse();
                const name = rest.reverse().join('.');
                const { size } = photo;

                const photo_match = await ProfilePhoto.findOne({
                    where: { accountId } 
                });
                
                if (photo_match) {
                    const filename = `${photo_match.name}.${photo_match.ext}`;
                    const filepath = './uploads/' + filename;

                    const uploadPhoto = { name, ext, size, accountId };
                    await ProfilePhoto.update(uploadPhoto, { where: { accountId } });

                    fs.unlink(filepath, (err) => {
                        if (err) console.log(err);
                    });
                    return res.sendStatus(200);
                }

                const profile_photo = await ProfilePhoto.create({
                    name, ext, size, accountId
                });

                delete profile_photo.accountId;
                res.send(profile_photo);
            } catch (error) {
                next(error);
            }
        });
    },

    findAll: async (req, res, next) => {
        try {
            const accountId = req.payload.aud;
            const photo = await ProfilePhoto.findOne({ where: { accountId } });
            if (!photo) return res.send('');

            const name = `${photo.name}.${photo.ext}`;
            const path = './uploads/' + name;
            const data = await readPhoto(path);
            res.send('data:image/png;base64,' + data);
        } catch (error) {
            next(error);
        }
    },
};