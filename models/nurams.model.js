const sql = require('./db');

class Nurams{

    constructor(){
        this.model = {};
        this.id    = 0;
    }

    query = (sql,result) => {
        sql.query(sql,(err,res)=>{
            if (err) {
                result(err,null);
              }else{
                result(null,res);
              }
        });
    }

    save = (result) => {
        var me       = this;
        var query    = "";
        if (me.id == 0){
            query    = "INSERT INTO "+ me.table +" SET ";
        }else{
            query    = "UPDATE "+ me.table +" SET ";
        }
        var saveset  = [];
        if ( typeof me.model === 'object' && me.model !== null ){
            for( var key in me.model ){
               if(key != 'id') saveset.push(key+"='"+me.model[key]+"'");
            }
        }
        if ( saveset.length > 0 ){
            query += saveset.join(' , ');
        }
        if ( me.id != 0 ){
            query +=" WHERE id = "+me.id;
        }
        sql.query(query,(err,res)=>{
            if (err) {
                console.log("error: ", err);
                return null;
              }
              if ( me.id == 0 ){
                me.id      = res.insertId;
                me.model   = { id : res.insertId, ...me.model };  
              }else{
                me.model   = { id : me.id, ...me.model };  
              }
              result(null,me);
              return;
        });
    };

    set = (obj) =>{
        this.model= { ...this.model, ...obj };
    }

    get = (obj) =>{
        return this.model[obj];
    }

    getObjects(){
        return this.model;
    }

}

module.exports = Nurams;