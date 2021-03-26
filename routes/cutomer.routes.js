const CustomerController = require('../controller/customer.controller');

module.exports = app => {

    const customerController = new CustomerController();

    app.post("/customer/save",customerController.create);

    app.get("/customer/list",customerController.list);

    app.get("/customer/get",customerController.record);

    app.get("/customer/delete",customerController.delete);
}