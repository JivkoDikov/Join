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
 updateHTML();
}
  

function addActiveStyle(linkId) {
  sessionStorage.setItem('selectedMenu', linkId);
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

document.addEventListener('DOMContentLoaded', render);