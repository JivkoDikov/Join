let letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
let contacts = [ {
  id : 0,
  name: "Franz Meier",
  email: "franzmeier@hotmail.com",
  tel: "5458938498",
},
{
  id : 1,
  name: "Sepp Schuster",
  email: "seppschuster@hotmail.com",
  tel: "5889523049",
},
{
  id : 2,
  name: "Max Mustermann",
  email: "maxmustermann@hotmail.com",
  tel: "9080983409",
},
{
  id : 3,
  name: "Anton Hermann",
  email: "antonhermann@hotmail.com",
  tel: "485039485"
}];
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
    id : 5,
    name: name.value,
    email: email.value,
    tel: tel.value,
  };
  contacts.push(contact);
  name.value = "";
  email.value = "";
  tel.value = "";
  



  

  showContacts();
}

function showContacts() {
  let letterBox = document.getElementById("letterBox");
  letterBox.innerHTML ='';
  for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];
      let backgroundColor = backgroundColors[i % backgroundColors.length];
      letterBox.innerHTML += /*html*/ `
            <div id="iconNameEmailContainer" class="iconNameEmailContainer" >
                <div class="iconNameEmail">
                    <div id="firstLastLetter" class="firstLastLetter" style="background-color: ${backgroundColor.color}">
                      
                    </div>
                    <div class="nameEmail">
                        <div class="name">${contact["name"]}</div>
                        <div class="email">${contact["email"]}</div>
                    </div>
                </div>

            </div>`;
  }

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    document.getElementById("letterBox").innerHTML += /*html*/ `
    <div id="firstLetterContainer" class="firstLetterContainer">${letter}</div>
  <div class="line"></div>`;
  }
 
}





function deleteContact(index) {
  contactDetails.splice(index, 1);
  save();
  load();
  document.getElementById("showContact").classList.add("overlay-contactContainerContact");
  document.getElementById("showContact").classList.remove("showOverlay-contactContainerContact");
}

function editContact(index) {
  const selectedContact = contactDetails[index];
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
