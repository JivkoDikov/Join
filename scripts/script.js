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

}

/*function addActiveStyle(){
  const links = document.querySelectorAll('.links');
  links.forEach(link => {
    link.addEventListener('click', function() {
      links.forEach(otherLink => otherLink.classList.remove('active-link'));
      link.classList.add('active-link');
    });
  });
}*/
  

function addActiveStyle(linkId) {
  sessionStorage.setItem('selectedMenu', linkId);
}

function restoreSelectedLink() {
  var selectedLink = sessionStorage.getItem('selectedMenu');
  if (selectedLink) {
      sidebarBG(selectedLink);
  }
}

function sidebarBG(linkId) {
 
  var links = document.querySelectorAll('.links');
  links.forEach(link => {
      link.classList.remove('active');
  });


  var selectedLink = document.getElementById(linkId);
  if (selectedLink) {
      selectedLink.classList.add('active');
      addActiveStyle(linkId);
  }
}

document.addEventListener('DOMContentLoaded', render);