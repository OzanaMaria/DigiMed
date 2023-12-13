const User = require('../models/User');
import { ZenEngine } from '@gorules/zen-engine';
import fs from 'fs/promises';

exports.getDecision = async () => {
    // Example filesystem content, it is up to you how you obtain content
    const content = await fs.readFile('../config/goRules.json');
    const engine = new ZenEngine();

    const decision = engine.createDecision(content);
    const result = await decision.evaluate({ input: 15 });
    console.log(result);
};

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
        let { email, first_name, last_name, role } = req.body;
        let user = new User(email, first_name, last_name, role);
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

exports.getAllDoctors = async (req, res, next) => {
    try {
        const [doctors, _] = await User.findAllDoctors();
        let doc_names = [];
        for (let i = 0; i < doctors.length; i++) {
            console.log(doctors[i]);
            doc_names.push(doctors[i].first_name + " " + doctors[i].last_name);
        }

        var docs = JSON.parse(JSON.stringify(doc_names));
        console.log(docs);
        res.status(200).json({ docs });
    } catch (error) {
        console.log(error);
        next(error);
    }
}