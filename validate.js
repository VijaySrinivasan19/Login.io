const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const loginname = document.getElementById('loginname');
const loginpassword = document.getElementById('loginpassword');

function checkReg() {
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();

	if (usernameValue === '') {
		setErrorFor(username, 'Username cannot be blank');
	} else {
		setSuccessFor(username);
	}

	if (emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}

	if (passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
	}
	else if (passwordValue.length < 6) {
		setErrorFor(password, 'Password should be atleast 6 characters')
	}
	else if (passwordValue.length > 12) {
		setErrorFor(password, 'Password should be maximum of 12 characters')
	}
	else {
		setSuccessFor(password);
	}

	if (password2Value === '') {
		setErrorFor(password2, 'Password2 cannot be blank');
	} else if (passwordValue !== password2Value) {
		setErrorFor(password2, 'Passwords does not match');
	} else {
		setSuccessFor(password2);
	}
}

function checkLogin() {

	const loginnameValue = loginname.value.trim();
	const loginpasswordValue = loginpassword.value.trim();

	if (loginnameValue === '') {
		setErrorFor(loginname, 'Username cannot be blank');
	} else if (!isEmail(loginnameValue)) {
		setErrorFor(loginname, 'Not a valid email');
	}
	else {
		setSuccessFor(loginname);
	}

	if (loginpasswordValue === '') {
		setErrorFor(loginpassword, 'Password cannot be blank');
	} else {
		setSuccessFor(loginpassword);
	}

	if (loginnameValue === 'admin@gmail.com' && loginpasswordValue === 'admin123') {
		console.log("Login Success");
		parent.setTimeout(function () {
			location.href = 'jsonindex.html';
		}, 1000);
	}
	else if (loginnameValue === 'admin@gmail.com' && loginpasswordValue != 'admin123') {
		setErrorFor(loginpassword, "Incorrect Password");
	}
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}