const FullName = document.querySelector(".fullName");
const Email = document.querySelector(".EmaiId");
const password = document.querySelector(".PasswordforLogin");



function showSignUpForm() {
    document.getElementById("nameField").style.maxHeight = "60px";
    document.getElementById("title").innerHTML = "Sign Up";
    document.getElementById("signUpBtn").classList.remove("disable");
    document.getElementById("signInBtn").classList.add("disable");
    document.getElementById("submitBtn").style.display = "block";
    document.getElementById("verifyBtn").style.display = "none";
}

function showSignInForm() {
    document.getElementById("nameField").style.maxHeight = "0";
    document.getElementById("title").innerHTML = "Sign In";
    document.getElementById("signUpBtn").classList.add("disable");
    document.getElementById("signInBtn").classList.remove("disable");
    document.getElementById("submitBtn").style.display = "none";
    document.getElementById("verifyBtn").style.display = "block";
}


function  signUpSubmitHandler(event) {
    event.preventDefault();

    let nameInput= FullName.value;
    let emailInput= Email.value;
    let passwordInput= password.value;

    if  (nameInput === "" || emailInput==="" || passwordInput ===""){
        alert ("All fields must be filled out");
    }   

    console.log(emailInput);
    console.log(nameInput);
    console.log(passwordInput);

}

function  signInSubmitHandler(event) {
    event.preventDefault();

    let emailInput= Email.value;
    let passwordInput= password.value;

    if  (emailInput==="" || passwordInput ===""){
        alert ("All fields must be filled out");
    }   

    console.log(emailInput);
    console.log(passwordInput);

}



