let userLogin = [];
let signupCounter = {
    nameCounter: 0,
    emailCounter: 0,
    passwordCounter: 0,
    confirmPasswordCounter: 0,
    checkboxCounter: 0
  };
let inputFieldName;
let inputFieldEmail;
let inputFieldPassword;
let inputFieldPasswordConfirm;

sessionStorage.removeItem("checkEmailValue");
sessionStorage.removeItem("checkPasswordValue");


function checkLogin(event) {
    event.preventDefault();
    let loginString = inputFieldEmail.value+inputFieldPassword.value;

    let findUser = userLogin.user.find(function(user) {
        let concat = user.email + user.password;
        return loginString === concat;
    });

    if (findUser) {
        localStorage.setItem('user', findUser.email);
        localStorage.setItem('name', findUser.name);
        window.location.href = '/assets/templates/summary.html';
    } else {
        alert("Falsche Daten");
    }
}

async function loadUser(){
    let users = await getItem('users');
    userLogin = JSON.parse(users.data.value)
    // let user1 = userLogin.user[1].email
    // let pw = userLogin.user[1].password
    // console.log(user1 +" & "+ pw)
}



function guestLogin(){
    localStorage.setItem('user', 'guest');
    localStorage.setItem('name', 'Guest');
}

async function signup(event){
    event.preventDefault(); // Prevents the default form submission

          //let passwordValid = await checkPasswordMatch(inputFieldPassword.value, inputFieldPasswordConfirm.value);

         if(passwordValid){emailExists = await checkUserDatabase(inputFieldEmail.value)};
         if (emailExists === -1) {
                setUser(inputFieldName.value, 
                        inputFieldEmail.value, 
                        inputFieldPassword.value);
         } else {
             alert("Email existiert bereits")
         }
}

async function checkUserDatabase(emailValue){
    let emailExists = userLogin.user.findIndex(user => user.email === emailValue);
    return emailExists
  }

function setUser(name, email, password){
    let newUser = { "name": name, "email": email, "password": password };
    userLogin.user.push(newUser);
    setItem("users", userLogin);
    localStorage.setItem("name", name)
    localStorage.setItem("user", email)
    setTimeout(function() {
        window.location.href = '/assets/templates/summary.html';
    }, 1000);
    
}

async function checkPasswordMatch(password, passwordConfirm) {
        if( password === passwordConfirm){
            return true
        }
    }

function checkName(){
    let nameError = document.getElementById("nameError")
    let nameRegEx = /^[a-zA-Z]{2,}\s[a-zA-Z]{2,}$/;

    if(nameRegEx.test(inputFieldName.value)){ 
        nameError.classList.remove("dontMatch");
        nameError.classList.add("d-none");
        updateSignupLogic("nameCounter", true);
    } else{
        nameError.classList.add("dontMatch");
        nameError.classList.remove("d-none");
        updateSignupLogic("nameCounter", false);
    }
}

function checkPasswordConfirm() {
        let passwordInputConfirmFrame = document.getElementById('passwordInputConfirmFrame');
        let pwdontmatch = document.getElementById('pwDontMatch');
        if( inputFieldPassword.value === inputFieldPasswordConfirm.value){
            passwordInputConfirmFrame.style.border = '2px solid green';
            pwdontmatch.classList.remove('dontMatch')
            pwdontmatch.classList.add('d-none')
            sessionStorage.setItem("checkPasswordValue", true);
            updateSignupLogic("confirmPasswordCounter", true)
        } else{ 
            passwordInputConfirmFrame.style.border = '2px solid red';
            pwdontmatch.classList.remove('d-none')
            pwdontmatch.classList.add('dontMatch')
            sessionStorage.setItem("checkPasswordValue", false);  
            updateSignupLogic("confirmPasswordCounter", false)  
        }
    }

//check password length in signup page
 function passwordLength(){
    let passwordError = document.getElementById("passwordLengthError");

    if(inputFieldPassword.value.length < 5){ 
        passwordError.classList.add("dontMatch");
        passwordError.classList.remove("d-none");
        updateSignupLogic("passwordCounter", false)}
    else{
        passwordError.classList.add("d-none");
        passwordError.classList.remove("dontMatch")
        updateSignupLogic("passwordCounter", true)}
 }

