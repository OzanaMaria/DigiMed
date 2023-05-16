const db = require('../config/db');

class User {
    constructor(email, role) {
        this.email = email;
        this.role = role;
    }

    async save() {

        let sql = `
        INSERT INTO users(
            email,
            role
        )
        VALUES(
            '${this.email}',
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

}

module.exports = User;