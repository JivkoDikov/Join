let isClicked = false;

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = " Page not found";
    }
  }
}


async function render(){
await includeHTML();
restoreSelectedLink();
initials();

}


function addActiveStyle(linkId) {
  sessionStorage.setItem('selectedMenu', linkId);
}

function termsStatus() {
  let loginStatus = sessionStorage.getItem('user');

  if (!loginStatus) {
    for (let i = 1; i <= 4; i++) {
      let element = document.getElementById(i);
      if (element) {
        element.classList.add('d-none');
      }
    }
  }
}

function checkUser() {
  let loginStatus = localStorage.getItem('user');

  if (loginStatus) {
    window.location.href = '/assets/templates/summary.html';
  }  if (!loginStatus){
    window.location.href = '/assets/templates/login.html';
  }
}

function restoreSelectedLink() {
  let selectedLink = sessionStorage.getItem('selectedMenu');
  if (selectedLink === 5 || selectedLink === 6) {
    sidebarBGTerms(selectedLink)
  } else {
    sidebarBG(selectedLink);
  }
}

function sidebarBG(linkId) {
 
  let links = document.querySelectorAll('.links');
  links.forEach(link => {
      link.classList.remove('active');
  });


  let selectedLink = document.getElementById(linkId);
  if (selectedLink) {
      selectedLink.classList.add('active');
      addActiveStyle(linkId);
  }
}

function sidebarBGTerms(linkId) {
 
  let links = document.querySelectorAll('.linksBottomStyle');
  links.forEach(link => {
      link.classList.remove('active');
  });


  let selectedLink = document.getElementById(linkId);
  if (selectedLink) {
      selectedLink.classList.add('active');
      addActiveStyle(linkId);
  }
}
function openOrCloseHeaderLinksPopUp(){
  if(isClicked){
   document.getElementById('headerLinkPopUp').classList.remove('d-none');
   isClicked = false;
  }else{
   document.getElementById('headerLinkPopUp').classList.add('d-none');
   isClicked = true;
  }
 }

 function initials(){
    let name = localStorage.getItem("name")
    let letters = name.split(' ');

    let initials = letters.map(function(letters) {
      return letters.charAt(0).toUpperCase();
  });

  setInitials(initials);

 }

 function setInitials(initials){
      initialsHeader = document.getElementById("headerInitial");
      initials = initials.join('')
      initials = initials.replace(/[^A-Za-z]/g, '');
      initialsHeader.innerHTML = initials
 }

 function logout(){
    localStorage.removeItem("user");
    localStorage.removeItem("name");
 }

document.addEventListener('DOMContentLoaded', render);