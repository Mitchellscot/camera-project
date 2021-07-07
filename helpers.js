const { execSync } = require("child_process");
const sharp = require('sharp');

  function takePicture() {
    try{
      execSync(`raspistill -t 2000 -n -o ~/image.jpg`);
    }
    catch(err){
      console.log(err);
    }
    return '/home/pi/image.jpg'
  }

  function cropImage(picture) {
    let date = new Date();
    let filename = date.toISOString();
    const filePath = `/home/pi/croppedImage.jpg`; 
    let image = '/home/pi/image.jpg';
    sharp(image).extract({width: 1920, height: 1080, left: 60, top: 40})
    .toFile(filePath)
    .then((result) => execSync(`mv /home/pi/croppedImage.jpg /mnt/image.jpg; rm -rf ~/*.jpg;`))
    .then((result) => execSync(`sudo umount /mnt`))
    .catch((err) => console.log(`error ${err}`));
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

  module.exports = {takePicture, cropImage, restartProgram };