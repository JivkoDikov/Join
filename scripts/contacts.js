let profile ={
  "id" : 0,
  "label" : "User Story",
  "headline" : "Kochwelt Page & Recipe Recommender",
  "text": "Build start page with recipe recommendation...",
  "progressBar" : 1,
  "user": "",
  "priority": "1",
  "category": "progress",
  "contactDetails":[],
  "backgroundColors": [
    { color: 'rgb(147, 39, 255)', },
    { color: 'rgb(110, 82, 255)', },
    { color: 'rgb(252, 113, 255)', },
    { color: 'rgb(255, 122, 0)', },
    { color: 'rgb(31, 215, 193)', },
    { color: 'rgb(70, 47, 138)', }
    
  ]

}
  
 const backgroundColors = [
  { color: 'rgb(147, 39, 255)', },
  { color: 'rgb(110, 82, 255)', },
  { color: 'rgb(252, 113, 255)', },
  { color: 'rgb(255, 112, 0)', },
  { color: 'rgb(31, 215, 193)', },
  { color: 'rgb(70, 47, 138)', }
  
];
save();
load();
i= 0;

async function addNewContact() {
  document.getElementById("addnewcontact").classList.add("showOverlay-addNewContactPopUpContainer");
  document.getElementById('backGroundOpacityContainer').classList.remove('d-none');
  
}

function closeAddNewContact() {
  document.getElementById("addnewcontact").classList.remove("showOverlay-addNewContactPopUpContainer");
  document.getElementById('backGroundOpacityContainer').classList.add('d-none');
}

function createContact() {
  document.getElementById("addnewcontact").classList.remove("showOverlay-addNewContactPopUpContainer");
  document.getElementById('backGroundOpacityContainer').classList.add('d-none');
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let tel = document.getElementById("tel");

  let contactDetail = {
    name: name.value,
    email: email.value,
    tel: tel.value,
  };
  profile["contactDetails"].push(contactDetail);
  console.log(profile);
  name.value = "";
  email.value = "";
  tel.value = "";

  document.getElementById("renderContactContainer").innerHTML = "";

  for (let i = 0; i < profile["contactDetails"].length; i++) {
    const detail = profile["contactDetails"][i];

    const backgroundColor = backgroundColors[i % backgroundColors.length];

    const firstLetter = detail["name"][0].toUpperCase(); 
    const lastLetter = detail["name"].split(' ')[1]?.[0]?.toUpperCase() || ''; 

    document.getElementById("renderContactContainer").innerHTML += /*html*/ `
    <div id="firstLetterContainer" class="firstLetterContainer">${firstLetter}</div>
  <div onclick="renderContact(${i})"id="iconNameEmailContainer"class="iconNameEmailContainer" >
    <div class="iconNameEmail">
    <div id="firstLastLetter"class="firstLastLetter" style="background-color: ${backgroundColor.color};">${firstLetter}${lastLetter}</div>
    <div class="nameEmail">
  <div class="name">${detail["name"]}</div>
  <div class="email">${detail["email"]}</div>
  </div>
  </div>

  </div>
  `;
  }

  for (let i = 0; i < profile["contactDetails"].length; i++) {
    const detail = profile["contactDetails"][i];
    
    

    const firstLetter = detail["name"][0].toUpperCase(); 
    const lastLetter = detail["name"].split(' ')[1]?.[0]?.toUpperCase() || ''; 
   
    document.getElementById("showContact").innerHTML = /*html*/ `
  <div id="contactContainerContact" class="contactContainerContact ">
    <div class="contactContainerContactIconName">
      <div id="contactContainerContactIcon"class="contactContainerContactIcon">${firstLetter}${lastLetter}</div>
      <div class="nameEditDelete">
        <div id="contactContainerContactName"class="contactContainerContactName">${detail["name"]}</div>
        <div class="editDeleteContainer">
        <div onclick="editContact()"class="iconEdit">
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

      <div class="iconDelete">
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
        <p id="emailadress"class="emailadress">${detail["email"]}</p>
      </div>
      <div class="phoneContainer">
        <p class="phone">Phone</p>
        <p id="telnumber"class="tel">${detail["tel"]}</p>
      </div>
    </div>
  </div>
  `;
 
 const lastAddedBackgroundColor = backgroundColors[(profile["contactDetails"].length - 1) % backgroundColors.length];
  document.getElementById("contactContainerContactIcon").style.backgroundColor = lastAddedBackgroundColor.color;
}


}


function renderContact(index) {
  
  const selectedContact =  profile["contactDetails"][index];
document.getElementById('contactContainer').classList.add('backgroundColorContact');
document.getElementById('contactContainerContact').classList.add('showoverlay-contactContainerContact');
document.getElementById('contactContainerContactName').innerHTML = selectedContact.name;
document.getElementById('emailadress').innerHTML = selectedContact.email;
document.getElementById('telnumber').innerHTML = selectedContact.tel;

  }

  function editContact(){
    document.getElementById("editcontact").classList.add("showOverlay-addNewContactPopUpContainer");
  document.getElementById('backGroundOpacityContainer').classList.remove('d-none');
document.getElementById('editname').value =`${profile["contactDetails"][i]["name"]}`;
document.getElementById('editemail').value =`${profile["contactDetails"][i]["email"]}`;
document.getElementById('edittel').value =`${profile["contactDetails"][i]["tel"]}`;
  }
  function closeEditContact(){
    document.getElementById("editcontact").classList.remove("showOverlay-addNewContactPopUpContainer");
    document.getElementById('backGroundOpacityContainer').classList.add('d-none');
  }

function save() {
  let profileAsText = JSON.stringify(profile);
  localStorage.setItem( "profile", profileAsText);
}

function load() {
  let profileAsText = localStorage.getItem("profile");
  if(profileAsText){
    profile = JSON.parse(profileAsText);
  }
}