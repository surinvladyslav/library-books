const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString()+file.originalname)
    }
})

const fileFilter = function (req, file, cb) {
    const allowedTypes = ['image/jpeg','image/gif','image/png','image/jpg'];

    if(!allowedTypes.includes(file.mimetype)) {
        return cb({
            success: false,
            message: 'invalid file type. only jpg, png image files are allowed'
        }, false);
    }

    cb(null, true)
}

const upload = multer({
    fileFilter,
    storage: storage,
})

module.exports = {storage, upload}