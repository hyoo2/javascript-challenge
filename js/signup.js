/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict";

document.addEventListener('DOMContentLoaded', function() {
	var form = document.getElementById('signup');
	var statesSelect = form.elements['state'];
	var idx;
	var option;
	var state;

	for (idx = 0; idx < usStates.length; ++idx) {
		option = document.createElement('option');
		state = usStates[idx];
		option.value = state.code;
		option.innerHTML = state.name;
		statesSelect.appendChild(option);
	}

	form.addEventListener('change', function() {
		var occupation = form.elements['occupation'];
		var otherOccupation = form.elements['occupationOther'];

		if (occupation.value == 'other') {
			otherOccupation.style.display = 'block';
		}
		else {
			otherOccupation.style.display = 'none';
		}
	});

	var cancelButton = document.getElementById('cancelButton');

	cancelButton.addEventListener('click', function() {
		if (window.confirm('Are you sure you want to leave this page??')) {
			window.location = 'http://google.com';
		}
	});

	form.addEventListener('submit', onSubmit);
});

function onSubmit(eventObject) {
	var valid = true;

	try {
		var valid = validateForm(this);
	}
	catch (exception) {
		console.log(exception);
		valid = false;
	}

	if (!valid && eventObject.preventDefault) {
		eventObject.preventDefault();
	}

	eventObject.returnValue = valid;
	return valid;
} // onSubmit

function validateForm(form) {
	var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];

	var occupation = form.elements['occupation'];
	if (occupation.value == 'other') {
		requiredFields.push(['occupationOther']);
	}

	var idx;
	var valid = true;
	for (idx = 0; idx < requiredFields.length; ++idx) {
		valid &= validateRequiredField(form.elements[requiredFields[idx]]);
	}


	var zipRegExp = new RegExp('^\\d(5)$');
	var validZip = form.elements['zip'];
	if (!zipRegExp.test(validZip.value)) {
		valid = false;
		validZip.className = 'form-control invalid';
	}

	var birthday = form.elements['birthdate'];
	var years = moment().diff(birthday.value, 'years');
	if (years < 13) {
		valid = false;
		birthday.className = 'form-control invalid';
		var msg = document.getElementById('birthdateMessage');
		msg.innerHTML = 'You must be 13 years or older to sign up!';
	}

	return valid;
}

function validateRequiredField(field) {
	var value = field.value;
	value = value.trim();
	var valid = value.length > 0;

	if (valid) {
		field.className = 'form-control';
	}
	else {
		field.className = 'form-control invalid-field';
	}
	return valid;
}