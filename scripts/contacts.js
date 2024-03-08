let letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
let contacts = {};
let contactIdCounter = 0;
let screenSize = [];
let newContactIdCounter = [0];


/**
 * Adds a new contact by displaying the contact addition overlay and making the background opaque.
 */
async function addNewContact() {
  document.getElementById("addnewcontact").classList.add("showOverlay-addNewContactPopUpContainer");
  document.getElementById("backGroundOpacityContainer").classList.remove("d-none");
}

/**
 * Closes the "Add New Contact" overlay and clears input fields for name, email, and telephone number.
 */
function closeAddNewContact() {
  document.getElementById("addnewcontact").classList.remove("showOverlay-addNewContactPopUpContainer");
  document.getElementById("backGroundOpacityContainer").classList.add("d-none");
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('tel').value = '';
}

/**
 * Creates a new contact object, initializes user contacts if necessary, and then saves the new contact.
 */
function createContact() {
  
  closeAddContactPopup();
  showSuccessOverlay();

  let contact = createContactObject();
  initializeUserContacts();
  contacts[userID].push(contact);

  resetInputFields();
  saveAndShowContacts(contact.id);
}

/**
 * Closes the "Add Contact" popup.
 */
function closeAddContactPopup() {
  document.getElementById("addnewcontact").classList.remove("showOverlay-addNewContactPopUpContainer");
  document.getElementById("backGroundOpacityContainer").classList.add("d-none");
}

/**
 * Displays a success overlay for a brief period to indicate successful contact creation.
 */
function showSuccessOverlay() {
  let popUpSuccessfullyCreated = document.getElementById('popUpSuccesfullyCreated');
  popUpSuccessfullyCreated.classList.add('overlay-successfullyCreated', 'showoverlay-successfullyCreated');
  setTimeout(() => {
    popUpSuccessfullyCreated.classList.remove('showoverlay-successfullyCreated');
  }, 2000);
}

/**
 * Creates and returns a new contact object with unique properties such as name, email, and a randomly generated color.
 * @returns {Object} The newly created contact object.
 */
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

/**
 * Initializes the user's contacts if they haven't been initialized yet.
 */
function initializeUserContacts() {
  if (!contacts[userID]) {
    contacts[userID] = [];
  }
}

/**
 * Resets the input fields for adding a new contact to empty strings.
 */
function resetInputFields() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("tel").value = "";
}

/**
 * Saves the newly created contact and displays it along with other existing contacts.
 * @param {number} contactId - The ID of the newly created contact.
 */
function saveAndShowContacts(contactId) {
  setItem('contacts', contacts); 
  showContacts();
  showContact(contactId);
}

/**
 * Initializes contacts by rendering them and loading existing contacts from web storage.
 */
async function initContacts(){
  render();
  await load_contacts_from_webstorage();
  showContacts();
  screenSizeUser();
  updateContacts();
}

/**
 * Displays contacts sorted by the initial letter of each contact's name.
 */
function showContacts() {
  let letterBox = document.getElementById("letterBox");
  letterBox.innerHTML ='';
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    let filteredContacts = contacts[userID].filter((contact) => contact["name"].charAt(0).toUpperCase() == letter);
    filteredContact(filteredContacts,letter);
}
}

/**
 * Filters and displays contacts that start with a specific letter.
 * @param {Array} filteredContacts - The contacts filtered by a specific starting letter.
 * @param {string} letter - The letter used for filtering.
 */
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

/**
 * Generates and returns a random RGB color value.
 */
function generateRandomColor() {
  let minBrightValue = 70;
  let range = 206;
  let x = Math.floor(Math.random() * range) + minBrightValue;
  let y = Math.floor(Math.random() * range);
  let z = Math.floor(Math.random() * range) ;
  return `rgb(${x},${y},${z})`;
}

/**
 * Gets the last letter of a name, intended for sorting or categorization purposes.
 * @param {string} name - The name from which to extract the last letter.
 */
function getLastLetter(name) {
  return name.split(" ").pop().charAt(0).toUpperCase();
}

/**
 * Displays details of a specific contact and highlights the selected contact in the list.
 * @param {number} id - The ID of the contact to display.
 */
