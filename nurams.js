const NuramsCmd = require('./nurams/nurams.cmd');
const args      = process.argv;
var cmd         = new NuramsCmd(args,__dirname);


  async function asyncCall() {
    console.log('migrating...');
    const result = await cmd.trigger();
//    console.log(result);
  }
  
  asyncCall();