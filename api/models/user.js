const mongoose = require('mongoose');
const Joi = require('joi');
const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');

mongoose.connect('mongodb://localhost/vidly')
    .then(()=>console.log(' Connected to Vidly DB ..'))
    .catch(()=>console.log(' Cannot connecte to Vidly DB ..'));


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User',userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(3).max(255).required()
    }
    return Joi.validate(user, schema);
}

async function hash(password){
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt)
    return hashed;
}

module.exports.hash = hash;
module.exports.User = User;
module.exports.validate = validateUser;

