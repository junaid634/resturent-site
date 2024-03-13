let fig = require("figlet");
function myname(){
    setTimeout(async()=>{
       fig("< Junaid  Khan > \n\n Server  Running!!", function(arr, data){
          if(arr){
           console.log(arr);
          } 
       console.log(data);
       });
    }, 100);
    }
    module.exports = myname;