const { execSync } = require("child_process");
const sharp = require('sharp');

  function takePicture() {
    console.log('taking picture');
    let filename = fileName();
    try{
      execSync(`raspistill -t 2000 -n -o /home/pi/${filename}.jpg`);
    }
    catch(err){
      console.log(err);
    }
    console.log('done taking picture');
    return `/home/pi/${filename}.jpg`;
  }

  function cropImage(picture) {
    console.log('taking a crop on ', picture);
    try{                                  //left, top     //right, bottom
      execSync(`convert ${picture} -crop +980+420 -crop -1200-60 ${picture}`);
    }
    catch(err){
      console.log(err);
    }
    console.log('done taking a crop');
    return;
  }

  function restartProgram(){
    setTimeout(function() {
      process.on("exit", function() {
        require("child_process").spawn(process.argv.shift(), process.argv,{
          cwd: process.cwd(),
          detached: true,
          stdio: "inherit"
        });
      });
      process.exit();
    }, 1000);
  }

  function fileName() {
    let day = new Date();
    let dd = day.getDate()
    let mm = day.getMonth()+1;
    let yyyy = day.getFullYear();
    let hh = day.getHours();
    let mn = day.getMinutes();
    let ss = day.getSeconds();
    if(dd<10) {
        dd = '0'+ dd
    } 
    if(mm<10) {
        mm = '0'+ mm
    }
    if(mn<10) {
        mn = '0'+ mn
    }
    if(ss<10) {
        ss = '0'+ ss
    }
    if(hh<10) {
        hh = '0'+ hh
    }
    return yyyy + mm + dd + hh + mn + ss;
  }

  module.exports = {takePicture, cropImage, restartProgram };