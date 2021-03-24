const customer = require('./customer');
const user     = require('./user');

class Table {

    constructor(){}

    create = (req,res) => {
        (new customer(req,res)).trigger();
        res.send(" tables is created.");
    }

}

module.exports = Table;