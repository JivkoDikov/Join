let letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
let contacts = {};
let contactIdCounter = 0;
let screenSize = [];
let newContactIdCounter = [0];

async function addNewContact() {
  document.getElementById("addnewcontact").classList.add("showOverlay-addNewContactPopUpContainer");
  document.getElementById("backGroundOpacityContainer").classList.remove("d-none");
}

function closeAddNewContact() {
  document.getElementById("addnewcontact").classList.remove("showOverlay-addNewContactPopUpContainer");
  document.getElementById("backGroundOpacityContainer").classList.add("d-none");
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('tel').value = '';
}

function createContact(event) {
  event.preventDefault();
  closeAddContactPopup();
  showSuccessOverlay();

  let contact = createContactObject();
  initializeUserContacts();
  contacts[userID].push(contact);

  resetInputFields();
  saveAndShowContacts(contact.id);
}

function closeAddContactPopup() {
  document.getElementById("addnewcontact").classList.remove("showOverlay-addNewContactPopUpContainer");
  document.getElementById("backGroundOpacityContainer").classList.add("d-none");
}

function showSuccessOverlay() {
  let popUpSuccessfullyCreated = document.getElementById('popUpSuccesfullyCreated');
  popUpSuccessfullyCreated.classList.add('overlay-successfullyCreated', 'showoverlay-successfullyCreated');
  setTimeout(() => {
    popUpSuccessfullyCreated.classList.remove('showoverlay-successfullyCreated');
  }, 2000);
}

function createContactObject() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let tel = document.getElementById("tel").value;
  return {
    id: contactIdCounter++,
    name: name,
    email: email,
    tel: tel,
    letter: name.charAt(0).toUpperCase(),
    lastNameLetter: getLastLetter(name),
    bgColor: generateRandomColor(),
  };
}

function initializeUserContacts() {
  if (!contacts[userID]) {
    contacts[userID] = [];
  }
}

function resetInputFields() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("tel").value = "";
}

function saveAndShowContacts(contactId) {
  setItem('contacts', contacts); 
  showContacts();
  showContact(contactId);
}



async function initContacts(){
  render();
  await load_contacts_from_webstorage();
  showContacts();
  screenSizeUser();
  updateContacts();
}


function showContacts() {
  let letterBox = document.getElementById("letterBox");
  letterBox.innerHTML ='';
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    let filteredContacts = contacts[userID].filter((contact) => contact["name"].charAt(0).toUpperCase() == letter);
    filteredContact(filteredContacts,letter);
}
}

function filteredContact(filteredContacts,letter) {
  if(filteredContacts.length > 0){
    document.getElementById("letterBox").innerHTML += /*html*/ `
      <div id="firstLetterContainer" class="firstLetterContainer">${letter}</div>
      <div class="line"></div>`;
    for (let j = 0; j < filteredContacts.length; j++) {
      const filteredContact = filteredContacts[j];
      const lastNameLetter = filteredContact["name"].split(" ").pop().charAt(0).toUpperCase();
      const bgColor = filteredContact.bgColor; 
      letterBox.innerHTML += showContactsHTML(filteredContact, bgColor, letter, lastNameLetter);
    }
  }
}


function generateRandomColor() {
  var x = Math.floor(Math.random() * 256);
  var y = Math.floor(Math.random() * 256);
  var z = Math.floor(Math.random() * 256);
  return `rgb(${x},${y},${z})`;
}


function getLastLetter(name) {
  return name.split(" ").pop().charAt(0).toUpperCase();
}


function showContact(id) {
  deselectAllContainers();
  selectClickedContainer(id);
  toggleMobileContactView();
  displayContactDetails();
  updateContactView(id);
  showOverlay();
}

function deselectAllContainers() {
  let allContainers = document.querySelectorAll('.iconNameEmailContainer');
  allContainers.forEach(container => {
    container.classList.remove('selected');
  });
}

function selectClickedContainer(id) {
  let clickedContainer = document.getElementById('iconNameEmailContainer_' + id);
  clickedContainer.classList.add('selected');
}

function toggleMobileContactView() {
  let mobile = isMobile();
  if (mobile) {
    changeContactView();
  }
}

function displayContactDetails() {
  let contactDetails = document.getElementById("contactContainer");
  contactDetails.classList.remove("d-none");
  contactDetails.classList.add("backgroundColorContact");
}

function updateContactView(id) {
  const index = contacts[userID].findIndex((contact) => contact.id === id);
  if (index !== -1) {
    const contact = contacts[userID][index];
    let letter = contact["name"].charAt(0).toUpperCase();
    let lastNameLetter = getLastLetter(contact["name"]);

    document.getElementById("showContact").innerHTML = showContactHTML(id, contact, letter, lastNameLetter);
    showEditDeleteMobile(id);
  }
}

function showEditDeleteMobile(id) {
  let editDeleteMobile = document.getElementById('editDeleteContainerMobile');
  editDeleteMobile.innerHTML = editDeleteMobileHTML(id);
}

function showOverlay() {
  setTimeout(() => {
    document.getElementById('contactContainerContact').classList.add('showOverlay-contactContainerContact');
  }, 225);
}




