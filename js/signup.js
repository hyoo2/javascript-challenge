/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict"

function onReady() {
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

	form.addEventListener('submit', onSubmit);
}

document.addEventListener('DOMContentLoaded', function() {
	document.addEventListener('change', function() {
		var occupation = document.getElementById('occupation');
		var otherOccupation = document.getElementsByName('occupationOther')[0];

		if (occupation.value == 'other') {
			otherOccupation.style.display = 'block';
		}
		else {
			otherOccupation.style.display = 'none';
		}
	});
});

document.addEventListener('DOMContentLoaded', function() {
	var cancelButton = document.getElementById('cancelButton');
	cancelButton.addEventListener('click', function() {
		if (window.confirm('Do you really want to leave this page??')) {
			window.location = 'http://google.com';
		}
	});
});

function onSubmit(eventObject) {
	try {
		var valid = validateForm(this);
	}
	catch (exception) {
		valid = false;
	}

	if (!valid) {
		var errMsg = document.getElementById('error-message');
		errMsg.innerHTML = 'Please provide values for the required fields!';
		errMsg.style.display = 'block';
	}

	if (!valid && eventObject.preventDefault) {
		eventObject.preventDefault();
	}

	eventObject.returnValue = valid;
	return valid;
}

function validateForm(form) {
	var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
	var idx;
	var valid = true;

	for (idx = 0; idx < requriedFields.length; ++idx) {
		valid &= validateRequiredField(form.elements[requiredFields[idx]]);
	}

	var occupation = document.getElementById('occupation');
	var otherOccupation = document.getElementsByName('occupationOther')[0];

	if (occupation.value == 'other') {
		var otherOccupation = document.getElementsByName('occupationOther')[0];
		if (!otherOccupation.value.trim().length > 0) {
			otherOccupation.className = 'form-control invalid-field';
			valid = false;
		}
	}
	return valid;
}

function validateRequiredField(field) {
	var value = field.value;
	value = value.trim();
	var valid = value.length > 0;

	if (valid) {
		if (field.name == 'zip') {
			var zipValue = field.value;
			var zipRegExp = new RegExp('^\\d{5}$');
			var validZip = zipRegExp.test(zipValue);

			if (!validZip) {
				field.className = 'form-control invalid-field';
				return !valid;
			}
		}

		if (field.name == 'birthdate') {
			var dob = new Date(field.value);
			var today = new Date();
			var yearsDiff = today.getFullYear() - dob.getUTCFullYear();
	    	var monthsDiff = today.getMonth() - dob.getUTCMonth();
	    	var daysDiff = today.getDate() - dob.getUTCDate();

	    	if (monthsDiff < 0 || (0 == monthsDiff && daysDiff < 0)) {
	        	yearsDiff--;
	    	}

	    	if (yearsDiff < 13) {
	    		field.className = 'form-control invalid-field';
	    		var birthDateMsg = document.getElementById('birthdateMessage');
	    		birthdateMsg.innerHTML = 'User is only ' + yearsDiff + ' years old! Must be 13 to signup!';
	    		birthdateMsg.style.display = 'block';
	    		return !valid;
	    	}
	    }

		field.className = 'form-control';
	}
	else {
		field.className = 'form-control invalid-field';
	}
	return valid;
}

document.addEventListener('DOMContentLoaded', onReady);