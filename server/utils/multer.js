const multer = require('multer');
const createError = require('http-errors');

module.exports = { 
    multer: multer({ 
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'uploads');
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '-' + file.originalname);
            }
        })
    }),
     
    multerError: (err, next) => {
        if (err instanceof multer.MulterError) {
            console.log(err.message);
            next(new createError.InternalServerError());
        } 
        console.log(err.message);
        next(new createError.InternalServerError());
    }
};
