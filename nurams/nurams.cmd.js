
const fs = require('fs');
const { resolve } = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

class NuramsCmd{

    arg;
    file;
    dir;

    constructor(arg,dir){

        this.arg = arg;
        this.dir = dir;

    }

     trigger = () => {
         return new Promise((resolve,reject)=>{
            if ( this.arg[2] == "controller" ){
                this.controller();
                resolve(1);
            }
            if ( this.arg[2] == "model" ){
                this.model();
                resolve(1);
            }
            if ( this.arg[2] == "repoistory" ){
                this.repoistory();
                resolve(1);
            }
            if ( this.arg[2] == "migrate" ){
                this.migrate();
                resolve(1);
            }    
         });
    }

     migrate = async (ret) => {
        let me = this;
//        await me.getfile();
       let list = await me.getfiles();
       await me.callBack(list)
    }

    getfiles = () => {
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

    getfile = () => {
        let me = this;
        return new Promise((resolve, reject)=>{
            fs.readdir(me.dir+'/database/migration/', (err, files) => {
               files.forEach( async (file) => {
                 let element = file.split('.')[0];
                 console.log("migrating table ("+element+")..");
                 await exec("node ./database/migration/"+element, (error, stdout, stderr) => {
                     console.log("migrating table ("+element+") completed.");
                 });
               });
               resolve(1);
             });
        });
    }

    callBack(list){
        if ( Array.isArray(list) ){
            if ( list.length > 0 ){
                let c = list[0];
                console.log("migrating table ("+c+")..");
                exec("node ./database/migration/"+c, (error, stdout, stderr) => {
                    console.log("migrating table ("+c+") completed.");
                    let l = [];
                    list.forEach((e,i)=>{
                        if ( i > 0 ) l.push(e);
                    });
                    if ( l.length > 0) this.callBack(l);
                    else console.log("migration completed..");
                });
            }
        }
        return "oo";
    }

    controller = () => {
        let me   = this;
        var writeStream = fs.createWriteStream(me.dir+'/controller/'+me.arg[3].toString().toLowerCase()+'.controller.js');
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
        var writeStream = fs.createWriteStream(me.dir+'/models/'+me.arg[3].toString().toLowerCase()+'.model.js');
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
            if (me.arg[5] == "--migrate-table-with-rep"){
                writeStream = fs.createWriteStream(me.dir+'/database/migration/'+me.arg[3]+'.js');
                writeStream.write("const "+me.arg[3]+"Model = require('../../models/"+me.arg[3].toString().toLowerCase()+".model.js');");
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
                writeStream.write("         await me.struct(); \n");
                writeStream.write("         return 1;\n");
                writeStream.write("     }");
                writeStream.write("\n\n");
                writeStream.write("}");
                writeStream.write("\n\n");
                writeStream.write("module.exports = "+me.arg[3]+";");
                writeStream.end();

                var writeStream = fs.createWriteStream(me.dir+'/repoistory/'+me.arg[3].toString().toLowerCase()+'.repoistory.js');
                writeStream.write("const "+me.arg[3]+"Model = require('../../models/"+me.arg[3].toString().toLowerCase()+".model.js');");
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
    }

    repoistory = () =>{
        let me   = this;
        var writeStream = fs.createWriteStream(me.dir+'/repoistory/'+me.arg[3].toString().toLowerCase()+'.repoistory.js');
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