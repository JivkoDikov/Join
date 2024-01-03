let contactDetails =[];

function addNewContact() {


   document.getElementById('addnewcontact').classList.add('showOverlay-addNewContactPopUpContainer');
}

function closeAddNewContact(){
  
  document.getElementById('addnewcontact').classList.remove('showOverlay-addNewContactPopUpContainer');

}

function createContact(){
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
}