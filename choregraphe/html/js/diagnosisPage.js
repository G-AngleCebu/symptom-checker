var diagnosisPage = (function(){
	$form = $('form');
	$form.on('submit', submitForm);

	function receiveDiagnosisResult(data){
		var diagnosisResult = JSON.parse(data);

		console.log(diagnosisResult.conditions);
	}

	function submitForm(e){
		e.preventDefault();
		var data = JSON.stringify($(this).serializeArray());
		console.log(data);
		// raiseEvent('addSymptoms', JSON.stringify(j));		
	}

	return {
		receiveDiagnosisResult: receiveDiagnosisResult
	}
})();