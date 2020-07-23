const controller = {};

// Show error message
function showError(input, message) {
  const error = input.nextElementSibling;
  error.innerText = message;
  input.className = 'error';
}

// Show success
function showSuccess(input) {
  const error = input.nextElementSibling;
  error.innerText = '';
  input.className = 'success';
}

// Get field name input
function getFieldName(input) {
  return input.placeholder;
}

// Check required fields
function checkRequired(inputs) {
  inputs.forEach(function (input) {
    if (input.value === '' || input.value.split(' ').length > 1) {
      showError(input, `${getFieldName(input)} is required or shouldn't contain blank space`);
    } else {
      showSuccess(input);
    }
  })
}

// Check length field
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min}`)
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max}`);
  } else {
    showSuccess(input);
  }
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(String(input.value).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check password match
function checkPasswordsMatch(password, confirmPassword) {
  if (password.value !== confirmPassword.value) {
    showError(confirmPassword, 'Password do not match');
  }
}

// Handle register
controller.register = (firstName, lastName, email, password, confirmPassword) => {
  const inputs = [firstName, lastName, email, password, confirmPassword];

  checkRequired(inputs);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, confirmPassword);
}

// Handle login
controller.login = (inputs) => {
  checkRequired(inputs);
}