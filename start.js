console.log("Hello Mitchell");

const Gpio = require('onoff').Gpio;
const led = new Gpio(17, 'out');
const button = new Gpio(18, 'in', 'rising', { debounceTimeout: 10 });
const light = false;

led.writeSync(led.readSync() ^ 1);

button.watch((err, value) => {
  if (err) {
    throw err;
  }
  led.writeSync(led.readSync() ^ 1);
  setTimeout(_ => {
    led.writeSync(led.readSync() ^ 1);
  }, 5000);

  console.log('this is where I take a picture');
});

process.on('SIGINT', _ => {
  led.unexport();
  button.unexport();
});