let array = [
  "board": [
    {
        "id" : 0,
        "label" : "User Story",
        "headline" : "Recommender",
        "text": "Build start page with recipe recommendation...",
        "progressBar" : 1,
        "user": "",
        "priority": `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_117793_2582)">
        <path d="M23.5685 19.1666L8.43151 19.1666C8.18446 19.1666 7.94752 19.0677 7.77283 18.8918C7.59814 18.7158 7.5 18.4772 7.5 18.2283C7.5 17.9795 7.59814 17.7408 7.77283 17.5649C7.94752 17.3889 8.18446 17.29 8.43151 17.29L23.5685 17.29C23.8155 17.29 24.0525 17.3889 24.2272 17.5649C24.4019 17.7408 24.5 17.9795 24.5 18.2283C24.5 18.4772 24.4019 18.7158 24.2272 18.8918C24.0525 19.0677 23.8155 19.1666 23.5685 19.1666Z" fill="#FFA800"/>
        <path d="M23.5685 14.7098L8.43151 14.7098C8.18446 14.7098 7.94752 14.6109 7.77283 14.435C7.59814 14.259 7.5 14.0204 7.5 13.7715C7.5 13.5227 7.59814 13.284 7.77283 13.1081C7.94752 12.9321 8.18446 12.8333 8.43151 12.8333L23.5685 12.8333C23.8155 12.8333 24.0525 12.9321 24.2272 13.1081C24.4019 13.284 24.5 13.5227 24.5 13.7715C24.5 14.0204 24.4019 14.259 24.2272 14.435C24.0525 14.6109 23.8155 14.7098 23.5685 14.7098Z" fill="#FFA800"/>
        </g>
        <defs>
        <clipPath id="clip0_117793_2582">
        <rect width="17" height="6.33333" fill="white" transform="translate(7.5 12.8333)"/>
        </clipPath>
        </defs>
        </svg>`,
        "category": "progress"
    },

      ],
  "profile": {
        "contactDetails":[
          {
            "name": "",
            "email": "",
            "tel": "",
          }
        ],
        "backgroundColors": [
          { color: 'rgb(147, 39, 255)', },
          { color: 'rgb(110, 82, 255)', },
          { color: 'rgb(252, 113, 255)', },
          { color: 'rgb(255, 122, 0)', },
          { color: 'rgb(31, 215, 193)', },
          { color: 'rgb(70, 47, 138)', }
          
        ]
      },
  "user": [
    {
      {
        
        "name": "",
        "email": "",
        "tel": "",
      }
    }
  ]


]




let profile ={
  "contactDetails":[
    {
      "name": "",
      "email": "",
      "tel": "",
    }
  ],
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

document.getElementById("showContact").classList.add("showOverlay-contactContainerContact");
document.getElementById("showContact").classList.remove("overlay-contactContainerContact");

}


function renderContact(index) {
  const backgroundColor = backgroundColors[index % backgroundColors.length];

  const firstLetter = profile["contactDetails"][index]["name"][0].toUpperCase(); 
  const lastLetter = profile["contactDetails"][index]["name"].split(' ')[1]?.[0]?.toUpperCase() || ''; 
  
  const selectedContact =  profile["contactDetails"][index];
document.getElementById('contactContainer').classList.add('backgroundColorContact');
//document.getElementById('contactContainerContact').classList.add('showOverlay-contactContainerContact');
document.getElementById('contactContainerContactName').innerHTML = selectedContact.name;
document.getElementById('emailadress').innerHTML = selectedContact.email;
document.getElementById('telnumber').innerHTML = selectedContact.tel;
document.getElementById('contactContainerContactIcon').innerHTML = `${firstLetter+lastLetter}`;
document.getElementById('contactContainerContactIcon').style.backgroundColor = backgroundColor;

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


