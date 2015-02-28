var dualShock = require('dualshock-controller');
var five = require('johnny-five');

var board = new five.Board();
//pass options to init the controller. 
var controller = dualShock({
	//you can use a ds4 by uncommenting this line. 
	//config: "dualshock4-generic-driver", 
	//if using ds4 comment this line. 
	config : "dualShock3",
	//smooths the output from the acelerometers (moving averages) defaults to true 
	accelerometerSmoothing : true,
	//smooths the output from the analog sticks (moving averages) defaults to false 
	analogStickSmoothing : false
});

board.on("ready", function() {
	 
	var config = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V1;

	var motor1 = new five.Motor(config.M1);
	var motor2 = new five.Motor(config.M2);

  board.repl.inject({
    motor1: motor1,
    motor2: motor2
  });

  // Controller
	controller.on('error', function(data) {
		console.error(data);
	});

	controller.on('left:move', function(data) {
		var speed;
		if (data.y > 140) {
			speed = (data.y - 140) * (255 / 115);
			console.log(speed);
			motor2.reverse(parseInt(speed));
		} else if (data.y < 116) {
			speed = (116 - data.y) * (255 / 116);
			console.log(speed);
			motor2.forward(parseInt(speed));
		}
		else motor2.stop();
	});

	controller.on('right:move', function(data) {
		var speed;
		if (data.y > 140) {
			speed = (data.y - 140) * (255 / 115);
			console.log(speed);
			motor1.forward(parseInt(speed));
		} else if (data.y < 116) {
			speed = (116 - data.y) * (255 / 116);
			console.log(speed);
			motor1.reverse(parseInt(speed));
		}
		else motor1.stop();
	});

	controller.connect();

});
