const multer = require('multer');
const path = require('path');
const sharp = require('sharp');

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: async(req, file, callback)=>{

            const extensao = path.extname(file.originalname);
            const name = path.basename(file.originalname, extensao);

            callback(null, `${name}-${Date.now()}${extensao}`);
        }
    }),
};