const { User, validate, validatePassword, hash } = require('../models/user');
const _ = require('lodash');

// Find users 
module.exports.getUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(400).send("No items found");
    else res.send(users);
};

// FindById 
module.exports.findById = async (req, res, next) => {
    const user = await User.findById({ _id: req.user._id }).select('-password');
    if (!user) res.status(400).send('Not found user with given Id !');
    else res.send(user);
}

// Create user 
module.exports.createUser = async (req, res, next) => {
    let { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User with given Email already registred !');

    ({ error } = validatePassword(req.body.password));
    if (error) return res.status(400).send(error.details[0].message);
    
    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    // Hash Password 
    user.password = await hash(user.password);

    // Validate users 
    await user.validate();
    const result = await user.save();
    if (!result) return res.status(400).send("couldn't add the user");
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(result, ['_id', 'name', 'email']));
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