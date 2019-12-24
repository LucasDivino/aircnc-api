const Spot = require('../models/Spot');
const User = require('../models/User');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {

    async index(req, res){
        const {tech} = req.query;;
        const spots = await Spot.find({techs : tech})

        return res.json(spots);
    },

    async store(req ,res){

        const filename = `resized_${req.file.filename}`;
        const {company, techs} = req.body;
        const {user_id} = req.headers;

        await sharp(req.file.path)
            .resize(360)
            .jpeg({quality : 80})
            .toFile(
                path.resolve(req.file.destination, `resized_${req.file.filename}` )
            )
        fs.unlinkSync(req.file.path)

        const user = await User.findById(user_id);
        if(!user){
            return res.status(400).json({error: 'User does not exists'});
        };

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()) //splitar string separadas por virgulas e tirar espaços desnecessarios
        });

        return res.json(spot)
    }
}