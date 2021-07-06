const { execSync } = require("child_process");
const sharp = require('sharp');

  function takePicture() {
    execSync(`raspistill -t 2000 -n -o ~/image.jpg`);
    return '/home/pi/image.jpg'
  }

  function cropImage(picture) {
    let date = new Date();
    let filename = date.toISOString();
    const filePath = `/home/pi/image2.jpg`; 
    let image = '/home/pi/image.jpg';
    sharp(image).extract({width: 1920, height: 1080, left: 60, top: 40})
    .toFile(filePath)
    .then((result) => execSync(`mv /home/pi/image2.jpg /home/pi/Desktop/image.jpg; rm -rf ~/*.jpg;`))
    //.then((result) => execSync(`sudo umount /mnt`))
    .catch((err) => console.log(`error ${err}`));
    return;
  }

  module.exports = {takePicture, cropImage };