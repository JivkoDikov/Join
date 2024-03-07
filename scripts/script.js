let isClicked = false;
let userID = localStorage.getItem('user');
let tasks = {};

/**
 * Dynamically includes HTML from external files into the current page.
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    }else {
      element.innerHTML = " Page not found";
    }
  }
}

/**
 * Performs initial render actions including including HTML, restoring selected links, setting initials, and configuring terms back button.
 */
async function render(){
await includeHTML();
restoreSelectedLink();
initials();
termsBackButton();
}

/**
 * Loads contact information from web storage and updates the global `contacts` object.
 */
async function load_contacts_from_webstorage(){
  let contactsValue = await getItem('contacts');
  contacts = JSON.parse(contactsValue.data.value)
}

/**
 * Fetches tasks for a specific user from storage.
 * @param {string} userID - The user ID for which tasks are being loaded.
 */
async function loadTasks(userID){
  let userTask = await getItem('tasks');
  tasks = JSON.parse(userTask.data.value);
  return tasks[userID];
}

/**
 * Retrieves and returns task categories from storage.
 */
async function createTaskCategory(){
  let taskCategory = await getItem('newcategory');
  let categorys = JSON.parse(taskCategory.data.value);
  return categorys; 
}

/**
 * Checks storage for data associated with a given key.
 * @param {string} key - The key to check in storage.
 */
async function checkStorageData(key){
  let valueKey = await getItem(key);
  let parsedStorageData = JSON.parse(valueKey.data.value || '{}'); 

  if (Object.keys(parsedStorageData).length > 0) {
      return [true, parsedStorageData];
  }else {
    return false
  }
}

/**
 * Adds an active style to a specified link by ID and stores the selection in session storage.
 * @param {number} linkId - The ID of the link to highlight as active.
 */
function addActiveStyle(linkId) {
  sessionStorage.setItem('selectedMenu', linkId);
}

/**
 * Checks the login status and updates terms visibility accordingly.
 */
function termsStatus() {
  let loginStatus = localStorage.getItem("user")

  if (!loginStatus) {
    for (let i = 1; i <= 4; i++) {
      let element = document.getElementById(i);
      if (element) {
        element.classList.add('d-none');
      }
    }
  }
}

/**
 * Redirects the user based on their login status.
 */
function checkUser() {
  let loginStatus = localStorage.getItem('user');

  if (loginStatus) {
    window.location.href = '/assets/templates/summary.html';
  }  if (!loginStatus){
    window.location.href = '/assets/templates/login.html';
  }
}

/**
 * Restores the selected menu link from session storage and applies the active style.
 */
function restoreSelectedLink() {
  let selectedLink = sessionStorage.getItem('selectedMenu');
  if (selectedLink === 5 || selectedLink === 6) {
    sidebarBGTerms(selectedLink)
  } else {
    sidebarBG(selectedLink);
  }
}

/**
 * Applies an active background style to a sidebar link by ID.
 * @param {number} linkId - The ID of the link to activate.
 */
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

/**
 * Applies an active background style to terms in the sidebar by ID.
 * @param {number} linkId - The ID of the terms link to activate.
 */
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

/**
 * Toggles the visibility of header links in a pop-up based on user interaction.
 */
function openOrCloseHeaderLinksPopUp(){
  if(isClicked){
   document.getElementById('headerLinkPopUp').classList.remove('d-none');
   isClicked = false;
  }else{
   document.getElementById('headerLinkPopUp').classList.add('d-none');
   isClicked = true;
  }
 }

/**
 * Extracts and sets the user's initials based on their name stored in local storage.
 */
 function initials(){
    let name = localStorage.getItem("name")

    if(name){
      let letters = name.split(' ');

      let initials = letters.map(function(letters) {
        return letters.charAt(0).toUpperCase();
      });
      setInitials(initials);
    }
 }

/**
 * Sets the user's initials in the header element.
 * @param {Array<string>} initials - The initials to set in the header.
 */
 function setInitials(initials){
      initialsHeader = document.getElementById("headerInitial");
      initials = initials.join('')
      initials = initials.replace(/[^A-Za-z]/g, '');
      initialsHeader.innerHTML = initials
 }

/**
 * Logs out the user by clearing relevant information from local storage and session storage.
 */
 function logout(){
    localStorage.removeItem("user");
    localStorage.removeItem("name");
    sessionStorage.removeItem("welcome")

 }

/**
 * Configures the back button on terms pages based on the user's login status.
 */
 function termsBackButton(){
  let user = localStorage.getItem("user")
  let path = "/assets/templates/"
  let backArrow = document.getElementById("backArrow")
  
  if(window.location.pathname.includes('terms')){
    if(!user){
      backArrow.href = path+"login.html"
    }else{ backArrow.href = path+"summary.html"}
  }
 }

/**
 * Executes the `render` function once the DOM content is fully loaded.
 */
document.addEventListener('DOMContentLoaded', render);