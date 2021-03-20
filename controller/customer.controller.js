const Customer = require('../models/customer.model');

class CustomerController{

    create = function(req,res){
        // Validate request
     if (!req.body) {
       res.status(400).send({
         message: "Content can not be empty!"
       });
     }

     var customer = new Customer();
     
     customer.unrams.set({ name : "Arun" });
   
     customer.save((errr,resp)=>{
       if ( !errr ){
           res.send(resp);
       }
     });
   
   }
}

module.exports = CustomerController;