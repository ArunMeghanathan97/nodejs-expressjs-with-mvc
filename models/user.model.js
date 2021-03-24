const Nurams = require('../nurams/nurams.model');

class User extends Nurams{

    table = "user";

    constructor(){
        super();
    }

}

module.exports = User;