const CustomerController = require('../controller/customer.controller');
const Table = require('../migration/database/tables');

module.exports = app => {

    const customerController = new CustomerController();
    const table              = new Table();

    app.get("/migration",table.create);

    app.get("/customer",customerController.create);

}