function checkEmail() {
    let emailError = document.getElementById('emailError');
    let emailInputFrame = document.getElementById('emailInputFrame');

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (emailRegex.test(inputFieldEmail.value)) {
        emailError.classList.add('d-none');
        emailError.classList.remove('dontMatch')
        emailInputFrame.style.border = '2px solid green';
        sessionStorage.setItem("checkEmailValue", true);
        enableLoginButton();
        updateSignupLogic("emailCounter", true);
      } else {
        emailError.classList.remove('d-none');
        emailError.classList.add('dontMatch')
        emailInputFrame.style.border = '2px solid red';
        sessionStorage.setItem("checkEmailValue", false);
        sessionStorage.removeItem("checkEmailValue");
        updateSignupLogic("emailCounter", false);
      }
}

//check Password Length in Login Page
function checkPasswordInput(){
     if(inputFieldPassword.value.length >= 5){ 
        sessionStorage.setItem("checkPasswordValue", true);
        } else{
            sessionStorage.removeItem("checkPasswordValue");
        };
        enableLoginButton();
    }

function enableLoginButton(){
    let passwordInput = sessionStorage.getItem("checkPasswordValue");
    let emailInput = sessionStorage.getItem("checkEmailValue");
    
    if (passwordInput === "true" && emailInput === "true") {activateButton();} else{deactivateButton()}
}

function enableSignupButton(){
    let disbaleButton = document.getElementById("submitButton").classList
    let count = Object.values(signupCounter).reduce((sum, value) => sum + value, 0);
    if(count === 5){ disbaleButton.remove("disableButton")}
        else{disbaleButton.add("disableButton");}
}

function checkboxTerms(){

}

function activateButton(){
    document.getElementById('submitButton').classList.remove('disableButton');
}

function deactivateButton(){
    document.getElementById('submitButton').classList.add('disableButton');
}

function updateSignupLogic(key, boolean) {
    if (boolean) {signupCounter[key] = 1;} 
    else{signupCounter[key] = 0;};
    enableSignupButton();
}

function testData(){
    document.getElementById('nameInput').value = "Juri Neiz"
    document.getElementById('emailInput').value = "neiz@neiz.de"
    document.getElementById('passwordInput').value = "12345"
    document.getElementById('passwordInputConfirm').value = "12345"
}


function updateImageBasedOnResolution(logo) {
    let screenWidth = window.innerWidth;

    if (screenWidth < 768) {
        logo.src = "/assets/img/joinlogo.png";
    } else {
        logo.src = "/assets/img/Capa2.png"; // Anpassen, falls die Dateierweiterung anders ist
    }
}

function animateLogo(logoImage, logo) {
    moveToCenter(logoImage);
    fadeOutAndReset(logoImage, logo);
}

function moveToCenter(logoImage) {
    // save Position of Logo
    let originalPosition = {
        top: logoImage.offsetTop,
        left: logoImage.offsetLeft
    };

    // move logo in the middle
    logoImage.style.top = '50%';
    logoImage.style.left = '50%';
    logoImage.style.transform = 'translate(-50%, -50%)';

    // calculate difference of the position
    let verticalDifference = originalPosition.top - logoImage.offsetTop;
    let horizontalDifference = originalPosition.left - logoImage.offsetLeft;

    // start fadeOut-Animation after 1 Sec.
    setTimeout(function() {
        logoImage.style.transition = 'transform 1s ease-out';
        logoImage.style.transform = `translate(${horizontalDifference}px, ${verticalDifference}px)`;
        logoImage.classList.add('disappear');
    }, 1000);
}

function fadeOutAndReset(logoImage, logo) {
    // remove all Style-Elemente and class after 2 Sec.
    setTimeout(function() {
        logoImage.removeAttribute('style');
        logoImage.classList.remove('disappear');
        logoImage.classList.remove('centeredImage');
        logo.src = "/assets/img/join.png";
    }, 2000);
}


function updateImageBasedOnResolution(logo) {
    let screenWidth = window.innerWidth;

    if (screenWidth < 768) {
        logo.src = "/assets/img/joinlogo.png";
    } else {
        logo.src = "/assets/img/join.png";
    }

}


document.addEventListener("DOMContentLoaded", function() {
    // Elemente nach dem vollständigen Laden des DOM abrufen
    inputFieldName = document.getElementById('nameInput');
    inputFieldEmail = document.getElementById('emailInput');
    inputFieldPassword = document.getElementById('passwordInput');
    inputFieldPasswordConfirm = document.getElementById('passwordInputConfirm');

    let logoImage = document.querySelector('.centeredImage');
    let logo = document.getElementById('logo');

    if (logoImage && logo) {
        updateImageBasedOnResolution(logo);
        animateLogo(logoImage, logo);
    }
});