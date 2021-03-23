const Nurams = require('./nurams.model');

class User extends Nurams{

    table = "user";

    constructor(){
        super();
    }

}

module.exports = User;