async function deleteContact(id) {
  let index = contacts[userID].findIndex((contact) => contact.id === id);
  if (index !== -1) {
    contacts[userID].splice(index, 1);
    await setItem('contacts', contacts);
    showContacts();
    document.getElementById('contactContainerContact').innerHTML = '';
    hideEditContactMobile();
  }
  disableContactContainer();
  document.getElementById('popUpSuccesfullyDeleted').classList.add('overlay-successfullyDeleted', 'showoverlay-successfullyDeleted');
  setTimeout(() => {
    document.getElementById('popUpSuccesfullyDeleted').classList.remove('showoverlay-successfullyDeleted');
  }, 2000);
}


function editContact(id) {
  let addNewContactPopUp = document.getElementById('addNewContactPopUp');
  addNewContactPopUp.innerHTML = editContactHTML(id);

  const selectedContact = contacts[userID].find(contact => contact.id === id);
  if (selectedContact) {
    getEditContact(selectedContact);
  }
}


function getEditContact(selectedContact, id) {
  document.getElementById("editcontact").classList.add("showOverlay-addNewContactPopUpContainer");
  document.getElementById("backGroundOpacityContainer").classList.remove("d-none");
  document.getElementById("editname").value = selectedContact.name;
  document.getElementById("editemail").value = selectedContact.email;
  document.getElementById("edittel").value = selectedContact.tel;
  document.getElementById("editname").dataset.contactId = id;
  const initials = selectedContact.name.split(' ').map(word => word.charAt(0)).join('');
  const bgColor = selectedContact.bgColor;
  setProfileContact(initials, bgColor);
  document.getElementById("deleteContactButton").addEventListener("click", function() {
    deleteContact(id);
  });
}


function setProfileContact(initials, bgColor) {
  const profileContactDiv = document.getElementById("profileContact");
  profileContactDiv.style.backgroundColor = bgColor;
  profileContactDiv.textContent = initials;
}


function deleteEditContact(id) {
  document.getElementById("editname").value = "";
  document.getElementById("editemail").value = "";
  document.getElementById("edittel").value = "";
  closeEditContact();
  deleteContact(id);
}
  

function closeEditContact() {
  document.getElementById("editcontact").classList.remove("showOverlay-addNewContactPopUpContainer");
  document.getElementById("backGroundOpacityContainer").classList.add("d-none");
  document.getElementById("editname").value = "";
  document.getElementById("editemail").value = "";
  document.getElementById("edittel").value = "";
}


function saveEditContact(id) {
  const editedContact = contacts[userID].find((contact) => contact.id === parseInt(id));
  if (editedContact) {
    editedContact.name = document.getElementById("editname").value;
    editedContact.email = document.getElementById("editemail").value;
    editedContact.tel = document.getElementById("edittel").value;

    showContacts();
    showContact(editedContact.id);
    closeEditContact();
  }
}


function isMobile(){
  return window.innerWidth <= 800;

}


function disableContactContainer(){
  let contactDetails = document.getElementById("addcontactContainer");
  let contactContainerView = document.getElementById("contactContainer")
  contactDetails.classList.add("d-none");
  contactDetails.classList.remove("d-none");
  contactContainerView.style.removeProperty("display");
  contactContainerView.style.removeProperty("width");
  document.getElementById('editContactMobile').classList.add('d-none');
  hideEditContactMobile();
}

function screenSizeUser(){
  screenSize.push(window.screen.width);
  screenSize.push(window.screen.height);
}

function changeContactView(){
  let contactContainerList = document.getElementById("addcontactContainer");
  let contactContainerView = document.getElementById("contactContainer")
  contactContainerList.classList.add("d-none")
  contactContainerView.style.display = "block";
  contactContainerView.style.width = "100vw";
  document.getElementById('editContactMobile').classList.remove('d-none');
  
}

function showEditContactMobile(){
  document.getElementById('editDeleteContainerMobile').classList.add('showOverlay-editDeleteContainerMobile');
  document.getElementById('editDeleteContainerMobile').classList.remove('overlay-editDeleteContainerMobile');

}

function hideEditContactMobile(){
  document.getElementById('editDeleteContainerMobile').classList.remove('showOverlay-editDeleteContainerMobile');
  document.getElementById('editDeleteContainerMobile').classList.add('overlay-editDeleteContainerMobile');
}


async function load_contacts_from_webstorage(){
  let contactsValue = await getItem('contacts');
  contacts = JSON.parse(contactsValue.data.value)
}

function updateContacts() {
  for (let i = 0; i < contacts[userID].length; i++) {
    let idOfContact = contacts[userID][i]['id'];
    newContactIdCounter.push(Number(idOfContact));
  }
  
  let groessteZahl = Math.max(...newContactIdCounter);
  contactIdCounter = groessteZahl +1;
}


function inputFrame(id){
  let inputField = document.getElementById(id);
  let required = document.getElementById(id+"Class")

  if(inputField.value){
    inputField.style.border = "1px solid #29abe2";
    required.classList.add("d-none")
  } else{
    inputField.style.border = "1px solid red";
    required.classList.remove("d-none")
  }
}