console.log("Hello Mitchell");
const {takingPicture, cropImage } = require('./helpers.js');
const { exec } = require("child_process");
const Gpio = require('onoff').Gpio;
const led = new Gpio(17, 'out');
const button = new Gpio(18, 'in', 'rising', { debounceTimeout: 10 });

led.writeSync(led.readSync() ^ 1);



button.watch(async (err, value) => {
  if (err) {
    throw err;
  }
  led.writeSync(led.readSync() ^ 1);
  let stdout = takingPicture();
  console.log('now you are done.');
  //console.log('and then I copy' + picture);
  //let magic = cropImage(picture);
  led.writeSync(led.readSync() ^ 1);
/*   setTimeout(_ => {
    led.writeSync(led.readSync() ^ 1);
  }, 5000); */

});

process.on('SIGINT', _ => {
  led.unexport();
  button.unexport();
});