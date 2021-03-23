const Customer = require('../../models/customer.model');

class customer extends Customer{

    migration = 1;

    constructor(req,res){
        super();
        var me = this;
        me.int("id")
            .string("name")
            .struct((err)=>{
                if ( !err.error ){
                    res.writeHead(200);
                    res.end(me.table+"table is created.<br>");
//                    res.status(200).send({ error : false,  msg : me.table+" table is created." });
                 }else{
//                    res.status(200).send({ error : true, msg : me.table+" table not created..!" });
                 }
            });
    }
}

module.exports = customer;