const CustomerController = require('../controller/customer.controller');

module.exports = app => {

    const customerController = new CustomerController();
    app.get("/customer",customerController.create);

}