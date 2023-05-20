const db = require('../config/db');

class Review {
    constructor(pacientId, doctorId, number) {
        this.pacientId = pacientId;
        this.doctorId = doctorId;
        this.number = number;
    }

    save() {

        let sql = `
        INSERT INTO review(
            pacientId, 
            doctorId, 
            number
        )
        VALUES(
            '${this.pacientId}',
            '${this.doctorId}',
            '${this.number}'
        );
        `

        return db.execute(sql);
    }

    static findAll() {
        let sql = `SELECT * FROM review;`;

        return db.execute(sql);
    }

    static findByEmail(email) {
        let sql = `SELECT * FROM review WHERE doctorId IN (SELECT id FROM users WHERE email = '${email}');`;

        return db.execute(sql);
    }

}

module.exports = Review;