const Nurams = require('./nurams.model');

class Customer{

    constructor(){
        this.table = "customer";
        this.unrams =  new Nurams(this.table);
    }
  
    save = (result) => {
        this.unrams.save((unrams)=>{
            result(null, { ...unrams });
        });
    }
    
}

module.exports = Customer;