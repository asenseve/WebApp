var pgp = require("pg-promise")();
var db = pgp("postgres://postgres:Senale@localhost:5432/dbDES");

class dao {
    constructor () {}
    async consultar(sql, params = []) {
        let data = await db.any(sql, params);
        return data;
    }
    async insertar(sql, params = []) {
        let data = await db.one(sql, params);
        return data;
    }
    async ejecutar(sql, params = []) {
        let data = await db.none(sql, params);
        return data;
    }
}

module.exports = dao;