function showContact(id) {
  deselectAllContainers();
  selectClickedContainer(id);
  toggleMobileContactView();
  displayContactDetails();
  updateContactView(id);
  showOverlay();
}

/**
 * Deselects all contact containers, removing any highlights or selections.
 */
function deselectAllContainers() {
  let allContainers = document.querySelectorAll('.iconNameEmailContainer');
  allContainers.forEach(container => {
    container.classList.remove('selected');
  });
}

/**
 * Highlights the container of a clicked contact to indicate selection.
 * @param {number} id - The ID of the selected contact.
 */
function selectClickedContainer(id) {
  let clickedContainer = document.getElementById('iconNameEmailContainer_' + id);
  clickedContainer.classList.add('selected');
}

/**
 * Toggles the contact view for mobile devices, adapting the UI for smaller screens.
 */
function toggleMobileContactView() {
  let mobile = isMobile();
  if (mobile) {
    changeContactView();
  }
}

/**
 * Displays the contact details in a dedicated container.
 */
function displayContactDetails() {
  let contactDetails = document.getElementById("contactContainer");
  contactDetails.classList.remove("d-none");
  contactDetails.classList.add("backgroundColorContact");
}

/**
 * Updates the contact view with the details of a specific contact.
 * @param {number} id - The ID of the contact to display.
 */
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

/**
 * Displays the edit and delete options for mobile view.
 * @param {number} id - The ID of the contact for which to show options.
 */
function showEditDeleteMobile(id) {
  let editDeleteMobile = document.getElementById('editDeleteContainerMobile');
  editDeleteMobile.innerHTML = editDeleteMobileHTML(id);
}

/**
 * Displays an overlay with additional information or options.
 */
function showOverlay() {
  setTimeout(() => {
    document.getElementById('contactContainerContact').classList.add('showOverlay-contactContainerContact');
  }, 225);
}

/**
 * Deletes a contact and updates the display to reflect this change.
 * @param {number} id - The ID of the contact to delete.
 */
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

/**
 * Opens the edit contact modal, prefilling it with the contact's current information.
 * @param {number} id - The ID of the contact to edit.
 */
function editContact(id) {
  let addNewContactPopUp = document.getElementById('addNewContactPopUp');
  addNewContactPopUp.innerHTML = editContactHTML(id);

  const selectedContact = contacts[userID].find(contact => contact.id === id);
  if (selectedContact) {
    getEditContact(selectedContact);
  }
}

/**
 * Fills the edit contact form with the selected contact's details for editing.
 * @param {Object} selectedContact - The contact being edited.
 * @param {number} id - The ID of the contact being edited.
 */
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

/**
 * Sets the profile image or icon for the contact being edited based on initials and background color.
 * @param {string} initials - The initials of the contact.
 * @param {string} bgColor - The background color for the contact icon.
 */
function setProfileContact(initials, bgColor) {
  const profileContactDiv = document.getElementById("profileContact");
  profileContactDiv.style.backgroundColor = bgColor;
  profileContactDiv.textContent = initials;
}

/**
 * Deletes the contact being edited and closes the edit contact modal.
 * @param {number} id - The ID of the contact to delete.
 */
function deleteEditContact(id) {
  document.getElementById("editname").value = "";
  document.getElementById("editemail").value = "";
  document.getElementById("edittel").value = "";
  closeEditContact();
  deleteContact(id);
}
  
/**
 * Closes the edit contact modal and clears the form fields.
 */
function closeEditContact() {
  document.getElementById("editcontact").classList.remove("showOverlay-addNewContactPopUpContainer");
  document.getElementById("backGroundOpacityContainer").classList.add("d-none");
  document.getElementById("editname").value = "";
  document.getElementById("editemail").value = "";
  document.getElementById("edittel").value = "";
}

/**
 * Saves the changes made to a contact in the edit form and updates the display.
 * @param {number} id - The ID of the contact being edited.
 */
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

/**
 * Determines if the current view is on a mobile device based on the screen width.
 */
function isMobile(){
  return window.innerWidth <= 800;
}

