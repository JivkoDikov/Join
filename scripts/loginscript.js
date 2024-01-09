const users = ['email_neizcon@gmail.com_pw_12345']

function submitForm(event){
    event.preventDefault(); // Prevents the default form submission

    // Get values from the form
    var email = document.getElementById('emailInput').value;
    var password = document.getElementById('passwordInput').value;

    // using email and password values
    checkLogin(email, password);
}

function checkLogin(email, password) {
    // Replace this with your actual logic
    let loginString = 'email_'+email+'_pw_'+password
    
    for ( let i = 0; i < users.length; i++){
        if( loginString === users[i]){
            alert("Login hat geklappt")
        } else{ alert("Falsche Daten")}
    }
}

function toggleCheckbox() {
    var checkbox = document.getElementById('rememberCheckbox');
    checkbox.checked = !checkbox.checked;
}

function guestLogin(){
    alert('Welcom Guest')
}

function signup(){
    alert('Register Form')
}

function submitFormSignup(event){
    event.preventDefault(); // Prevents the default form submission

        // Get values from the form
        let name = document.getElementById('nameInput').value;
        let email = document.getElementById('emailInput').value;
        let password = document.getElementById('passwordInput').value;
        let passwordConfirm = document.getElementById('passwordInputConfirm').value;
    
        // using email and password values
        checkSignup(password, passwordConfirm);
}


function checkSignup(password, passwordConfirm) {
        if( password === passwordConfirm){
            alert("Regestrierung hat geklappt")
        } else{ 
            let passwordInputConfirmFrame = document.getElementById('passwordInputConfirmFrame');
            let pwdontmatch = document.getElementById('pwDontMatch')
            passwordInputConfirmFrame.style.border = '2px solid red';
            passwordInputConfirmFrame.style.animation = 'shake 0.5s ease-in-out infinite';
            pwdontmatch.classList.remove('d-none')
            pwdontmatch.classList.add('dontMatch')
            setTimeout(function () {
                passwordInputConfirmFrame.style.animation = '';
            }, 1800);
        }
}
function checkpw() {
    let password = document.getElementById('passwordInput').value;
    let passwordConfirm = document.getElementById('passwordInputConfirm').value;
    let passwordInputConfirmFrame = document.getElementById('passwordInputConfirmFrame');
    let pwdontmatch = document.getElementById('pwDontMatch');
    if( password === passwordConfirm){
        passwordInputConfirmFrame.style.border = '2px solid green';
        pwdontmatch.classList.remove('dontMatch')
        pwdontmatch.classList.add('d-none')
    } else{ 

        passwordInputConfirmFrame.style.border = '2px solid red';
        pwdontmatch.classList.remove('d-none')
        pwdontmatch.classList.add('dontMatch')

    }
}
function checkEmail() {
    let emailInput = document.getElementById('emailInput');
    let emailError = document.getElementById('emailError');
    let emailInputFrame = document.getElementById('emailInputFrame');
  
    // Regulärer Ausdruck für eine einfache Überprüfung der E-Mail-Adresse
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (emailRegex.test(emailInput.value)) {
        emailError.classList.add('d-none');
        emailError.classList.remove('dontMatch')
        emailInputFrame.style.border = '2px solid green';
      } else {
        emailError.classList.remove('d-none');
        emailError.classList.add('dontMatch')
        emailInputFrame.style.border = '2px solid red'; // Optional: Rote Umrandung für ungültige E-Mail-Adressen
      }
}

function testData(){
    document.getElementById('nameInput').value = "Juri"
    document.getElementById('emailInput').value = "neiz@neiz"
    document.getElementById('passwordInput').value = "12345"
    document.getElementById('passwordInputConfirm').value = "1234"
}

document.addEventListener('DOMContentLoaded', function() {
    let logoContainer = document.querySelector('.logo-container');
    setTimeout(function() {
        logoContainer.classList.add('animate');
    }, 1000);
});