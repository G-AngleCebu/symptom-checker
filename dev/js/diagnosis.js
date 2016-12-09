var $ = require('jquery');
var qi = require('./qi.js');
var pages = require('./pageController.js');

// cache dom
var $diagnosisForm = $('form#dynamic-form');
// var $submitButton = $diagnosisForm.find('button[type="submit"]');
var $choices = $('#form-area');

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

	// $submitButton.prop('disabled', true);
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
	$choices.find('button').prop('disabled', true);
	// $submitButton.prop('disabled', true);
	qi.raiseEvent('diagnosis', JSON.stringify(symptomListToDiagnose));
}

// receives diagnosis result (see sample_data/sample diagnosis result.json)
exports.receiveDiagnosisResult = function(data){
	pages.goToPage("#dynamic-form");

	var diagnosisResult = JSON.parse(data);
	var question = diagnosisResult.question;
	var questionItems = question.items;

	currentQuestionType = question.type;
	symptomItems = questionItems;

	// clear choices list
	$choices.html('');

	$('#question').text(question.text);

	// $diagnosisForm.find('h1').html(question.text);
	// $diagnosisForm.find('h1').html(question.text + ' (' + question.type + ')');

	// $submitButton.hide();

	// GROUP_SINGLE
	if(currentQuestionType == "group_single"){
		questionItems.forEach(function(item){
			// $choices.append('<button type="button" name="choice" value="' + item.id + '">' + item.name + '</button>');
			$choices.append(
				'<input id="' + item.id + '" name="choice" type="radio" value="' + item.id + '"/>'+
				'<div class="dynamic-input-wrapper element--fadedown">'+
					'<label class="radio-label" for="' + item.id + '">'+
						item.name+
					'</label>'+
				'</div>');
			$choices.find('input[name="choice"]').on('click', submitGroupSingleAnswer);
		});
		$choices.find('button[name="choice"]').on('click', submitGroupSingleAnswer);
	}
	// GROUP_MULTIPLE
	else if(currentQuestionType == "group_multiple"){
		questionItems.forEach(function(item){
			// $choices.append('<input type="checkbox" id="' + item.id + '" value="' + item.id +'" name="choice" /> <label for="' + item.id + '">' + item.name + '</label><br/>');
			$choices.append(
				'<input id="' + item.id + '" name="choice" type="checkbox" value="' + item.id + '"/>'+
				'<div class="dynamic-input-wrapper element--fadedown">'+
					'<label class="checkbox-label" for="' + item.id + '">'+
						'<span class="toggle-box"></span>'+
						item.name+
					'</label>'+
				'</div>');
			
		});
		$choices.append('<button type="submit">Submit</button>');

		// $submitButton.prop('disabled', false);
		// $submitButton.show();
	}
	// SINGLE
	else if(currentQuestionType == "single"){
		var questionChoices = questionItems[0].choices;
		// button

		// $choices.append('<button type="button" name="choice" value="present">Yes</button>');
		// $choices.append('<button type="button" name="choice" value="absent">No</button>');
		// $choices.append('<button type="button" name="choice" value="unknown">Don\'t know</button>');
		$choices.append(
			'<input id="yes-option" name="choice" type="radio" value="present"/>'+
			'<div class="dynamic-input-wrapper element--fadedown">'+
				'<label class="radio-label" for="yes-option">YES</label>'+
			'</div>');

		$choices.append(
			'<input id="no-option" name="choice" type="radio" value="absent"/>'+
			'<div class="dynamic-input-wrapper element--fadedown">'+
				'<label class="radio-label" for="no-option">NO</label>'+
			'</div>');

		$choices.append(
			'<input id="dontknow-option" name="choice" type="radio" value="unknown"/>'+
			'<div class="dynamic-input-wrapper element--fadedown">'+
				'<label class="radio-label" for="dontknow-option">DON\'T KNOW</label>'+
			'</div>');

		$choices.find('input[name="choice"]').on('click', submitSingleAnswer);
	}
}
