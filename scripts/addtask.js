let tasks = [];
let IdCounter = 0;
let subtasksArray =[];


function createTask(event){
  event.preventDefault();
    let headline = document.getElementById("enterTitle").value;
    let text = document.getElementById("enterDescription").value;
    let date = document.getElementById("enterDate").value;
    

    
  let newTask = {
    id: IdCounter++,
    label: [],
    headline: headline,
    text: text,
    progressBar:"",
    subtasks: [subtasksArray],
    user: "",
    priority: 1,
    category: "",
    date: date
  };

 

  tasks.push(newTask);
  document.getElementById("enterTitle").value = "";
  document.getElementById("enterDescription").value = "";
  document.getElementById("enterDate").value = "";
  document.getElementById("addSubTasks").value = "";
  subtasksArray = [];
   
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


function assignedTo(){
  let contactsBox = document.getElementById('contactsBox');
  contactsBox.innerHTML ='';
  contactsBox.innerHTML += /*html*/`
   <div class="assignedContactsContainer">
                        <div class="assignedContactSVG">
                            <div class="letterContacts">
                                <div class="assignedLetters">JD</div>
                                <span>Jivko Dikov</span>
                            </div>
                                <input type="checkbox">
                        </div>

                    </div>`;

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
                                    <input id="technicalTaskCheckbox" type="checkbox" onchange="updateLabels('Technical Task')">
                            </div>
    
                        </div>
                        <div class="categoryTaskContainer">
                            <div class="selectCategoryContainer">
                                <div class="selectCategory">
                
                                    <span id="userStory">User Story</span>
                                </div>
                                    <input id="userStoryCheckbox" type="checkbox" onchange="updateLabels('User Story')">
                            </div>
    
                        </div>
  `;
  
}
function updateLabels(category) {
  const newTask = tasks[tasks.length - 1]; 
  const labelIndex = newTask["label"].indexOf(category);

  if (labelIndex === -1) {
    newTask.label.push(category);
  } else {
    newTask.label.splice(labelIndex, 1);
  }

  console.log(newTask.label);
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
        <div class="subTaskText">
          <li>${subtask.name}</li>
        </div>
        <div class="subTaskIconsBox">
          <img class="subTaskIcon" src="/assets/img/pencel.jpg" alt="">
          <img class="subTaskIcon" src="/assets/img/trash.jpg" alt="">
        </div>
      </div>
    `;
  }
}


function editSubTasks(){ 
  
}

function deleteSubTask(){

}

function saveContactsInArray(){
  let jsonString = localStorage.getItem("contacts")
  let contacts = JSON.parse(jsonString)
  console.log(contacts[0].name)
}