let letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

let contacts = [
    { email: "dsfsdf@sdfsd", name: "Juri", tel: "dsfgdsfgdfg", firstLetter: "J" },
    { email: "dsfsdf@sdfsd", name: "Detlef", tel: "dsfgdsfgdfg", firstLetter: "D" },
    { email: "example1@example.com", name: "Alice", tel: "123456789", firstLetter: "A" },
    { email: "example2@example.com", name: "Bob", tel: "987654321", firstLetter: "B" },
    { email: "example3@example.com", name: "Charlie", tel: "555555555", firstLetter: "C" },
    { email: "example4@example.com", name: "David", tel: "666666666", firstLetter: "D" },
    { email: "example5@example.com", name: "Eva", tel: "777777777", firstLetter: "E" },
    { email: "example6@example.com", name: "Frank", tel: "888888888", firstLetter: "F" },
    { email: "example7@example.com", name: "Grace", tel: "999999999", firstLetter: "G" },
    { email: "example8@example.com", name: "Harry", tel: "111111111", firstLetter: "H" },
    { email: "example9@example.com", name: "Ivy", tel: "222222222", firstLetter: "I" },
    { email: "example10@example.com", name: "Jack", tel: "333333333", firstLetter: "J" },
    { email: "example11@example.com", name: "Jasmine", tel: "444444444", firstLetter: "J" },
    { email: "example12@example.com", name: "Klaus", tel: "555555555", firstLetter: "K" },
    { email: "example13@example.com", name: "Laura", tel: "666666666", firstLetter: "L" },
    { email: "example14@example.com", name: "Michael", tel: "777777777", firstLetter: "M" },
    { email: "example15@example.com", name: "Nina", tel: "888888888", firstLetter: "N" },
    { email: "example16@example.com", name: "Oliver", tel: "999999999", firstLetter: "O" },
    { email: "example17@example.com", name: "Paul", tel: "111111111", firstLetter: "P" },
    { email: "example18@example.com", name: "Quinn", tel: "222222222", firstLetter: "Q" },
    { email: "example19@example.com", name: "Quincy", tel: "333333333", firstLetter: "Q" },
    { email: "example20@example.com", name: "Rita", tel: "444444444", firstLetter: "R" },
  ]

let backgroundColors = [
    { color: "rgb(147, 39, 255)" },
    { color: "rgb(110, 82, 255)" },
    { color: "rgb(252, 113, 255)" },
    { color: "rgb(255, 122, 0)" },
    { color: "rgb(31, 215, 193)" },
    { color: "rgb(70, 47, 138)" },
  ]

  
save();
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
  }, 1000);

  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let tel = document.getElementById("tel");
  let contact = {
    id : contacts.length,
    name: name.value,
    email: email.value,
    tel: tel.value,
  };
  contacts.push(contact);
  name.value = "";
  email.value = "";
  tel.value = "";
  

  let letter = contact["name"].charAt(0).toUpperCase();
  if (letters.indexOf(letter) === -1) {
    letters.push(letter);
  }
  
  
    showContacts();
showContact();
  

  
}


function initContacts(){
  render();
  showContacts();
}

function showContacts() {
 
  let idName = null;
  let letterBox = document.getElementById("letterBox");
  letterBox.innerHTML ='';
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i]; 
    document.getElementById("letterBox").innerHTML += /*html*/ `
      <div id="firstLetterContainer" class="firstLetterContainer">${letter}</div>
      <div class="line"></div>`;
    let filteredContacts = contacts.filter((contact) => contact["name"].charAt(0) == letter);
    
    for (let j = 0; j < filteredContacts.length; j++) {
      const filteredContact = filteredContacts[j];
      idName = filteredContact.email + '-' + filteredContact.name;

      letterBox.innerHTML += /*html*/ `
        <div onclick="showContact('${idName}')" id="iconNameEmailContainer" class="iconNameEmailContainer">
          <div class="iconNameEmail">
            <div id="firstLastLetter" class="firstLastLetter">${letter}</div>
            <div class="nameEmail">
              <div class="name">${filteredContact["name"]}</div>
              <div class="email">${filteredContact["email"]}</div>
            </div>
          </div>
        </div>`;
    }
  }
}

function showContact(idName){

  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let contactIdName = contact.email + '-' + contact.name;
  
    if (contactIdName === idName) {

      let letter = contact.name.charAt(0).toUpperCase();
  
      document.getElementById("showContact").innerHTML = /*html*/ `
    <div id="contactContainerContact" class="contactContainerContact">
      <div class="contactContainerContactIconName">
        <div id="contactContainerContactIcon"class="contactContainerContactIcon" >${letter}</div>
        <div class="nameEditDelete">
          <div id="contactContainerContactName"class="contactContainerContactName">${contact["name"]}</div>
          <div class="editDeleteContainer">
          <div onclick="editContact(${i})"class="iconEdit">
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
        <div onclick="deleteContact(${i})"class="iconDelete">
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
    `
          break; 
        };
      };
  
  save();
  load();
  }






function deleteContact(i) {
  contacts.splice(i, 1);
  save();
  load();
  document.getElementById("showContact").classList.add("overlay-contactContainerContact");
  document.getElementById("showContact").classList.remove("showOverlay-contactContainerContact");
}

function editContact(i) {
  const selectedContact = contacts[i];
  document.getElementById("editcontact").classList.add("showOverlay-addNewContactPopUpContainer");
  document.getElementById("backGroundOpacityContainer").classList.remove("d-none");
  document.getElementById("editname").value = selectedContact.name;
  document.getElementById("editemail").value = selectedContact.email;
  document.getElementById("edittel").value = selectedContact.tel;
}

function closeEditContact() {
  document.getElementById("editcontact").classList.remove("showOverlay-addNewContactPopUpContainer");
  document.getElementById("backGroundOpacityContainer").classList.add("d-none");
}



function save() {
  let lettersAsText = JSON.stringify(letters);
  localStorage.setItem("letters", lettersAsText);
  let contactsAsText = JSON.stringify(contacts);
  localStorage.setItem("contacts", contactsAsText);
  let backgroundColorsAsText = JSON.stringify(backgroundColors);
  localStorage.setItem("backgroundColors", backgroundColorsAsText);
}

function load() {
  let lettersAsText = localStorage.getItem('letters');
  let contactsAsText = localStorage.getItem('contacts');
  let backgroundColorsAsText = localStorage.getItem('backgroundColors')

  if (lettersAsText && contactsAsText && backgroundColorsAsText) {
    contacts = JSON.parse(contactsAsText);
    letters = JSON.parse(lettersAsText);
    backgroundColors = JSON.parse(backgroundColorsAsText);
  }
}

  
    
