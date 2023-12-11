const db = require('../config/db');
const User = require('../models/User');

class Appointment {
    constructor(patient, doctorName, date, type, speciality, hospital) {
        this.patient = patient;
        this.doctorName = doctorName;
        this.date = date;
        this.type = type;
        this.speciality = speciality;
        this.hospital = hospital;
    }

    async save() {

        const doc_name = this.doctorName.split(" ");
        const [doctor, _] = await User.findByName(doc_name[0], doc_name[1]);
        const [patient1] = await User.findByEmail(this.patient);
        let sql = `
        INSERT INTO appointment(
            patientId,
            doctorId, 
            date, 
            type, 
            speciality, 
            hospital
        )
        VALUES(
            '${patient1[0].id}',
            '${doctor[0].id}',
            '${this.date}',
            '${this.type}',
            '${this.speciality}',
            '${this.hospital}'
        );
        `

        return db.execute(sql);
    }

    static findAll() {
        let sql = `SELECT * FROM appointment;`;

        return db.execute(sql);
    }

    static findByEmail(email) {
        let sql = `SELECT * FROM appointment WHERE patientId IN (SELECT id FROM users WHERE email = '${email}');`;

        return db.execute(sql);
    }

    static findDocByEmail(email) {
        let sql = `SELECT * FROM appointment WHERE doctorId IN (SELECT id FROM users WHERE email = '${email}');`;

        return db.execute(sql);
    }

    static findByEmailAndDate(email, date) {
        let sql = `SELECT * FROM appointment WHERE patientId IN (SELECT id FROM users WHERE email = '${email}') AND date >= '${date}' AND date < DATE_ADD('${date}', INTERVAL 1 DAY);`;
        console.log(sql);
        return db.execute(sql);
    }

    static findDocByEmailAndDate(email, date) {
        let sql = `SELECT * FROM appointment WHERE doctorId IN (SELECT id FROM users WHERE email = '${email}') AND date >= '${date}' AND date < DATE_ADD('${date}', INTERVAL 1 DAY);`;
        console.log(sql);
        return db.execute(sql);
    }

}

module.exports = Appointment;
