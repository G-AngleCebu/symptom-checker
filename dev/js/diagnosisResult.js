var $ = require('jquery');
var qi = require('./qi.js');
var pages = require('./pageController.js');
var translations = require('./translations.js');

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

	$("#result-page").html('');

	var conditionName = translations.translate(diagnosisResult.name);
	var hint = translations.translate(diagnosisResult.extras.hint);

	qi.raiseEvent('say', conditionName + ". " + hint);

	$("#result-page").append(
		'<h1 id="illness" class="element--fadeup">' + conditionName + '</h2>'+
		'<span id="diagnosis" class="element--fadedown">' + hint + '</span>'+
		'<div class="severity element--fadeleft">'+
			'<span id="severity-mild" class="severity-meter-bar">'+
				'<i class="mdi mdi-emoticon-happy"></i>'+
				'<div class="label">' + translations.translate('Mild') + '</div>'+
			'</span>'+
			'<span id="severity-moderate" class="severity-meter-bar">'+
				'<i class="mdi mdi-emoticon-neutral"></i>'+
				'<div class="label">' + translations.translate('Moderate') + '</div>'+
			'</span>'+
			'<span id="severity-severe" class="severity-meter-bar">'+
				'<i class="mdi mdi-emoticon-sad"></i>'+
				'<div class="label">' + translations.translate('Severe') + '</div>'+
			'</span>'+
		'</div>'+
		'<div class="prevalance element--faderight">'+
			'<div id="prevalance-very_rare" class="rarity-meter-bar">'+
				'<div class="bar"></div>'+
				'<label>' + translations.translate('Very Rare') + '</label>'+
			'</div>'+
			'<div id="prevalance-rare" class="rarity-meter-bar">'+
				'<div class="bar"></div>'+
				'<label>' + translations.translate('Rare') + '</label>'+
			'</div>'+
			'<div id="prevalance-moderate" class="rarity-meter-bar">'+
				'<div class="bar"></div>'+
				'<label>' + translations.translate('Moderate') + '</label>'+
			'</div>'+
			'<div id="prevalance-common" class="rarity-meter-bar">'+
				'<div class="bar"></div>'+
				'<label>' + translations.translate('Common') + '</label>'+
			'</div>'+
		'</div>'+
		'<div class="button-container element--fadeup">'+
			'<button class="nav-button"'+
							'data-page="app-title">' + translations.translate('Home') + '</button>'+
			'<button class="nav-button"'+
							'data-page="doctor-page">' + translations.translate('Doctors') + '</button>'+
		'</div>'
	);
	// $conditionName.html(diagnosisResult.name);
	// $probability.html("Probability: " + (100 * diagnosisResult.probability) + "%");
	// $categories.html("Categories: " + JSON.stringify(diagnosisResult.categories));

	$('.severity-meter-bar').removeClass('active');
	$('#severity-'+String(diagnosisResult.severity)).addClass('active');

	$('.rarity-meter-bar.active').removeClass('active');
	$('#prevalance-'+String(diagnosisResult.prevalence)).addClass('active');

	pages.goToPage("#result-page");
}
