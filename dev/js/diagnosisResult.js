var $ = require('jquery');
var pages = require('./pageController.js');

// cache dom
var $diagnosisResult = $('#result-page');
var $conditionName = $('#illness');
var $categories = $diagnosisResult.find('#categories');
var $probability = $diagnosisResult.find('#probability');
var $hint = $('#diagnosis');
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

	// console.log(diagnosisResult);
	//
	// $conditionName.html(diagnosisResult.name);
	// // $probability.html("Probability: " + (100 * diagnosisResult.probability) + "%");
	// // $categories.html("Categories: " + JSON.stringify(diagnosisResult.categories));
	//
	// if(diagnosisResult.extras.hint){
	// 	$hint.html(diagnosisResult.extras.hint);
	// }
	//
	// $('.severity-meter-bar').removeClass('active');
	// $('#severity-'+String(diagnosisResult.severity)).addClass('active');
	//
	// $('.rarity-meter-bar.active').removeClass('active');
	// $('#prevalance-'+String(diagnosisResult.prevalence)).addClass('active');
	// // $moreInfo.html('');
	// // $moreInfo.append('<br/>Prevalence: ' + diagnosisResult.prevalence);
	// // $moreInfo.append('<br/>Acuteness: ' + diagnosisResult.acuteness);
	// // $moreInfo.append('<br/>Severity: ' + diagnosisResult.severity);
	$("#result-page").html('');

	$("#result-page").append(
		'<h1 id="illness" class="element--fadeup">' + diagnosisResult.name + '</h2>'+
		'<span id="diagnosis" class="element--fadedown">' + diagnosisResult.extras.hint + '</span>'+
		'<div class="severity element--fadeleft">'+
			'<span id="severity-mild" class="severity-meter-bar">'+
				'<i class="mdi mdi-emoticon-happy"></i>'+
				'<div class="label">Mild</div>'+
			'</span>'+
			'<span id="severity-moderate" class="severity-meter-bar">'+
				'<i class="mdi mdi-emoticon-neutral"></i>'+
				'<div class="label">Moderate</div>'+
			'</span>'+
			'<span id="severity-severe" class="severity-meter-bar">'+
				'<i class="mdi mdi-emoticon-sad"></i>'+
				'<div class="label">Severe</div>'+
			'</span>'+
		'</div>'+
		'<div class="prevalance element--faderight">'+
			'<div id="prevalance-very_rare" class="rarity-meter-bar">'+
				'<div class="bar"></div>'+
				'<label>Very Rare</label>'+
			'</div>'+
			'<div id="prevalance-rare" class="rarity-meter-bar">'+
				'<div class="bar"></div>'+
				'<label>Rare</label>'+
			'</div>'+
			'<div id="prevalance-moderate" class="rarity-meter-bar">'+
				'<div class="bar"></div>'+
				'<label>Moderate</label>'+
			'</div>'+
			'<div id="prevalance-common" class="rarity-meter-bar">'+
				'<div class="bar"></div>'+
				'<label>Common</label>'+
			'</div>'+
		'</div>'+
		'<div class="button-container element--fadeup">'+
			'<button class="nav-button"'+
							'data-page="app-title">Home</button>'+
			'<button class="nav-button"'+
							'data-page="doctor-page">Doctors</button>'+
		'</div>'+
	);

	$('.severity-meter-bar').removeClass('active');
	$('#severity-'+String(diagnosisResult.severity)).addClass('active');

	$('.rarity-meter-bar.active').removeClass('active');
	$('#prevalance-'+String(diagnosisResult.prevalence)).addClass('active');

	pages.goToPage("#diagnosis-result");
}
