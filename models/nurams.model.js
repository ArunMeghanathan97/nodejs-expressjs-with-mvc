const sql = require('./db');

class Nurams{

    constructor(table){
        this.model = {};
        this.table = table;
    }

    save = (result) => {
        var me = this;
        var query    = "INSERT INTO "+ me.table +" SET ";
        var saveset  = [];
        if ( typeof me.model === 'object' && me.model !== null ){
            for( var key in me.model ){
                saveset.push(key+"='"+me.model[key]+"'");
            }
        }
        if ( saveset.length > 0 ){
            query += saveset.join(' , ');
        }
        sql.query(query,(err,res)=>{
            if (err) {
                console.log("error: ", err);;
                return null;
              }
              me.model   = { id : res.insertId, ...me.model };
              result(me);
              return;
        });
    };
    
    set = (obj) =>{
        this.model= { ...this.model, ...obj };
    }

}

module.exports = Nurams;