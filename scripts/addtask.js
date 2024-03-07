let IdCounter;
let subtasksArray =[];
let categoryArray =[];
let prioArray = 1;
let editingSubtaskIndex = -1;
let selectedCategoryId = null;
let selectedContactDetails = [];
let newcategoryTask = [];
let contacts = {};

async function createTask(event) {
  preventDefaultBehavior(event);
  const newCategory = await createAndLogNewCategory();
  initializeUserTasks();
  const newTask = createNewTaskObject(newCategory);
  await addTaskAndSave(newTask);
  resetInputFields();
  await updateTasksAndRedirect();
}


function preventDefaultBehavior(event) {
  event.preventDefault();
}


async function createAndLogNewCategory() {
  const newCategoryTask = await createTaskCategory();
  return newCategoryTask[0];
}


function initializeUserTasks() {
  if (!tasks[userID]) {
    tasks[userID] = [];
  }
}


function getNextTaskId() {
  if (!tasks[userID] || tasks[userID].length === 0) {
      return 0; 
  } else {
      const maxId = tasks[userID].reduce((max, task) => Math.max(max, task.id), 0);
      return maxId + 1;
  }
}

function createNewTaskObject(newCategory) {
  let headline = document.getElementById("enterTitle").value;
  let text = document.getElementById("enterDescription").value;
  let date = document.getElementById("enterDate").value;
  
  return {
      id: getNextTaskId(),
      label: categoryArray,
      headline: headline,
      text: text,
      progressBar: "",
      subtasks: subtasksArray,
      user: selectedContactDetails,
      priority: prioArray,
      category: newCategory,
      date: date
  };
}


function resetInputFields() {
  document.getElementById("enterTitle").value = "";
  document.getElementById("enterDescription").value = "";
  document.getElementById("enterDate").value = "";
  document.getElementById("addSubTasks").value = "";
  subtasksArray = [];
  categoryArray = [];
}


async function addTaskAndSave(newTask) {
  tasks[userID].push(newTask);
  await setItem('tasks', tasks);
}


async function updateTasksAndRedirect() {
  let todoCategory = ['todo'];
  await setItem('newcategory', todoCategory);
  window.location.href = 'board.html';
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


function toggleContacts() {
  let contactsBox = document.getElementById('contactsBox');
  // Überprüfen, ob das Element sichtbar ist oder nicht
  if (contactsBox.style.display === 'none' || contactsBox.innerHTML.trim() === '') {
    assignedTo(); // Ruft die Funktion auf, um die Kontakte mit den aktuellen Zuständen anzuzeigen
    contactsBox.style.display = 'block'; // Zeigt die Kontakte an
  } else {
    contactsBox.style.display = 'none'; // Blendet die Kontakte aus
  }
}


async function assignedTo() {
  await load_contacts_from_webstorage();

  let contactsBox = document.getElementById('contactsBox');
  contactsBox.innerHTML = '';

  if (contacts[userID] && contacts[userID].length > 0) {
      contacts[userID].forEach(contact => {
          if (contact && contact.name) { 
              let initials = getInitials(contact.name); 
              let isChecked = selectedContactDetails.some(c => c.name === contact.name && c.bgColor === contact.bgColor);
              contactsBox.innerHTML += assignedToHTML(contact, initials, isChecked);
          }
      });
  }
}


function updateSelectedContacts(initials, bgColor, name, checkbox) {
  let contactExistsIndex = selectedContactDetails.findIndex(c => c.name === name && c.bgColor === bgColor);

  if (checkbox.checked && contactExistsIndex === -1) {
    // Fügt den Kontakt hinzu, wenn er noch nicht existiert
    selectedContactDetails.push({
      name: name,
      bgColor: bgColor,
      initials: initials
    });
  } else if (!checkbox.checked && contactExistsIndex !== -1) {
    // Entfernt den Kontakt, wenn das Kontrollkästchen deaktiviert wurde
    selectedContactDetails.splice(contactExistsIndex, 1);
  }
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
  selectedPrio0.classList.remove('activePrio0');
  selectedPrio1.classList.remove('activePrio1');
  selectedPrio2.classList.remove('activePrio2');
  if (buttonId === 2) {
    selectedPrio2.classList.add('activePrio2');
  } else if (buttonId === 1) {
    selectedPrio1.classList.add('activePrio1');
  } else if (buttonId === 0) {
    selectedPrio0.classList.add('activePrio0');
  }
}


function toggleCategories() {
  let categoryBox = document.getElementById('categoryBox');
  if (categoryBox.style.display === 'none' || categoryBox.innerHTML.trim() === '') {
    addCategory();
    categoryBox.style.display = 'block';
  } else {
    categoryBox.style.display = 'none'; 
  }
}


function addCategory() {
  let categoryBox = document.getElementById('categoryBox');
  categoryBox.innerHTML = '';
  categoryBox.innerHTML += addCategoryHTML();
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
    subTasksBox.innerHTML += displaySubtasksHTML(subtask, i);
  }
}


function editSubTask(index){
  let editSubTasks = document.getElementById('editSubTasksBox');
  editSubTasks.innerHTML = '';

  if (index >= 0 && index < subtasksArray.length) {
    let subTaskName = subtasksArray[index].name;

  editSubTasks.innerHTML += editSubTaskHTML(index, subTaskName);
    let editSubTaskInput = document.getElementById('editSubTaskInput');
    editSubTaskInput.addEventListener('input', function () {
      subtasksArray[index].name = editSubTaskInput.value;
    });
}}


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
        let subtask = subtasksArray[i];
        subTasksBox.innerHTML += saveEditeSubTaskHTML(subtask, i);
      }
    }
  }
}


function deleteSubTask(index){
  subtasksArray.splice(index, 1);
  document.getElementById('editSubTaskContainer').innerHTML ='';
  displaySubtasks();
}


function searchContact() {
  let search = document.getElementById('searchContacts').value.toLowerCase();
  updateCategory(contacts, search);
}


function updateCategory(card, search) {
  card.innerHTML = '';

  for (let i = 0; i < cards.length; i++) {
      const element = cards[i];
      if (element['category'] === category && (element['headline'].toLowerCase().includes(search) || search === '')) {
          card.innerHTML += generateCardHTML(element);           
      }       
  }
  emptyCategory();
}


async function load_contacts_from_webstorage(){
  let contactsValue = await getItem('contacts');
  contacts = JSON.parse(contactsValue.data.value)
}


function clearForm() {
  document.getElementById("newTaskForm").reset();
  selectedContactDetails = [];
  let contactCheckboxes = document.querySelectorAll('.contactCheckbox');
  contactCheckboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  document.getElementById("contactsBox").innerHTML = "";
  document.getElementById("categoryBox").innerHTML = "";
  document.getElementById("subTasksBox").innerHTML = "";
  document.getElementById('selectTaskCategory').innerHTML = "Select Task Category";
  document.getElementById("btnUrgent").classList.remove("activePrio0");
  document.getElementById("btnLow").classList.remove("activePrio2");
  document.getElementById("btnMedium").classList.add("activePrio1");
}