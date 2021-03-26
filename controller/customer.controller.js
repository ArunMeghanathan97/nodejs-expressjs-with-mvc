var CustomerRepository = require('../repoistory/customer.repoistory');

class CustomerController{

    create = (req,res) => {

     if (!req.body) {
       res.status(400).send({ error : true, data :null , msg : "Content can not be empty!" });
     }

     var customerRepository = new CustomerRepository();
     customerRepository.create(req.query,(dataset)=>{
        if ( dataset.flg ){
            res.status(200).send({ error : false, data : dataset.data, msg : "" });
         }else{
            res.status(200).send({ error : true, data : null, msg : "something went wrong..! " });
         }
     });

   }

   list = (req,res) => {
      if (!req.body) {
         res.status(400).send({ error : true, data :null , msg : "Content can not be empty!" });
       }
  
       var customerRepository = new CustomerRepository();
       customerRepository.getCustomer(req.query,(dataset)=>{
          if ( dataset.flg ){
              res.status(200).send({ error : false, data : dataset.data, msg : "" });
           }else{
              res.status(200).send({ error : true, data : null, msg : "something went wrong..! " });
           }
       });  
   }

   record = (req,res) => {
      if (!req.body) {
         res.status(400).send({ error : true, data :null , msg : "Content can not be empty!" });
       }
  
       var customerRepository = new CustomerRepository();
       customerRepository.getCustomer(req.query,(dataset)=>{
          if ( dataset.flg ){
              res.status(200).send({ error : false, data : dataset.data, msg : "" });
           }else{
              res.status(200).send({ error : true, data : null, msg : "something went wrong..! " });
           }
       });  
   }

   delete = (req,res) => {
      if (!req.body) {
         res.status(400).send({ error : true, data :null , msg : "Content can not be empty!" });
       }
  
       var customerRepository = new CustomerRepository();
       customerRepository.deleteCustomer(req.query,(dataset)=>{
          if ( dataset.flg ){
              res.status(200).send({ error : false, data : null , msg : dataset.data });
           }else{
              res.status(200).send({ error : true, data : null, msg : "something went wrong..! " });
           }
       });  
   }

}

module.exports = CustomerController;