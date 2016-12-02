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
			"eventName": "receiveDiagnosisResult",
			"function": diagnosisPage.receiveDiagnosisResult
		}
	];

	session.service("ALMemory").done(function (ALMemory) {
		// loop all subscribe-function pairs
		subscribeFunctions.forEach(function(elem){
			ALMemory.subscriber(MEMORY_PREFIX + elem.eventName).done(function(subscriber) {
				subscriber.signal.connect(elem.function);
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