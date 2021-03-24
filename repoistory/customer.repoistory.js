const Customer = require('../models/customer.model');

class CustomerRepository{

    constructor(){}

    create = (request,dataset) => {

        var customer = new Customer();
        customer.id  = 1
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

    getCustomer = async () => {
      var customer = new Customer();
      customer.id  = 1
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

}

module.exports = CustomerRepository;