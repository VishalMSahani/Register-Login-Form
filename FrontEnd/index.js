
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



const FullName = document.querySelector(".fullName");
const Email = document.querySelector(".EmailId");
const password = document.querySelector(".PasswordforLogin");
const signUpButton = document.getElementById("signUpSubmit");
const loginButton = document.getElementById("loginSubmit");


function getSignUpdata() {

    let nameInput= FullName.value;
    let emailInput= Email.value;
    let passwordInput= password.value;

    if  (nameInput === "" || emailInput==="" || passwordInput ===""){
        alert ("All fields must be filled out");
        return null;
    } 
    
    return{
        fullName:nameInput,
        email:emailInput,
        password:passwordInput,
     };
};



function  getloginData() {
    let emailInput= Email.value;
    let passwordInput= password.value;

    if  (emailInput==="" || passwordInput ===""){
        alert ("All fields must be filled out");
        return null;
    } 
     return{
        email: emailInput,
        password: passwordInput
     };

}

const sendData = async(userData) =>{
    try {
        const request = {
            method: "POST",
                headers: {
                        "Content-type": "application/json"
                },
                body: JSON.stringify(userData),
        }
    
        let data = await fetch("http://localhost:8000/user/login",request)
        let response = await data.json()
        return response
    } catch (error) {
        return{
            error: "error ocured while fetching the data"
        }
        
    }
}

const sendDataSignup = async(userData) =>{
    try {
        const request = {
            method: "POST",
                headers: {
                        "Content-type": "application/json"
                },
                body: JSON.stringify(userData),
        }
    
        let data = await fetch("http://localhost:8000/user/register",request)
        let response = await data.json()
        return response
    } catch (error) {
        return{
            error: "error ocured while fetching the data"
        }
        
    }
}

function handleSuccessfulLogin() {
    window.location.href = "/Register-Login-Form/FrontEnd/home.html"; 
}

const signUpMainFunc = async() =>{
    let useData = getSignUpdata();
    await sendDataSignup(useData);
    console.log(useData);
    alert("user created successfully")
    handleSuccessfulLogin()
}

const loginMainFunc = async() =>{
    let useData = getloginData();
    await sendData(useData);
    console.log(useData);
    alert("Logged in successfully")
    handleSuccessfulLogin()
}


signUpButton.addEventListener("click", signUpMainFunc);
loginButton.addEventListener( "click", loginMainFunc);

