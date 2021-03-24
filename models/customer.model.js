const Nurams = require('../nurams/nurams.model');

class Customer extends Nurams{

    table = "customer";

    constructor(){
        super();
    }

}

module.exports = Customer;