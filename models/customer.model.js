const Nurams = require('../nurams/nurams.model');

class CustomerModel  extends Nurams{

     table = 'customers';

     constructor(){ 
         super(); 
         // write code here.. 
     }

}

module.exports = CustomerModel;