const CustomerModel = require('../models/customer.model');

class CustomerRepository{

    constructor(){}

    create = (request,dataset) => {

        var customer = new CustomerModel();
//        customer.id  = 1
        customer.set({ name : request.name });
        
        customer.save((errr,resp)=>{
          if ( !errr ){
            dataset({ flg : true , data : resp.model });
            return;
          }else{
            dataset({ flg : false, data : null });
            return;
          }
        });

    }

    getCustomers = async (request,dataset) => {

      var customer  = new CustomerModel();
      let data      = await customer.getResult();
//      console.log(data);
      if ( data.flg == true ){
        dataset({  flg : true , data : data.data });
      }else{
        dataset({  flg : false , data : null });
      }

    }

    getCustomer = async (request,dataset) => {

      var customer  = new CustomerModel();
      customer.id   = request.id;
      let data      = await customer.first();
//      console.log(data);
      if ( data.flg == true ){
        dataset({  flg : true , data : data.data });
      }else{
        dataset({  flg : false , data : null });
      }

    }

    deleteCustomer = async (request,dataset) => {

      var customer  = new CustomerModel();
      customer.id   = request.id;
      let data      = await customer.delete();
      if ( data.flg == true ){
        dataset({  flg : true , data : "Deleted..!" });
      }else{
        dataset({  flg : false , data : null });
      }

    }

}

module.exports = CustomerRepository;