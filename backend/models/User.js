const db = require('../config/db');

class User {
    constructor(email, first_name, last_name, age, gender, role) {
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.age = age;
        this.gender = gender;
        this.role = role;
    }

    save() {

        let sql = `
        INSERT INTO users(
            email,
            first_name,
            last_name,
            age,
            gender,
            role
        )
        VALUES(
            '${this.email}',
            '${this.first_name}',
            '${this.last_name}',
            '${this.age}',
            '${this.gender}',
            '${this.role}'
        )
        `;

        return db.execute(sql);
    }

    static findAll() {
        let sql = `SELECT * FROM users;`;

        return db.execute(sql);
    }

    static findByEmail(email) {
        let sql = `SELECT * FROM users WHERE email = '${email}';`;

        return db.execute(sql);
    }

    static findEmailById(id) {
        let sql = `SELECT email FROM users WHERE id = '${id}';`;
    }

    static findAllDoctors() {
        let sql = `SELECT * FROM users WHERE role = 'doctor';`;

        return db.execute(sql);
    }

    static findByName(first_name, last_name) {
        let sql = `SELECT * FROM users WHERE role = 'doctor' AND first_name = '${first_name}' AND last_name = '${last_name}';`;

        return db.execute(sql);
    }

}

module.exports = User;