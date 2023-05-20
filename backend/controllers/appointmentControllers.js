const Appointment = require('../models/Appointment');

exports.getAllAppointments = async (req, res, next) => {
    try {
        const [appointments, _] = await Appointment.findAll();

        res.status(200).json({ appointments });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.createNewAppointment = async (req, res, next) => {
    try {
        console.log(req.body);
        let { pacientId,
            doctorId,
            date,
            type,
            speciality,
            hospital } = req.body;
        let appointment = new Appointment(pacientId,
            doctorId,
            date,
            type,
            speciality,
            hospital);
        console.log(appointment);
        appointment = await appointment.save();

        res.status(201).json({ message: "Appointment created" });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getAppointmentByEmail = async (req, res, next) => {
    try {
        let userEmail = req.params.email;
        let [user, _] = await Appointment.findByEmail(userEmail);

        res.status(200).json({ appointment: appointment });
    } catch (error) {
        console.log(error);
        next(error);
    }
}