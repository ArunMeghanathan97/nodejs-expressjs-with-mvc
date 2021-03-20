var CustomerRepository = require('../repoistory/customer.repoistory');

class CustomerController{

    create = function(req,res){

     if (!req.body) {
       res.status(400).send({ error : true, data :null , msg : "Content can not be empty!" });
     }

     var customerRepository = new CustomerRepository();
     customerRepository.create(req,(dataset)=>{
        if ( dataset.flg ){
            res.status(200).send({ error : false, data : dataset.data, msg : "" });
         }else{
            res.status(200).send({ error : true, data : null, msg : "something went wrong..! " });
         }
     });

   }
}

module.exports = CustomerController;