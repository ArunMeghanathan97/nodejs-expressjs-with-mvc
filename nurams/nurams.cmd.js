
const fs = require('fs');

class NuramsCmd{

    arg;
    file;

    constructor(arg){
        this.arg = arg;
        if ( this.arg[2] == "controller" ){
            this.controller();
        }
    }

    controller = () => {
        let me   = this;
        var writeStream = fs.createWriteStream('../myExpressApp/controller/'+me.arg[3]+'.controller.js');
        writeStream.write("\n");
        writeStream.write("class "+me.arg[3]+"Controller {");
        writeStream.write("\n\n");
        writeStream.write("     constructor(){ \n");
        writeStream.write("         // write code here.. \n");
        writeStream.write("     }\n");
        writeStream.write("\n");
        writeStream.write("}");
        writeStream.end();
    }

}

module.exports = NuramsCmd;