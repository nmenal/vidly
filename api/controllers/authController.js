
const { User } = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const config = require('config');

// getCurrentUser
module.exports.getCurrentUser = async (req, res, next) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
}

// authenticate
module.exports.login = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid email or password!');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password!');

    const token = user.generateAuthToken();
    res.send(token);
}

function validate(user) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(3).max(255).required()
    }
    return Joi.validate(user, schema);
}