const db = require('../config/db');

class Appointment {
    constructor(patientId, doctorId, date, type, speciality, hospital) {
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.date = date;
        this.type = type;
        this.speciality = speciality;
        this.hospital = hospital;
    }

    save() {

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
            '${this.patientId}',
            '${this.doctorId}',
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
        let sql = `SELECT * FROM appointment WHERE pacientId IN (SELECT id FROM users WHERE email = '${email}');`;

        return db.execute(sql);
    }

}

module.exports = Appointment;
