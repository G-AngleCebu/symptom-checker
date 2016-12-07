var $ = require('jquery');
var qi = require('./qi.js');

// cache dom
var $diagnosis = $('#diagnosis');
var $form = $diagnosis.find('form');
var $choices = $form.find('ul#choices');

// current items data
var symptomItems;

(function(){
	$form.on('submit', submitForm);
})();

// submit diagnosis question form
function submitForm(e){
	e.preventDefault();

	// data from form
	var formData = $(this).serializeArray();

	// object to be passed to choregraphe
	var symptomListToDiagnose = {};

	symptomItems.forEach(function(item){
		symptomListToDiagnose[item.id] = 'absent';
		// symptomListToDiagnose.push({
		// 	'symptom_id': item.id,
		// 	'choice': 'absent'
		// });
	});

	formData.forEach(function(item){
		symptomListToDiagnose[item.value] = 'present';
	});

	console.log(formData);
	console.log(symptomListToDiagnose);
	console.log(JSON.stringify(symptomListToDiagnose));
	qi.raiseEvent('diagnosis', JSON.stringify(symptomListToDiagnose));
}

// receives diagnosis result (see sample_data/diagnosis_result.json)
exports.receiveDiagnosisResult = function(data){
	var diagnosisResult = JSON.parse(data);
	var question = diagnosisResult.question;
	var questionItems = question.items;

	symptomItems = questionItems;

	// clear choices list
	$choices.html('');

	$diagnosis.find('h1').html(question.text + ' (' + question.type + ')');

	if(question.type == "group_single"){
		questionItems.forEach(function(item){
			$choices.append('<input type="radio" id="' + item.id + '" value="' + item.id +'" name="choice" /> <label for="' + item.id + '">' + item.name + '</label><br/>');
		});
	} else if(question.type == "group_multiple"){
		questionItems.forEach(function(item){
			$choices.append('<input type="checkbox" id="' + item.id + '" value="' + item.id +'" name="choice" /> <label for="' + item.id + '">' + item.name + '</label><br/>');
		});
	} else if(question.type == "single"){
		var questionChoices = questionItems[0].choices;
		questionChoices.forEach(function(choice){
			$choices.append('<input type="radio" id="' + choice.id + '" value="' + choice.id +'" name="choice" /> <label for="' + choice.id + '">' + choice.label + '</label><br/>');
		});
	}
}