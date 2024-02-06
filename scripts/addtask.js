let tasks = [];
let IdCounter = 0;
let subtasksArray =[];
let categoryArray =[];
let prioArray = [];
let editingSubtaskIndex = -1;
let selectedCategoryId = null;
let selectedContactsInitials = [];

function createTask(event){
  event.preventDefault();
    let headline = document.getElementById("enterTitle").value;
    let text = document.getElementById("enterDescription").value;
    let date = document.getElementById("enterDate").value;
    

    
  let newTask = {
    id: IdCounter++,
    label: categoryArray,
    headline: headline,
    text: text,
    progressBar:"",
    subtasks: subtasksArray,
    user: selectedContactsInitials,
    priority: prioArray,
    category: "todo",
    date: date
  };
  console.log(newTask);

  tasks.push(newTask);
  document.getElementById("enterTitle").value = "";
  document.getElementById("enterDescription").value = "";
  document.getElementById("enterDate").value = "";
  document.getElementById("addSubTasks").value = "";
  subtasksArray = [];
  categoryArray = [];
  
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

function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;

}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("enterDate").value = getCurrentDate();
});

function assignedTo() {
  let contactsBox = document.getElementById('contactsBox');
  contactsBox.innerHTML = '';

  let jsonString = localStorage.getItem('contacts');
  let contacts = JSON.parse(jsonString);

  if (contacts && contacts.length > 0) {
    contacts.forEach(contact => {
      let initials = getInitials(contact.name);

      contactsBox.innerHTML += /*html*/`
        <div class="assignedContactsContainer">
          <div class="assignedContactSVG">
            <div class="letterContacts">
              <div class="assignedLetters" style="background-color: ${contact.bgColor}">${initials}</div>
              <span>${contact.name}</span>
            </div>
            <input id="assignedToContact_${contact.name}" type="checkbox" onchange="updateSelectedContacts('${initials}', this)">
          </div>
        </div>`;
    });
  }
}


function updateSelectedContacts(initials, checkbox) {
  if (checkbox.checked) {
    selectedContactsInitials.push(initials);
  } else {
    let index = selectedContactsInitials.indexOf(initials);
    if (index !== -1) {
      selectedContactsInitials.splice(index, 1);
    }
  }
  console.log('Selected Contacts Initials:', selectedContactsInitials);

}

function getInitials(name) {
  let names = name.split(' ');
  let initials = names.map(name => name[0].toUpperCase());
  return initials.join('');
}

function updatePrio(buttonId, event) {
  event.preventDefault();
  let selectedPrio0 = document.getElementById('btnUrgent');
  let selectedPrio1 = document.getElementById('btnMedium');
  let selectedPrio2 = document.getElementById('btnLow');
    prioArray = buttonId;
  if(buttonId === 0){
    selectedPrio0.classList.add('activePrio0');
    selectedPrio1.classList.remove('activePrio1');
    selectedPrio2.classList.remove('activePrio2');
  }else if (buttonId === 1) {
    selectedPrio0.classList.remove('activePrio0');
    selectedPrio1.classList.add('activePrio1');
    selectedPrio2.classList.remove('activePrio2');
  } else if (buttonId === 2) {
    selectedPrio0.classList.remove('activePrio0');
    selectedPrio1.classList.remove('activePrio1');
    selectedPrio2.classList.add('activePrio2');
  } 
}

function addCategory(){
  let categoryBox = document.getElementById('categoryBox');
  categoryBox.innerHTML ='';
  categoryBox.innerHTML += /*html*/`
  <div class="categoryTaskContainer">
                            <div class="selectCategoryContainer">
                                <div class="selectCategory">
                
                                    <span id="technicalTask">Technical Task</span>
                                </div>
                                    <input id="technicalTaskCheckbox" type="checkbox" onchange="updateLabels('technicalTaskCheckbox')">
                            </div>
    
                        </div>
                        <div class="categoryTaskContainer">
                            <div class="selectCategoryContainer">
                                <div class="selectCategory">
                
                                    <span id="userStory">User Story</span>
                                </div>
                                    <input id="userStoryCheckbox" type="checkbox" onchange="updateLabels('userStoryCheckbox')">
                            </div>
    
                        </div>
  `;
  
}




function updateLabels(categoryId) {
  let checkbox = document.getElementById(categoryId);
  let selectTaskCategory = document.getElementById('selectTaskCategory');
  let categoryBox = document.getElementById('categoryBox');

  if (checkbox && selectTaskCategory && categoryBox) {
    let categoryText = document.getElementById(categoryId.replace('Checkbox', '')).innerText;

    if (checkbox.checked) {
      categoryArray = [categoryText];
      document.querySelectorAll('.categoryCheckbox').forEach(otherCheckbox => {
        if (otherCheckbox.id !== categoryId) {
          otherCheckbox.checked = false;
        }
      });
      selectTaskCategory.innerText = ` ${categoryText}`;
      categoryBox.innerHTML = '';
    } else {
      categoryArray = [];
      selectTaskCategory.innerText = 'Select task category';
    }
  }
  console.log('Ausgewählte Kategorien:', categoryArray);
}



function addSubTask() {
  let subTaskInput = document.getElementById('addSubTasks');
  if (subTaskInput.value.trim() !== '') {
    subtasksArray.push({
      name:subTaskInput.value.trim(),
      done:false
    })
    subTaskInput.value = '';
    displaySubtasks();
  }
}


