var pgp = require("pg-promise")();
//var scon = "postgres://" + process.env.USUARIO + ":" + process.env.PASSWORD + "@" + process.env.SERVERBD + ":" +  process.env.PORTBD + "/" + process.env.DB;
//var db = pgp(scon);
var db = pgp("postgres://postgres:Senale@localhost:5432/dbDES");
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

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