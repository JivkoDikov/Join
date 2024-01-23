let userLogin = []

function submitForm(event){
    event.preventDefault(); 

    // Get values from the form
    var email = document.getElementById('emailInput').value;
    var password = document.getElementById('passwordInput').value;

    // using email and password values
    checkLogin(email, password);
}

function checkLogin(email, password) {
    let loginString = email + password;

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
        checkSignup(name, email, password, passwordConfirm);
}


function checkSignup(name, email, password, passwordConfirm) {
        if( password === passwordConfirm){
            let newUser = { "name": name, "email": email, "password": password };
            alert("Regestrierung hat geklappt");
            userLogin.user.push(newUser);
            setItem("users", userLogin);

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
    let emailInputFrame = document.getElementById('emailInput');
  

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (emailRegex.test(emailInput.value)) {
        emailError.classList.add('d-none');
        emailError.classList.remove('dontMatch')
        emailInputFrame.style.border = '2px solid green';
      } else {
        emailError.classList.remove('d-none');
        emailError.classList.add('dontMatch')
        emailInputFrame.style.border = '2px solid red';
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

    // save Position of Logo
    let originalPosition = {
        top: logoImage.offsetTop,
        left: logoImage.offsetLeft
    };

    // move logo in to the middle
    logoImage.style.top = '50%';
    logoImage.style.left = '50%';
    logoImage.style.transform = 'translate(-50%, -50%)';

    // calculate difference of the position
    let verticalDifference = originalPosition.top - logoImage.offsetTop;
    let horizontalDifference = originalPosition.left - logoImage.offsetLeft;

    // start fadeOut-Animation after  1 Sec.
    setTimeout(function() {
        logoImage.style.transition = 'transform 1s ease-out'; 
        logoImage.style.transform = `translate(${horizontalDifference}px, ${verticalDifference}px)`;
        logoImage.classList.add('disappear');
    }, 1000);

    // remove all Style-Elemente and class after  2 Sec.
    setTimeout(function() {
        logoImage.removeAttribute('style');
        logoImage.classList.remove('disappear');
        logoImage.classList.remove('centeredImage');
    }, 2000);
});

function termsSite(){

}