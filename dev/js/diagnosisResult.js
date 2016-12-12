var $ = require('jquery');
var pages = require('./pageController.js');

// cache dom
var $diagnosisResult = $('#diagnosis-result');
var $conditionName = $diagnosisResult.find('#condition-name');
var $categories = $diagnosisResult.find('#categories');
var $probability = $diagnosisResult.find('#probability');
var $hint = $diagnosisResult.find('#hint');
var $moreInfo = $diagnosisResult.find('#more-info');

/*

sample diagnosis result object:

{
	"id": "c_249",
	"name": "Acute tonsillitis",
	"categories": [
	  "Laryngology/ENT"
	],
	"prevalence": "moderate",
	"acuteness": "acute",
	"severity": "moderate",
	"extras": {
	  "hint": "I suggest seeing your family doctor.",
	  "icd10_code": "J02.0"
	},
	"sex_filter": "both",
	"probability": 0.9512
}

*/

exports.receiveCompleteDiagnosisResult = function(data){
	var diagnosisResult = JSON.parse(data);

	console.log(diagnosisResult);

	$conditionName.html(diagnosisResult.name);
	$probability.html("Probability: " + (100 * diagnosisResult.probability) + "%");
	$categories.html("Categories: " + JSON.stringify(diagnosisResult.categories));

	if(diagnosisResult.extras.hint){
		$hint.html(diagnosisResult.extras.hint);
	}

	$moreInfo.html('');
	$moreInfo.append('<br/>Prevalence: ' + diagnosisResult.prevalence);
	$moreInfo.append('<br/>Acuteness: ' + diagnosisResult.acuteness);
	$moreInfo.append('<br/>Severity: ' + diagnosisResult.severity);

	pages.goToPage("#diagnosis-result");
}
