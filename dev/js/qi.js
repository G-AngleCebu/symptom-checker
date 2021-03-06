/*
*
* Pepper related functionalities only !!!
*
*/
var diagnosis = require('./diagnosis.js');
var diagnosisResult = require('./diagnosisResult.js');
var userDetails = require('./userDetails.js');

var session = new QiSession();
var MEMORY_PREFIX = "symptom/";

// Init functions
exports.initSubscribe = function(){
	var subscribeFunctions = [
		{
			"eventName": "receiveDiagnosisResult",
			"function": diagnosis.receiveDiagnosisResult
		},
		{
			"eventName": "receiveCompleteDiagnosisResult",
			"function": diagnosisResult.receiveCompleteDiagnosisResult
		},
		{
			"eventName": "saveAge",
			"function": userDetails.setAge
		},
		{
			"eventName": "saveGender",
			"function": userDetails.setGender
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
exports.raiseEvent = function(eventName, value) {
	session.service("ALMemory").done(function (ALMemory) {
		ALMemory.raiseEvent(MEMORY_PREFIX + eventName, value);
	});
}

exports.sayWithExplain = function(text){
	var explainNums = [1,2,3,4,5,6,7,8,10,11];
	var rand = explainNums[Math.floor(Math.random() * explainNums.length)];

	var sayText = "^start(animations/Stand/Gestures/Explain_" + rand + ") " + text + " ^wait(animations/Stand/Gestures/Explain_" + rand + ")";
	exports.raiseEvent('say', sayText);
}