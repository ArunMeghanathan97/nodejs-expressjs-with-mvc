
const fs = require('fs');

class NuramsCmd{

    arg;
    file;
    dir;

    constructor(arg,dir){

        this.arg = arg;
        this.dir = dir;
        if ( this.arg[2] == "controller" ){
            this.controller();
        }
        if ( this.arg[2] == "model" ){
            this.model();
        }
        if ( this.arg[2] == "repoistory" ){
            this.repoistory();
        }

    }

    controller = () => {
        let me   = this;
        var writeStream = fs.createWriteStream(me.dir+'/controller/'+me.arg[3]+'.controller.js');
        writeStream.write("\n\n");
        writeStream.write("class "+me.arg[3]+"Controller {");
        writeStream.write("\n\n");
        writeStream.write("     constructor(){ \n");
        writeStream.write("         // write code here.. \n");
        writeStream.write("     }\n");
        writeStream.write("\n");
        writeStream.write("}");
        writeStream.write("\n\n");
        writeStream.write("module.exports = "+me.arg[3]+"Controller;");
        writeStream.end();
        console.log("controller created..!");
    }

    model = () =>{
        let me   = this;
        let tablename = ( (typeof me.arg[4] == undefined||me.arg[4]==null)?me.arg[3].toString().toLowerCase():me.arg[4].toString());
        var writeStream = fs.createWriteStream(me.dir+'/models/'+me.arg[3]+'.model.js');
        writeStream.write("const Nurams = require('../nurams/nurams.model');")
        writeStream.write("\n\n");
        writeStream.write("class "+me.arg[3]+"Model  extends Nurams{");
        writeStream.write("\n\n");
        writeStream.write("     table = '"+tablename+"';");
        writeStream.write("\n\n");
        writeStream.write("     constructor(){ \n");
        writeStream.write("         super(); \n")
        writeStream.write("         // write code here.. \n");
        writeStream.write("     }\n");
        writeStream.write("\n");
        writeStream.write("}");
        writeStream.write("\n\n");
        writeStream.write("module.exports = "+me.arg[3]+"Model;");
        writeStream.end();
        console.log("model created..!");
    }

    repoistory = () =>{
        let me   = this;
        var writeStream = fs.createWriteStream(me.dir+'/repoistory/'+me.arg[3]+'.repoistory.js');
        writeStream.write("\n\n\n");
        writeStream.write("class "+me.arg[3]+"Repository {");
        writeStream.write("\n\n");
        writeStream.write("     constructor(){ \n");
        writeStream.write("         // write code here.. \n");
        writeStream.write("     }\n");
        writeStream.write("\n");
        writeStream.write("}");
        writeStream.write("\n\n");
        writeStream.write("module.exports = "+me.arg[3]+"Repository;");
        writeStream.end();
        console.log("repository created..!");
    }

}

module.exports = NuramsCmd;