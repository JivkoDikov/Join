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
    localStorage.setItem('user', 'guest');
    localStorage.setItem('name', 'Guest');
}

async function signup(event){
    event.preventDefault(); // Prevents the default form submission

        // Get values from the form
        let name = document.getElementById('nameInput').value;
        let email = document.getElementById('emailInput').value;
        let password = document.getElementById('passwordInput').value;
        let passwordConfirm = document.getElementById('passwordInputConfirm').value;
    
        // 
         let passwordValid = await checkPasswordMatch(password, passwordConfirm);

         if(passwordValid){emailExists = await checkUserDatabase(email)};
         if (emailExists === -1) {
                setUser(name, email, password);
         } else {
             alert("Email existiert bereits")
         }
}

async function checkUserDatabase(emailValue){
    let emailExists = userLogin.user.findIndex(user => user.email === emailValue);
    return emailExists
    //displayEmailAvailability(emailExists);
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
    document.getElementById('nameInput').value = "Juri Neiz"
    document.getElementById('emailInput').value = "neiz@neiz.de"
    document.getElementById('passwordInput').value = "12345"
    document.getElementById('passwordInputConfirm').value = "12345"
}


document.addEventListener('DOMContentLoaded', function() {
    let logoImage = document.querySelector('.centeredImage');
    let logo = document.getElementById('logo');

    

    if (logoImage) {
        updateImageBasedOnResolution(logo);
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
        logo.src = "/assets/img/Capa 2.png";
    }, 2000);
}

    }

);

function updateImageBasedOnResolution(logo) {
    let screenWidth = window.innerWidth;

    if (screenWidth < 768) {
        logo.src = "/assets/img/joinlogo.png";
    } else {
        logo.src = "/assets/img/Capa 2.png";
    }

}