var SerialPort = require("serialport");
var spotify = require('spotify-node-applescript');
const Readline = SerialPort.parsers.Readline;

var port = new SerialPort('/dev/tty.usbmodem14102', {
 baudRate: 115200,
 autoOpen: false
})
const parser = new Readline();
port.pipe(parser);

port.open(() => {
    console.log("Port open");
    parser.on('data', (data) => {
        console.log('Received Data: ' + data.toString());
        processData(data);
    });
})

function processData(data) {
    if (data.indexOf('NEXT') == 0) {
        // Handle NEXT received
        spotify.setShuffling(false);
        spotify.next(function () {
            // Playing the next song
        });
    }
}
