console.log("Hello Mitchell");
const { execSync } = require("child_process");

const {takePicture, cropImage } = require('./helpers.js');
const Gpio = require('onoff').Gpio;
const led = new Gpio(17, 'out');
const button = new Gpio(18, 'in', 'rising', { debounceTimeout: 10 });

led.writeSync(led.readSync() ^ 1);

  button.watch(async (err, value) => {
    console.log('starting watch');
    if (err) {
      throw err;
    }
    led.writeSync(led.readSync() ^ 1);
    
    let picture = takePicture();
    cropImage(picture);
    console.log('now you are done.');
    led.writeSync(led.readSync() ^ 1);
    execSync(`npm restart`);
  });

process.on('SIGINT', _ => {
  led.unexport();
  button.unexport();
});




