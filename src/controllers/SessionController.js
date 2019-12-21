//index => listagem, show, store, update, destroy

const User = require('../models/User')

module.exports = {
    async store(req, res){
        const {email} = req.body;

        //não permitir usuarios com o mesmo email
        let user = await User.findOne({email});
        if(!user){
            user = await User.create({ email })
        }

        return res.json(user);
    }
};