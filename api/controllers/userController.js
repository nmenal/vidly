
const { User, validate , hash } = require('../models/user');
const _ = require('lodash');

// Find users 
module.exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        if (!users) return res.status(400).send("No items found");
        else res.send(users);
    } catch (error) {
        res.status(400).send(err.message);
    }
}

// FindById 
module.exports.findById = async (req, res, next) => {
    try {
        const user = await User.findById({ _id: req.user._id }).select('-password');
        if (!user) res.status(400).send('Not found user with given Id !');
        else res.send(user);
    } catch (error) {
        res.status(400).send(err.message);
    }
}

// Create user 
module.exports.createUser = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User with given Email already registred !');

    user = new User(_.pick(req.body,['name','email','password']));
    user.password = await hash(user.password);

    try {
        await user.validate();    
        const result = await user.save();
        if (!result) return res.status(400).send("couldn't add the user");
        const token = user.generateAuthToken();
        res.header('x-auth-token',token).send(_.pick(result,['_id','name','email']));
    } catch (error) {        
        return res.status(400).send(error.message);;
    }
}

// Update user 
module.exports.updateUser = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return error.details[0].message;

    const user = await User.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.name }, {
        new: true
    });

    if (!user) return res.status(400).send('No such item with given id');
    res.send(user)
}

// Delete user 
module.exports.deleteUser = async (req, res, next) => {
    const user = await User.findByIdAndRemove({ _id: req.params.id });
    if (!user) return res.status(400).send('No such item with given id');
    res.send(user);
}