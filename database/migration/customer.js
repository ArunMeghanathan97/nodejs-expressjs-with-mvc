const CustomerModel = require('../../models/Customer.model.js');

class Customer extends CustomerModel{

      migration = 1;

     constructor(){ 
         super(); 
         var me = this; 
         me.int('id') 
         me.string('name'); 
         return me; 
     }

     trigger = async () =>{ 
         var me = this; 
         await Promise((resolve,reject)=>{ 
             me.struct((err)=>{ 
                 if ( !err.error ){ 
                     resolve(me.table+'table is created.<br>'); 
                 }else{ 
                     resolve(me.table+'table is not created.<br>'); 
                 } 
             }); 
         }); 
     }

}

module.exports = CustomerModel;