function displaySubtasks() {
  let subTasksBox = document.getElementById('subTasksBox');
  subTasksBox.innerHTML = '';
  for (let i = 0; i < subtasksArray.length; i++) {
    const subtask = subtasksArray[i];
    subTasksBox.innerHTML += /*html*/`
      <div class="subTasksIconsContainer">
        <div id="subTaskText"class="subTaskText">
          <li>${subtask.name}</li>
        </div>
        <div class="subTaskIconsBox">
          <img onclick="editSubTask(${i})"class="subTaskIcon" src="/assets/img/pencel.jpg" alt="">
          <img onclick="deleteSubTask(${i})"class="subTaskIcon" src="/assets/img/trash.jpg" alt="">
        </div>
      </div>
    `;
  }
}


function editSubTask(index){
  let editSubTasks = document.getElementById('editSubTasksBox');
  editSubTasks.innerHTML = '';

  if (index >= 0 && index < subtasksArray.length) {
    let subTaskName = subtasksArray[index].name;

  editSubTasks.innerHTML += /*html*/`
  <div id="editSubTaskContainer"class="editSubTaskContainer">
  <input id="editSubTaskInput" class="editSubTasksInput" type="text" value="${subTaskName}">
  <div class="editSubTasksIcons">
  <svg onclick="closeEditSubTask(${index})" class="editSubTasksClose"width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_117793_4210" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="24" height="24">
<rect x="4" y="4" width="24" height="24" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_117793_4210)">
<path d="M16 17.4L11.1 22.3C10.9167 22.4834 10.6833 22.575 10.4 22.575C10.1167 22.575 9.88332 22.4834 9.69999 22.3C9.51665 22.1167 9.42499 21.8834 9.42499 21.6C9.42499 21.3167 9.51665 21.0834 9.69999 20.9L14.6 16L9.69999 11.1C9.51665 10.9167 9.42499 10.6834 9.42499 10.4C9.42499 10.1167 9.51665 9.88338 9.69999 9.70005C9.88332 9.51672 10.1167 9.42505 10.4 9.42505C10.6833 9.42505 10.9167 9.51672 11.1 9.70005L16 14.6L20.9 9.70005C21.0833 9.51672 21.3167 9.42505 21.6 9.42505C21.8833 9.42505 22.1167 9.51672 22.3 9.70005C22.4833 9.88338 22.575 10.1167 22.575 10.4C22.575 10.6834 22.4833 10.9167 22.3 11.1L17.4 16L22.3 20.9C22.4833 21.0834 22.575 21.3167 22.575 21.6C22.575 21.8834 22.4833 22.1167 22.3 22.3C22.1167 22.4834 21.8833 22.575 21.6 22.575C21.3167 22.575 21.0833 22.4834 20.9 22.3L16 17.4Z" fill="#2A3647"/>
</g>
</svg>
  <svg onclick="saveEditeSubTask(${index})" class="editsubTasksSVG" width="24" height="24" viewBox="0 0 24 25" fill="#000000" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_131179_1277" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
<rect y="0.5" width="24" height="24" fill="#000000"/>
</mask>
<g mask="url(#mask0_131179_1277)">
<path d="M9.55057 15.65L18.0256 7.175C18.2256 6.975 18.4631 6.875 18.7381 6.875C19.0131 6.875 19.2506 6.975 19.4506 7.175C19.6506 7.375 19.7506 7.6125 19.7506 7.8875C19.7506 8.1625 19.6506 8.4 19.4506 8.6L10.2506 17.8C10.0506 18 9.81724 18.1 9.55057 18.1C9.28391 18.1 9.05057 18 8.85057 17.8L4.55057 13.5C4.35057 13.3 4.25474 13.0625 4.26307 12.7875C4.27141 12.5125 4.37557 12.275 4.57557 12.075C4.77557 11.875 5.01307 11.775 5.28807 11.775C5.56307 11.775 5.80057 11.875 6.00057 12.075L9.55057 15.65Z" fill="white"/>
</g>
</svg>

   </div>
  
  `;
    let editSubTaskInput = document.getElementById('editSubTaskInput');
    editSubTaskInput.addEventListener('input', function () {
      subtasksArray[index].name = editSubTaskInput.value;
    });
  
}
}

function closeEditSubTask(index){
  deleteSubTask(index);
}

function saveEditeSubTask(index) {
  let editSubTasks = document.getElementById('editSubTaskContainer');
  let editSubTaskInput = document.getElementById('editSubTaskInput');
  let subTasksBox = document.getElementById('subTasksBox');

  if (index >= 0 && index < subtasksArray.length && editSubTaskInput) {
    subtasksArray[index].name = editSubTaskInput.value;
    editSubTasks.innerHTML = '';
    displaySubtasks();

    if (subTasksBox) {
      subTasksBox.innerHTML = '';
      for (let i = 0; i < subtasksArray.length; i++) {
        const subtask = subtasksArray[i];
        subTasksBox.innerHTML += /*html*/`
          <div class="subTasksIconsContainer">
            <div class="subTaskText">
              <li>${subtask.name}</li>
            </div>
            <div class="subTaskIconsBox">
              <img onclick="editSubTask(${i})" class="subTaskIcon" src="/assets/img/pencel.jpg" alt="">
              <img onclick="deleteSubTask(${i})" class="subTaskIcon" src="/assets/img/trash.jpg" alt="">
            </div>
          </div>
        `;
      }
    }
  }
}



function deleteSubTask(index){
  subtasksArray.splice(index, 1);
  document.getElementById('editSubTaskContainer').innerHTML ='';
  displaySubtasks();
}

function saveContactsInArray(){
  let jsonString = localStorage.getItem("contacts")
  let contacts = JSON.parse(jsonString)
  console.log(contacts[0].name)
}