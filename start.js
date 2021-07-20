console.log("Hello Miguel");
const {takePicture, cropImage } = require('./helpers.js');
const Gpio = require('onoff').Gpio;
const led = new Gpio(17, 'out');
const button = new Gpio(18, 'in', 'rising', { debounceTimeout: 10 });

led.writeSync(led.readSync() ^ 1);

  button.watch(async (err, value) => {
    console.log("button is pressed");
    if (err) {
      throw err;
    }
    led.writeSync(led.readSync() ^ 1);
    let picture = takePicture();
    console.log('this is picture', picture);
    cropImage(picture);
    led.writeSync(led.readSync() ^ 1);
    console.log('all done');
  });

process.on('SIGINT', _ => {
  led.unexport();
  button.unexport();
});




