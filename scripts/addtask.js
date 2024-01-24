let tasks = [];

    
function createTask(event){
  event.preventDefault();
    let title = document.getElementById("enterTitle");
    let description = document.getElementById("enterDescription");
    let date = document.getElementById("enterDate");
    let subtask = document.getElementById('addSubTasks');
    let task = {
      title: title.value,
      description: description.value,
      date: date.value,
      subtask:subtask.value,
    };

    tasks.push(task);
    console.log(tasks);
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
                
                                    <span>Technical Task</span>
                                </div>
                                    <input type="checkbox">
                            </div>
    
                        </div>
                        <div class="categoryTaskContainer">
                            <div class="selectCategoryContainer">
                                <div class="selectCategory">
                
                                    <span>User Story</span>
                                </div>
                                    <input type="checkbox">
                            </div>
    
                        </div>
  `;
}

function addSubtasks() {
  let subtaskInput = document.getElementById('addSubTasks');
  let subtaskValue = subtaskInput.value.trim();

  // Überprüfen, ob das Eingabefeld nicht leer ist
  if (subtaskValue !== '') {
    // Füge die Subtask zum tasks-Array hinzu
    let subtask = {
      title: subtaskValue,
      completed: false, // You can add additional properties if needed
    };

    tasks.push(subtask);

    // Rufe die Funktion auf, um die Subtasks anzuzeigen
    displaySubtasks();
    
    // Leere das Eingabefeld für die nächste Eingabe
    document.getElementById('addSubTasks').value = '';
  } else {
    // Zeige eine Fehlermeldung oder handle den leeren Zustand des Eingabefelds
    console.log('Subtask field is empty');
  }
}

function displaySubtasks() {
  let subTasksBox = document.getElementById('subTasksBox');
  subTasksBox.innerHTML = '';

  // Iteriere durch alle Subtasks im tasks-Array und zeige sie an
  for (let i = 0; i < tasks.length; i++) {
    const subtask = tasks[i];
    subTasksBox.innerHTML += /*html*/`
      <div class="subTasksIconsContainer">
        <div class="subTaskText">
          <li>${subtask.title}</li>
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