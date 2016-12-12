var $ = require('jquery');
var qi = require('./qi.js');
var pages = require('./pageController.js');
var diagnosis = require('./diagnosis.js');

exports.age = null;
exports.gender = null;
exports.weight = null;
exports.height = null;

var $ageGenderForm = $('#info-1-form');
var $weightHeightForm = $('#info-2-form');

var $form1SubmitButton = $ageGenderForm.find('button[type="submit"]');
var $form2SubmitButton = $weightHeightForm.find('button[type="submit"]');

var $ageInputField = $ageGenderForm.find('#age-input');

var $radioFields = $ageGenderForm.find('.radio-field');
var $maleGenderField = $radioFields.find('#male-option');
var $femaleGenderField = $radioFields.find('#female-option');

(function(){
	$form1SubmitButton.on('click', function(){
		var gender = $radioFields.find('input[name="gender-input"]:checked').val();

		exports.age = $ageInputField.val();
		exports.gender = gender;

		qi.raiseEvent('setAgeGender', JSON.stringify({age: exports.age, gender: gender}));
	});

	$form2SubmitButton.on('click', function(){
		pages.goToPage("#dynamic-form");
		diagnosis.startDiagnosis();
	});
})();

exports.setAge = function(age){
	$ageInputField.val(age);
	exports.age = JSON.stringify(age);
}

exports.setGender = function(gender){
	$radioFields.find('input[name="gender-input"]').prop('checked', false);
	$radioFields.find('input[value="' + gender + '"]').prop('checked', true);

	exports.gender = JSON.stringify(gender);
}