/**
 * Disables the contact container, usually in preparation for another view or operation.
 */
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

/**
 * Adjusts the UI based on the screen size of the user's device, particularly for mobile views.
 */
function screenSizeUser(){
  screenSize.push(window.screen.width);
  screenSize.push(window.screen.height);
}

/**
 * Changes the view to display contact details prominently, adapting for mobile users.
 */
function changeContactView(){
  let contactContainerList = document.getElementById("addcontactContainer");
  let contactContainerView = document.getElementById("contactContainer")
  contactContainerList.classList.add("d-none")
  contactContainerView.style.display = "block";
  contactContainerView.style.width = "100vw";
  document.getElementById('editContactMobile').classList.remove('d-none'); 
}

/**
 * Shows the edit and delete options specifically for mobile users.
 */
function showEditContactMobile(){
  document.getElementById('editDeleteContainerMobile').classList.add('showOverlay-editDeleteContainerMobile');
  document.getElementById('editDeleteContainerMobile').classList.remove('overlay-editDeleteContainerMobile');

}

/**
 * Hides the edit and delete options for mobile users, typically when not needed.
 */
function hideEditContactMobile(){
  document.getElementById('editDeleteContainerMobile').classList.remove('showOverlay-editDeleteContainerMobile');
  document.getElementById('editDeleteContainerMobile').classList.add('overlay-editDeleteContainerMobile');
}

/**
 * Loads existing contacts from web storage into the application.
 */
async function load_contacts_from_webstorage(){
  let contactsValue = await getItem('contacts');
  contacts = JSON.parse(contactsValue.data.value)
}

/**
 * Updates the internal tracking of contacts to ensure new contacts receive a unique ID.
 */
function updateContacts() {
  for (let i = 0; i < contacts[userID].length; i++) {
    let idOfContact = contacts[userID][i]['id'];
    newContactIdCounter.push(Number(idOfContact));
  }
  let groessteZahl = Math.max(...newContactIdCounter);
  contactIdCounter = groessteZahl +1;
}

/**
 * Validates the input in an input field and changes the frame color based on validity.
 * @param {string} id - The ID of the input field to validate.
 */
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

/**
 * Checks the new contact form for valid inputs before attempting to create a new contact.
 * @param {Event} event - The event object from the form submission.
 */
function checkNewContact(event) {
  event.preventDefault();
  let newName = document.getElementById('name').value;
  let newEmail = document.getElementById('email').value;
  let newPhone = document.getElementById('tel').value;

  let isNameValid = true;
  let isEmailValid = true;
  let isPhoneValid = true;
  ifCheckContact(isNameValid,isEmailValid,isPhoneValid,newName,newEmail,newPhone);
}

/**
 * Validates the inputs for a new contact and creates the contact if all validations pass.
 * @param {boolean} isNameValid - Indicates if the name input is valid.
 * @param {boolean} isEmailValid - Indicates if the email input is valid.
 * @param {boolean} isPhoneValid - Indicates if the phone input is valid.
 * @param {string} newName - The entered name for the new contact.
 * @param {string} newEmail - The entered email for the new contact.
 * @param {string} newPhone - The entered phone number for the new contact.
 */
function ifCheckContact(isNameValid,isEmailValid,isPhoneValid,newName,newEmail,newPhone) {
  if(newName === '') {
    document.getElementById('requiredMessageName').innerHTML = `<span class="requiredMessage">This field is required*</span>`;
    isNameValid = false;
  }else {
    document.getElementById('requiredMessageName').innerHTML = '';
  }
  if(newEmail === '') {
    document.getElementById('requiredMessageMail').innerHTML = `<span class="requiredMessage">This field is required*</span>`;
    isEmailValid = false;
  }else {
    document.getElementById('requiredMessageMail').innerHTML = '';
  }
  if(newPhone === '') {
    document.getElementById('requiredMessageTel').innerHTML = `<span class="requiredMessage">This field is required*</span>`;
    isPhoneValid = false;
  }else {
    document.getElementById('requiredMessageTel').innerHTML = '';
  }
  if(isNameValid && isEmailValid && isPhoneValid) {
    createContact();
  }
}