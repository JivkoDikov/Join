let contactDetails =[];
save();
load();
async function addNewContact() {
  
   document.getElementById('addnewcontact').classList.add('showOverlay-addNewContactPopUpContainer');
  // document.getElementById('addnewcontact').classList.add('bodyopacity');

   
   


}

function closeAddNewContact(){
  
  document.getElementById('addnewcontact').classList.remove('showOverlay-addNewContactPopUpContainer');
  

}

function createContact(){
  
  document.getElementById('addnewcontact').classList.remove('showOverlay-addNewContactPopUpContainer');

  let name = document.getElementById('name');
  let email = document.getElementById('email');
  let tel = document.getElementById('tel');

  let contactDetail = {
    "name": name.value,
    "email": email.value,
    "tel": tel.value
  };
  contactDetails.push(contactDetail);
  console.log(contactDetails);
  name.value ='';
  email.value='';
  tel.value='';

  for (let i = 0; i < contactDetails.length; i++) {
    const detail = contactDetails[i];
    
  
  document.getElementById('addcontactContainer').innerHTML += /*html*/`
  <div id="iconNameEmailContainer"class="iconNameEmailContainer">
    <div class="iconNameEmail">
    <div class="firstLastLetter">JD</div>
    <div class="nameEmail">
  <div class="name">${detail["name"]}</div>
  <div class="email">${detail["email"]}</div>
  </div>
  </div>

  </div>
  
  
  
  
  `;
  
 
  }
  
  
}
function save(){
  let contactDetailsAsText = JSON.stringify(contactDetails);
  localStorage.setItem("contactDetails", contactDetailsAsText);
}

function load(){
  let contactDetailsAsText = localStorage.getItem('contactDetails');
  if(contactDetailsAsText){
    contactDetails = JSON.parse(contactDetailsAsText);

  }
  
}