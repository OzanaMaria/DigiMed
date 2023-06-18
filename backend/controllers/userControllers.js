const User = require('../models/User');

exports.getAllUsers = async (req, res, next) => {
    try {
        const [users, _] = await User.findAll();

        res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.createNewUser = async (req, res, next) => {
    try {
        console.log(req.body);
        let { email, role } = req.body;
        let user = new User(email, role);
        console.log(user);
        user = await user.save();

        res.status(201).json({ message: "User created" });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getUserByEmail = async (req, res, next) => {
    try {
        let userEmail = req.params.email;
        let [user, _] = await User.findByEmail(userEmail);

        res.status(200).json({ user: user[0] });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getUserEmailById = async (id) => {
    try {
        let [email, _] = await User.findEmailById(id);
        return email[0].email;

    } catch (error) {
        console.log(error);
        next(error);
    }
}