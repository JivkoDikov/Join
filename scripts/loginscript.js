

function submitForm(event){
    event.preventDefault(); 

    // Get values from the form
    var email = document.getElementById('emailInput').value;
    var password = document.getElementById('passwordInput').value;

    // using email and password values
    checkLogin(email, password);
}

function checkLogin(email, password) {
    let loginString = 'email_'+email+'_pw_'+password
    
    for ( let i = 0; i < users.length; i++){
        if( loginString === users[i]){
            alert("Login hat geklappt")
        } else{ alert("Falsche Daten")}
    }
}

async function loadUser(){
    let users = await getItem('users');
    console.log(JSON.parse(users.data.value))
}



function guestLogin(){
    alert('Welcom Guest')
    sessionStorage.setItem('user', 'guest');
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
    let logoImage = document.querySelector('.centeredImage');

    // Speichere die ursprüngliche Position
    let originalPosition = {
        top: logoImage.offsetTop,
        left: logoImage.offsetLeft
    };

    // Setze das Bild in die Mitte des Bildschirms
    logoImage.style.top = '50%';
    logoImage.style.left = '50%';
    logoImage.style.transform = 'translate(-50%, -50%)';

    // Berechne die Verschiebung
    let verticalDifference = originalPosition.top - logoImage.offsetTop;
    let horizontalDifference = originalPosition.left - logoImage.offsetLeft;

    // Starte die fadeOut-Animation nach 1 Sekunde
    setTimeout(function() {
        logoImage.style.transition = 'transform 1s ease-out'; // Füge eine zusätzliche Transition für die Transform-Eigenschaft hinzu
        logoImage.style.transform = `translate(${horizontalDifference}px, ${verticalDifference}px)`;
        logoImage.classList.add('disappear');
    }, 1000);

    // Entferne alle Style-Elemente und Klassen nach 2 Sekunden
    setTimeout(function() {
        logoImage.removeAttribute('style');
        logoImage.classList.remove('disappear');
        logoImage.classList.remove('centeredImage');
    }, 2000);
});

function termsSite(){

}