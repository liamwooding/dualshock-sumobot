var dualShock = require('dualshock-controller');
 
//pass options to init the controller. 
var controller = dualShock(
		{
				//you can use a ds4 by uncommenting this line. 
				//config: "dualshock4-generic-driver", 
				//if using ds4 comment this line. 
				config : "dualShock3",
				//smooths the output from the acelerometers (moving averages) defaults to true 
				accelerometerSmoothing : true,
				//smooths the output from the analog sticks (moving averages) defaults to false 
				analogStickSmoothing : false
		});
 
//make sure you add an error event handler 
controller.on('error', function(data) {
	console.error(data) 
});
 
//add event handlers: 
controller.on('left:move', function(data) {
	console.log(data)
});

controller.connect();
