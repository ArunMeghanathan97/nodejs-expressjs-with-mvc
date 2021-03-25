const Nurams = require('../nurams/nurams.model');

class UserModel  extends Nurams{

     table = 'users';

     constructor(){ 
         super(); 
         // write code here.. 
     }

}

module.exports = UserModel;