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
    async maestro_detalle(sqlm, sqld, parm = [], list_pard = [], nombreid, posid) {
        let data = await db.tx(async t => {
                const id = await t.one(sqlm, parm, a => + a[nombreid]);
                for(const pard of list_pard) { 
                    pard[posid] = id;
                    await t.none(sqld, pard);
                };
                return id;
            });
        return data;    
    }
}

module.exports = dao;