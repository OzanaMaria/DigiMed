const Appointment = require('../models/Appointment');
const { recurringAppointmentPatterns } = require("../helpers/appointmentHelper");
const moment = require('moment');
const sendEmailControllers = require("../controllers/sendEmail.js");
const userController = require("../controllers/userControllers");

exports.getAllAppointments = async (req, res, next) => {
    try {
        const [appointments, _] = await Appointment.findAll();

        res.status(200).json({ appointments });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

createNewAppointment = async (patientId, doctorId, date, type, speciality, hospital) => {
    let appointment = new Appointment(patientId,
        doctorId,
        date,
        type,
        speciality,
        hospital);
    console.log(appointment);
    await appointment.save();

}

createNAppointmentsWithIntervalMonths = async (patientId, doctorId, date, type, speciality, hospital, numberOfAppointments, monthsInterval) => {
    const startingDate = new Date(date);
    for (let i = 0; i < numberOfAppointments; i++) {
        const newDate = new Date(startingDate.setMonth(startingDate.getMonth() + monthsInterval));
        await createNewAppointment(patientId, doctorId, newDate.toISOString().slice(0, 19).replace('T', ' '), type, speciality, hospital);
    }
}

createNAppointmentsWithIntervalDays = async (patientId, doctorId, date, type, speciality, hospital, numberOfAppointments, daysInterval) => {
    const startingDate = new Date(date);
    for (let i = 0; i < numberOfAppointments; i++) {
        const newDate = new Date(startingDate.setDate(startingDate.getDate() + daysInterval));
        await createNewAppointment(patientId, doctorId, newDate.toISOString().slice(0, 19).replace('T', ' '), type, speciality, hospital);
    }
}

exports.createNewAppointments = async (req, res, next) => {
    try {
        console.log(req.body);
        let { patientId,
            doctorId,
            date,
            type,
            speciality,
            hospital } = req.body;

        email = await userController.getUserEmailById(patientId)

        switch (type) {
            case recurringAppointmentPatterns.SINGULAR:
                await createNewAppointment(patientId, doctorId, date, type, speciality, hospital);
                res.status(201).json({ message: "Appointment(s) created" });
                sendEmailControllers.createNewAppointment(email, date);
                break;
            case recurringAppointmentPatterns.ANNUALLY:
                await createNAppointmentsWithIntervalMonths(patientId, doctorId, date, type, speciality, hospital, 5, 12);
                res.status(201).json({ message: "Appointment(s) created" });
                sendEmailControllers.createNewAppointment(email, date);
                break;
            case recurringAppointmentPatterns.BIANNUALLY:
                await createNAppointmentsWithIntervalMonths(patientId, doctorId, date, type, speciality, hospital, 10, 6);
                res.status(201).json({ message: "Appointment(s) created" });
                sendEmailControllers.createNewAppointment(email, date);
                break;
            case recurringAppointmentPatterns.QUARTERLY:
                await createNAppointmentsWithIntervalMonths(patientId, doctorId, date, type, speciality, hospital, 10, 3);
                res.status(201).json({ message: "Appointment(s) created" });
                sendEmailControllers.createNewAppointment(email, date);
                break;
            case recurringAppointmentPatterns.BIWEEKLY:
                await createNAppointmentsWithIntervalDays(patientId, doctorId, date, type, speciality, hospital, 5, 14);
                res.status(201).json({ message: "Appointment(s) created" });
                sendEmailControllers.createNewAppointment(email, date);
                break;
            case recurringAppointmentPatterns.WEEKLY:
                await createNAppointmentsWithIntervalDays(patientId, doctorId, date, type, speciality, hospital, 10, 7);
                res.status(201).json({ message: "Appointment(s) created" });
                sendEmailControllers.createNewAppointment(email, date);
                break;
            default:
                res.status(402).json({ message: "Unknown appointment type" });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getAppointmentByEmail = async (req, res, next) => {
    try {
        console.log("sdaaaaaaaa");
        let userEmail = req.params.email;
        let [appointment, _] = await Appointment.findByEmail(userEmail);

        res.status(200).json({ appointment });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getAppointmentByEmailAndDate = async (req, res, next) => {
    try {
        console.log("addddddddddddddddddddddddd");
        let email = req.params.email;
        let date = req.params.date;

        let [appointment, _] = await Appointment.findByEmailAndDate(email, convertDateFormat(date));

        res.status(200).json({ appointment });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

function convertDateFormat(dateString) {
    const inputFormat = 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)';
    const outputFormat = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';
    const formattedDate = moment(dateString, inputFormat).format(outputFormat);

    return formattedDate;
}
