/*
 *
 * Pepper related functionalities only !!!
 *
 */

var session = new QiSession();
var MEMORY_PREFIX = "SymptomChecker/";

// Init functions
function initSubscribe(){
	var subscribeFunctions = [
		{
			"eventName": "test",
			"function": homePage.showHomePage
		}
	];

	session.service("ALMemory").done(function (ALMemory) {
		// loop all subscribe-function pairs
		subscribeFunctions.forEach(function(elem){
			ALMemory.subscriber(MEMORY_PREFIX + elem.eventName).done(function(subscriber) {
				subscriber.signal.connect(homePage.showHomePage);
			});
		});
	});
}

// Utility functions
function raiseEvent(eventName, value) {
	session.service("ALMemory").done(function (ALMemory) {
		ALMemory.raiseEvent(MEMORY_PREFIX + eventName, value);
	});
}
