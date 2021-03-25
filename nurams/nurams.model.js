const sql = require('../database/db');

class Nurams{

    constructor(){
        this.model      = {};
        this.column     = [];
        this.q          = '';
        this.limitc     = '';
        this.orderc     = '';
        this.wherec     = []
        this.orwherec   = []
        this.id         = 0;
    }

    rawQuery = (sql,result) => {
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

    select = (...args) => {
        if ( typeof args != undefined && args != null ){
            if( Array.isArray(args) ){
                this.column = args.join(',');
            }
        }
        return this;
    }

    where = (args) => {
        let me = this;
        if( Array.isArray(args) ){
            if ( args.length > 0 ){
                if ( Array.isArray(args[0]) ){
                    args.forEach((ele,ind)=>{
                        if ( Array.isArray(ele) && ele.length == 3 ){
                            me.wherec.push(ele[0]+" "+ele[1]+" "+ele[2]);
                        }
                    });
                }else{
                    if(typeof args[0] == "string"){
                        if ( args.length == 2 ){
                            me.wherec.push(args[0]+" = "+args[1]);
                        }else if(args.length == 4){
                            me.wherec.push(args[0]+" "+args[1]+" "+args[2]);
                        }
                    }
                }
            }
        }else if (typeof args == "number"){
            me.wherec.push("id = "+args);
        }
    }

    orWhere = (args) => {
        let me = this;
        if( Array.isArray(args) ){
            if ( args.length > 0 ){
                if ( Array.isArray(args[0]) ){
                    args.forEach((ele,ind)=>{
                        if ( Array.isArray(ele) && ele.length == 3 ){
                            me.orwherec.push(ele[0]+" "+ele[1]+" "+ele[2]);
                        }
                    });
                }else{
                    if(typeof args[0] == "string"){
                        if ( args.length == 2 ){
                            me.orwherec.push(args[0]+" = "+args[1]);
                        }else if(args.length == 4){
                            me.orwherec.push(args[0]+" "+args[1]+" "+args[2]);
                        }
                    }
                }
            }
        }else if (typeof args == "number"){
            me.orwherec.push("id = "+args);
        }
    }

    setCondition = () => {
        let me = this;
        if(me.column != ""){
            me.q = "SELECT "+me.column+" FROM "+me.table+"";
        }else{
            me.q = "SELECT * FROM "+me.table+"";
        }
        if ( me.wherec.length > 0 ){
            me.q += " WHERE "+me.wherec.join(' AND ');
            if ( me.orwherec.length > 0 ){
                me.q += " AND "+me.orwherec.join(' OR ');
            }
        }else{
            me.q += " WHERE "+me.orwherec.join(' OR ');
        }
    }

    limit = (from,count) => { this.limitc = " LIMIT "+from+" , "+count; }

    setLimit = () =>{ this.q += this.limitc; }

    orderBy = (column_args,order) => {
        if ( Array.isArray(column_args) ){
            this.orderc = " "+column_args.join(' , ')+ " ORDER BY "+order;
        }else{
            this.orderc = " "+column_args+ " ORDER BY "+order;
        }
    }

    setOrderBy = () => { this.q += this.orderc; }

    get = async () => {
        let me = this;

        me.setCondition();
        me.setLimit();
        me.setOrderBy();

        sql.query(sql,(err,res,fields)=>{
            if (err) {
                return [];
              }else{
                  let ret = [];
                  if ( Array.isArray(res) ){
                      res.forEach((ele,ind)=>{
                          let obj = new Nurams();
                          obj.set(ele);
                          obj.id = ele.id;
                          ret.push(obj);
                      });
                  }
                return ret;
              }
        });
    }

    getRaw = async () => {
        let me = this;
        if(me.column != ""){
            me.q = "SELECT "+me.column+" FROM "+me.table+"";
        }else{
            me.q = "SELECT * FROM "+me.table+"";
        }
        sql.query(sql,(err,res,fields)=>{
            if (err) {
                return [];
              }else{
                return res;
              }
        });
    }

    delete = async () => {
        var me       = this;
        if (me.id != 0){
            query    = "DELETE FROM "+ me.table +" WHERE id = "+me.id;
            sql.query(sql,(err,res)=>{
                if (err) {
                    return {error : err, flg : false};
                  }else{
                      return {error : err, flg : true};
                  }
            });
        }else{
            return {error : "id missing", flg : false};
        }
    }

    set = (obj) =>{
        this.model= { ...this.model, ...obj };
    }

    get = (obj) =>{
        return this.model[obj];
    }

    getObjects(){
        return this.model;
    }

    struct = () => {
        var me      = this;
        return new Promise((resolve,reject)=>{
            if(typeof me.migration == undefined ) resolve({});

            var structls = [];
            if ( typeof me.column != null && typeof me.column != undefined){
                for ( var i in me.column ){
                    var colst = me.column[i];
                    var colval = "";
                    if ( colst.type == 1 ){
                        colval  = " `"+colst.name+"` int("+(colst.size)+") NOT NULL ";
                    }else if ( colst.type == 2 ){
                        colval  = " `"+colst.name+"` varchar("+(colst.size)+") NOT NULL ";
                    }else if ( colst.type == 3 ){
                        colval  = " `"+colst.name+"` text NOT NULL ";
                    }else if ( colst.type == 4 ){
                        colval  = " `"+colst.name+"` date NOT NULL ";
                    }else if ( colst.type == 5 ){
                        colval  = " `"+colst.name+"` timem NOT NULL ";
                    }else if ( colst.type == 6 ){
                        colval  = " `"+colst.name+"` datetime NOT NULL ";
                    }else if ( colst.type == 7 ){
                        colval  = " `"+colst.name+"` mediumtext NOT NULL ";
                    }else if ( colst.type == 8 ){
                        colval  = " `"+colst.name+"` longtext NOT NULL ";
                    }else if ( colst.type == 9 ){
                        colval  = " `"+colst.name+"` decimal("+colst.size+","+colst.len+") NOT NULL ";
                    }else if ( colst.type == 10 ){
                        colval  = " `"+colst.name+"` float("+colst.size+","+colst.len+") NOT NULL ";
                    }
                    if ( colst.default == 1 && colval != ""){
                        colval += "DEFAULT '"+colst.defaultval+"' "
                    }
                    if ( colval != "" ){
                        structls.push(colval);
                    }
                }
            }
            if ( structls.length > 0 ){
                var query = "SET AUTOCOMMIT = 0; START TRANSACTION; CREATE TABLE "+me.table+" (" + structls.join(' , ')+" );";
                query += "ALTER TABLE "+me.table+" ADD PRIMARY KEY (`id`);"
                query += "ALTER TABLE "+me.table+" MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;COMMIT;"
                sql.query(query,(err,res)=>{
                    if (err) {
                        resolve({error : err});
                      }else{
                        resolve({error : null});
                      }
                });
            }else{
                resolve({error : "no"});
            }
        });
    }

    int = (name,size=0) => {
        this.column.push( { name : name, type : 1, size : (size==0?11:(size>19?19:size)) } );
        return this;
    }

    string = (name,size=0) => {
        this.column.push( { name : name, type : 2, size :  (size==0?255:(size>255?255:size)) } );
        return this;
    }

    text = (name,size=0) => {
        this.column.push( { name : name, type : 3, size :  (size==0?65535:(size>65535?65535:size)) } );
        return this;
    }

    date = (name,size=0) => {
        this.column.push( { name : name, type : 4, size :  size } );
        return this;
    }

    time = (name,size=0) => {
        this.column.push( { name : name, type : 5, size :  size } );
        return this;
    }

    datetime = (name,size=0) => {
        this.column.push( { name : name, type : 6, size :  size } );
        return this;
    }

    mediumtext = (name,size=0) => {
        this.column.push( { name : name, type : 7, size :  (size==0?16777215:(size>16777215?16777215:size)) } );
        return this;
    }

    longtext = (name,size=0) => {
        this.column.push( { name : name, type : 8, size :  (size==0?4294967295:(size>4294967295?4294967295:size)) } );
        return this;
    }

    decimal = (name,size=0,len=0) => {
        this.column.push( { name : name, type : 8, size :  (size==0?65:(size>65?65:size)), len : (len=0?10:(len>10?10:len)) } );
        return this;
    }

    float = (name,size=0,len=0) => {
        this.column.push( { name : name, type : 8, size :  (size==0?23:(size>23?23:size)), len : (len=0?8:(len>8?8:len)) } );
        return this;
    }

}

module.exports = Nurams;