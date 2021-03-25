
const fs = require('fs');

class NuramsCmd{

    arg;
    file;
    dir;

    constructor(arg,dir){

        this.arg = arg;
        this.dir = dir;

    }

     trigger = async () => {
        if ( this.arg[2] == "controller" ){
            this.controller();
        }
        if ( this.arg[2] == "model" ){
            this.model();
        }
        if ( this.arg[2] == "repoistory" ){
            this.repoistory();
        }
        if ( this.arg[2] == "migrate" ){
            await this.migrate();
        }
    }

     migrate = async () => {
        let me = this;
        let ll =  await me.getfile();
        var writeStream = fs.createWriteStream(me.dir+'/database/migration/tables.js');
        ll.forEach((element,index)=>{
            if (element != "tables") writeStream.write("const "+element+" = require('./"+element+"');\n");
        });
        writeStream.write("class Table {\n  constructor(){ \n");
        ll.forEach((element,index)=>{
            if (element != "tables") writeStream.write("     (new "+element+"()).trigger(); \n");
        });
        writeStream.write("   } \n} \n module.exports = Table;");
    }

    getfile = () => {
        let me = this;
        return new Promise((resolve, reject)=>{
            let filelist = [];
            fs.readdir(me.dir+'/database/migration/', (err, files) => {
               files.forEach(file => {
                 filelist.push(file.split('.')[0]);
               });
               resolve(filelist);
             });
        });
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
        if ( typeof me.arg[5] != "undefined" ){
            if (me.arg[5] == "--migrate-table"){
                writeStream = fs.createWriteStream(me.dir+'/database/migration/'+me.arg[3]+'.js');
                writeStream.write("const "+me.arg[3]+"Model = require('../../models/"+me.arg[3]+".model.js');");
                writeStream.write("\n\n");
                writeStream.write("class "+me.arg[3]+" extends "+me.arg[3]+"Model{");
                writeStream.write("\n\n");
                writeStream.write("      migration = 1;");
                writeStream.write("\n\n");
                writeStream.write("     constructor(){ \n");
                writeStream.write("         super(); \n");
                writeStream.write("         var me = this; \n");
                writeStream.write("         me.int('id') \n");
                writeStream.write("         // me.string('name'); \n");
                writeStream.write("         return me; \n");
                writeStream.write("     }");
                writeStream.write("\n\n");
                writeStream.write("     trigger = async () =>{ \n");
                writeStream.write("         var me = this; \n");
                writeStream.write("         await Promise((resolve,reject)=>{ \n");
                writeStream.write("             me.struct((err)=>{ \n");
                writeStream.write("                 if ( !err.error ){ \n");
                writeStream.write("                     resolve(me.table+'table is created.<br>'); \n");
                writeStream.write("                 }else{ \n");
                writeStream.write("                     resolve(me.table+'table is not created.<br>'); \n");
                writeStream.write("                 } \n");
                writeStream.write("             }); \n");
                writeStream.write("         }); \n");
                writeStream.write("     }");
                writeStream.write("\n\n");
                writeStream.write("}");
                writeStream.write("\n\n");
                writeStream.write("module.exports = "+me.arg[3]+"Model;");
                writeStream.end();        
            }
        }
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