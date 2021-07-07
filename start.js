console.log("Hello Miguel");
const {takePicture, cropImage, restartProgram } = require('./helpers.js');
const Gpio = require('onoff').Gpio;
const led = new Gpio(17, 'out');
const button = new Gpio(18, 'in', 'rising', { debounceTimeout: 10 });

led.writeSync(led.readSync() ^ 1);

  button.watch(async (err, value) => {
    if (err) {
      throw err;
    }
    led.writeSync(led.readSync() ^ 1);
    let picture = takePicture();
    cropImage(picture);
    led.writeSync(led.readSync() ^ 1);
    restartProgram();
  });

process.on('SIGINT', _ => {
  led.unexport();
  button.unexport();
});




