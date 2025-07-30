import dbConn from "./dbConn.js";

let credRepo = {
    tableName: "credentials",
    columns: ['email', 'password', 'role'], // TODO:
    async getByEmailAndPassword(email, password) {
        return dbConn.promise().query(
            // Parameterized Queries from:
            // https://medium.com/@ajay.monga73/parameterized-queries-javascript-guide-how-to-prevent-sql-injection-with-parameterized-queries-18c5cbbfffe2
            'SELECT * FROM ' + this.tableName + ' where email = ? and password = ?',
            [email, password]
        );
    },
    async insert(newCred) {
        return dbConn.promise().query(
            'insert into ' + this.tableName + ' (id, email, role, password) values(?, ?, ?, ?)',
            // [newCred['email'], newCred.role, newCred.password],
            [100, 'email', 'role', 'password'].map(x => newCred[x]),
        );
    }
}

export default credRepo