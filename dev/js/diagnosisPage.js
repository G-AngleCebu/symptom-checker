var $ = require('jquery');
var qi = require('./qi.js');

// cache dom
$form = $('form');
$questionText = $('#question');
$choicesDiv = $('#choices');

$form.on('submit', submitForm);

// submit diagnosis question form
function submitForm(e){
	e.preventDefault();
	var data = JSON.stringify($(this).serializeArray());
	console.log(data);
	qi.raiseEvent('addSymptoms', JSON.stringify(data));
}



// receives diagnosis result (see sample_data/diagnosis_result.json)
exports.receiveDiagnosisResult = function(data){
	var diagnosisResult = JSON.parse(data);

	console.log(JSON.stringify(diagnosisResult));
	console.log(diagnosisResult);

	$questionText.html(diagnosisResult.question.text);
	$choicesDiv.html('<pre>' + JSON.stringify(diagnosisResult.question.items, null, 3) + '</pre>');
}