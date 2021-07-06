const { execSync } = require("child_process");

function takePicture() {

    console.log('this is where I take a picture');
    let date = new Date();
    let filename = date.toISOString();
    const filePath = `/mnt/${filename}.jpg`
    exec(`echo camera | sudo raspistill -o ${filePath} -t 1000`, {uid: 1000}, (error, stdout, stderr) => {
      if (error){
        console.log(`error ${error}`);
        return;
      }
      if(stderr){
        console.log(`stderr ${stderr}`);
        return;
      }
      if (stdout){
        console.log(`stdout ${stdout}`);
      }
    });
    return filePath;
  };

  function takingPicture() {
    let date = new Date();
    let filename = date.toISOString();
    const filePath = `/mnt/${filename}.jpg`;
    const command = `raspistill -o /mnt/${filePath} -t 2000`;
    execSync(`raspistill -t 2000 -n -o /mnt/%%.jpg`);
  }

  function cropImage(picture) {

    setTimeout(() => {
      console.log('Cropping image');
      exec(`mv ${picture} /mnt`, (error, stdout, stderr) => {
        if (error){
          console.log(`error ${error}`);
          return;
        }
        if(stderr){
          console.log(`stderr ${stderr}`);
          return;
        }
        if (stdout){
          console.log(`stdout ${stdout}`);
        }
      });
      console.log('done');
      }, 3000);
      return;
  }

  module.exports = {takePicture, cropImage, takingPicture };