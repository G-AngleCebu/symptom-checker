var $ = require('jquery');
var qi = require('./qi.js');
var translations = require('./translations.js');

// cache dom
var $diagnosisForm = $('form#dynamic-form');
var $formArea = $('#form-area');
var $questionArea = $diagnosisForm.find('.question-area');

// current items data
var symptomItems;
var currentQuestionType;

(function(){
	$diagnosisForm.on('submit', submitForm);
})();

// for group_multiple questions: multiple choices multiple answers (checkboxes)
function submitForm(e){
	e.preventDefault();

	// data from form
	var formData = $(this).serializeArray();

	// object to be passed to choregraphe
	var symptomListToDiagnose = {};

	// set default to absent if not single type question
	symptomItems.forEach(function(item){
			symptomListToDiagnose[item.id] = 'absent';
	});

	// set checked choices to present (all the items in formData are the checked items)
	formData.forEach(function(item){
		symptomListToDiagnose[item.value] = 'present';
	});

	submitDiagnosisToChoregraphe(symptomListToDiagnose);
}

// for group_single questions: multiple choices but 1 answer
function submitGroupSingleAnswer(e){
	var itemId = $(this).val();

	// object to be passed to choregraphe
	var symptomListToDiagnose = {};

	// set default to absent
	symptomItems.forEach(function(item){
		symptomListToDiagnose[item.id] = 'absent';
	});

	// set the id of the pressed button to present
	symptomListToDiagnose[itemId] = 'present';

	submitDiagnosisToChoregraphe(symptomListToDiagnose);
}

// for Yes/No/Dont Know choices
function submitSingleAnswer(e){
	var itemId = symptomItems[0].id;

	// object to be passed to choregraphe
	var symptomListToDiagnose = {};

	// set the current item id to whichever is pressed
	symptomListToDiagnose[itemId] = $(this).val();

	submitDiagnosisToChoregraphe(symptomListToDiagnose);
}

// utility function to add new symptoms to choregraphe and run diagnosis
function submitDiagnosisToChoregraphe(symptomListToDiagnose){
	$formArea.find('button').prop('disabled', true);
	$formArea.html('');
	qi.raiseEvent('diagnosis', JSON.stringify(symptomListToDiagnose));
}

exports.startDiagnosis = function(){
	$('#question').html(translations.translate('Loading...'));
	qi.raiseEvent('startDiagnosis');
}

// receives diagnosis result (see sample_data/sample diagnosis result.json)
exports.receiveDiagnosisResult = function(data){
	var diagnosisResult = JSON.parse(data);
	var question = diagnosisResult.question;
	var questionItems = question.items;

	console.log(diagnosisResult);

	currentQuestionType = question.type;
	symptomItems = questionItems;

	// clear choices list
	$formArea.html('');

	// set question text
	$questionArea.html('');
	$questionArea.append('<span id="question" class="element--fadeup">' + translations.translate(question.text) + '</span>');

	// GROUP_SINGLE
	if(currentQuestionType == "group_single"){
		questionItems.forEach(function(item){
			$formArea.append(
				'<input id="' + item.id + '" name="choice" type="radio" value="' + item.id + '"/>'+
				'<div class="dynamic-input-wrapper element--fadedown">'+
					'<label class="radio-label" for="' + item.id + '">'+
						translations.translate(item.name) +
					'</label>'+
				'</div>');
		});
		$formArea.find('input[name="choice"]').on('click', submitGroupSingleAnswer);
	}
	// GROUP_MULTIPLE
	else if(currentQuestionType == "group_multiple"){
		questionItems.forEach(function(item){
			$formArea.append(
				'<input id="' + item.id + '" name="choice" type="checkbox" value="' + item.id + '"/>'+
				'<div class="dynamic-input-wrapper element--fadedown">'+
					'<label class="checkbox-label" for="' + item.id + '">'+
						'<span class="toggle-box"></span>'+
						translations.translate(item.name) +
					'</label>'+
				'</div>');
			
		});
		$formArea.append('<button type="submit">' + translations.translate('Submit') + '</button>');
	}
	// SINGLE
	else if(currentQuestionType == "single"){
		var questionChoices = questionItems[0].choices;
		// button
		$formArea.append(
			'<input id="yes-option" name="choice" type="radio" value="present"/>'+
			'<div class="dynamic-input-wrapper element--fadedown">'+
				'<label class="radio-label" for="yes-option">' + translations.translate('Yes') + '</label>'+
			'</div>');

		$formArea.append(
			'<input id="no-option" name="choice" type="radio" value="absent"/>'+
			'<div class="dynamic-input-wrapper element--fadedown">'+
				'<label class="radio-label" for="no-option">' + translations.translate('No') + '</label>'+
			'</div>');

		$formArea.append(
			'<input id="dontknow-option" name="choice" type="radio" value="unknown"/>'+
			'<div class="dynamic-input-wrapper element--fadedown">'+
				'<label class="radio-label" for="dontknow-option">' + translations.translate('Don\'t know') + '</label>'+
			'</div>');

		$formArea.find('input[name="choice"]').on('click', submitSingleAnswer);
	}
}
