let letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
let contacts = [];
let contactIdCounter = 0;
let isMobile = window.innerWidth < 800 ;
load();


async function addNewContact() {
  document.getElementById("addnewcontact").classList.add("showOverlay-addNewContactPopUpContainer");
  document.getElementById("backGroundOpacityContainer").classList.remove("d-none");
}

function closeAddNewContact() {
  document.getElementById("addnewcontact").classList.remove("showOverlay-addNewContactPopUpContainer");
  document.getElementById("backGroundOpacityContainer").classList.add("d-none");
}

function createContact(event) {
  event.preventDefault();
  document.getElementById("addnewcontact").classList.remove("showOverlay-addNewContactPopUpContainer");
  document.getElementById("backGroundOpacityContainer").classList.add("d-none");
  document.getElementById('popUpSuccesfullyCreated').classList.add('overlay-successfullyCreated', 'showoverlay-successfullyCreated');
  setTimeout(() => {
    document.getElementById('popUpSuccesfullyCreated').classList.remove('showoverlay-successfullyCreated');
  }, 500);

  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let tel = document.getElementById("tel");
  let contact = {
    id : contactIdCounter++,
    name: name.value,
    email: email.value,
    tel: tel.value,
    bgColor: generateRandomColor(),
  };
  contacts.push(contact);
  name.value = "";
  email.value = "";
  tel.value = "";
  
  

    showContacts();
showContact(contact.id);
  

  
}


function initContacts(){
  render();
  showContacts();
  
}




function showContacts() {
  
  let letterBox = document.getElementById("letterBox");
  letterBox.innerHTML ='';
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    let filteredContacts = contacts.filter((contact) => contact["name"].charAt(0).toUpperCase() == letter);

    if(filteredContacts.length > 0){
    document.getElementById("letterBox").innerHTML += /*html*/ `
      <div id="firstLetterContainer" class="firstLetterContainer">${letter}</div>
      <div class="line"></div>`;
    
    for (let j = 0; j < filteredContacts.length; j++) {
      const filteredContact = filteredContacts[j];
      const lastNameLetter = filteredContact["name"].split(" ").pop().charAt(0).toUpperCase();
      const bgColor = filteredContact.bgColor; 
      letterBox.innerHTML += /*html*/ `
        <div onclick="showContact(${filteredContact.id})" id="iconNameEmailContainer" class="iconNameEmailContainer">
          <div class="iconNameEmail">
            <div id="firstLastLetter" class="firstLastLetter" style="background-color: ${bgColor}">${letter}${lastNameLetter}</div>
            <div class="nameEmail">
              <div class="name">${filteredContact["name"]}</div>
              <div class="email">${filteredContact["email"]}</div>
            </div>
          </div>
        </div>`;
      
    }
  }
}
save();

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
function showContact(id){ 
  document.getElementById("contactContainer").classList.add("backgroundColorContact");
 
const index = contacts.findIndex((contact) => contact.id === id);
  
if (index !== -1) {
      const contact = contacts[index];
      let letter = contact["name"].charAt(0).toUpperCase();
      let lastNameLetter = getLastLetter(contact["name"]);
      
      
      document.getElementById("showContact").innerHTML = /*html*/ `
    <div id="contactContainerContact" class="contactContainerContact overlay-contactContainerContact">
      <div class="contactContainerContactIconName">
        <div id="contactContainerContactIcon"class="contactContainerContactIcon"style="background-color: ${contact.bgColor}">${letter}${lastNameLetter}</div>
        <div class="nameEditDelete">
          <div id="contactContainerContactName"class="contactContainerContactName">${contact["name"]}</div>
          <div class="editDeleteContainer">
          <div onclick="editContact(${id})"class="iconEdit">
          <svg class="svgIcons"width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_119188_2072" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
              <rect width="24" height="24" fill="#D9D9D9"/>
              </mask>
              <g mask="url(#mask0_119188_2072)">
              <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
              </g>
            </svg>
            <p>Edit</p>
          </div>
        <div onclick="deleteContact(${id})"class="iconDelete">
        <svg class="svgIcons"width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <mask id="mask0_119188_3520" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
             <rect width="24" height="24" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_119188_3520)">
             <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
             </g>
             </svg>
          <p>Delete</p>
    </div>
        </div>
        </div>
      </div>
      <div class="contactInfoContainer">
        <p class="contactInfo">Contact Information</p>
      </div>
      <div class="emailPhone">
        <div class="emailContainer">
          <p class="emailtext">Email</p>
          <p id="emailadress"class="emailadress">${contact["email"]}</p>
        </div>
        <div class="phoneContainer">
          <p class="phone">Phone</p>
          <p id="telnumber"class="tel">${contact["tel"]}</p>
        </div>
      </div>
    </div>
    `; 
   
}
setTimeout(() => {
  document.getElementById('contactContainerContact').classList.add('showOverlay-contactContainerContact');
}, 225);



save();
load();
}


function deleteContact(id) {
  let index = contacts.findIndex((contact) => contact.id === id);
  if (index !== -1) {
    contacts.splice(index, 1);
    showContacts();
    save();
    load();
    document.getElementById('contactContainerContact').innerHTML = '';
    closeEditContact();
  }
}





function editContact(id) {
  

  const selectedContact = contacts.find(contact => contact.id === id);
  document.getElementById("editcontact").classList.add("showOverlay-addNewContactPopUpContainer");
  document.getElementById("backGroundOpacityContainer").classList.remove("d-none");
  document.getElementById("editname").value = selectedContact.name;
  document.getElementById("editemail").value = selectedContact.email;
  document.getElementById("edittel").value = selectedContact.tel;
  
}


function closeEditContact() {
  document.getElementById("editcontact").classList.remove("showOverlay-addNewContactPopUpContainer");
  document.getElementById("backGroundOpacityContainer").classList.add("d-none");
  document.getElementById("editname").value = "";
  document.getElementById("editemail").value = "";
  document.getElementById("edittel").value = "";

}


function deleteEditContact(id){
 
  deleteContact(id);
  closeEditContact();
  showContacts();

}






function save() {
  let lettersAsText = JSON.stringify(letters);
  localStorage.setItem("letters", lettersAsText);
  let contactsAsText = JSON.stringify(contacts);
  localStorage.setItem("contacts", contactsAsText);
  
}

function load() {
  let lettersAsText = localStorage.getItem('letters');
  let contactsAsText = localStorage.getItem('contacts');
 

  if (lettersAsText && contactsAsText) {
    contacts = JSON.parse(contactsAsText);
    letters = JSON.parse(lettersAsText);
  }
}
