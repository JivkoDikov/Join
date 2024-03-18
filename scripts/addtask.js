let IdCounter;
let subtasksArray =[];
let categoryArray =[];
let prioArray = 1;
let editingSubtaskIndex = -1;
let selectedCategoryId = null;
let selectedContactDetails = [];
let newcategoryTask = [];
let contacts = {};

async function initTasks(){
  render();
  loadTasks(userID);
  
}

function addTaskForm(event){
  checkNewTasks(event);
  addTaskHTMLOpen('todo');
}

/**
 * Activates the form by creating a task and applying an active style.
 * @param {Event} event - The triggering event.
 */
function activForm(event) {  
  createTask(event);
  addActiveStyle(3);
}

/**
 * Asynchronously creates a task, preventing the default event action. Initializes user tasks, creates a new task object, and updates the task list.
 * @param {Event} event - The triggering event.
 */
async function createTask(event) {
  preventDefaultBehavior(event);
  const newCategory = await createAndLogNewCategory();
  
  const newTask = createNewTaskObject(newCategory);
  await addTaskAndSave(newTask);
  await initializeUserTasks(newTask);
  resetInputFields();
  await updateTasksAndRedirect();
}

/**
 * Prevents the default action of an event.
 * @param {Event} event - The event to be processed.
 */
function preventDefaultBehavior(event) {
  event.preventDefault();
}

/**
 * Asynchronously creates and logs a new task category.
 */
async function createAndLogNewCategory() {
  const newCategoryTask = await createTaskCategory();
  return newCategoryTask[0];
}

/**
 * Initializes the task list for a user if it does not exist.
 */
async function initializeUserTasks() {
  if (!tasks) {
    tasks = [];
  }
}

/**
 * Retrieves the next task ID by finding the highest current ID and adding one.
 */
function getNextTaskId() {
  if (!tasks || tasks.length === 0) {
      return 0; 
  } else {
      const maxId = tasks.reduce((max, task) => Math.max(max, task.id), 0);
      return maxId + 1;
  }
}

/**
 * Creates a new task object with details from input fields and selected options.
 * @param {Object} newCategory - The category for the new task.
 */
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

/**
 * Resets input fields to their default values and clears arrays storing temporary task data.
 */
function resetInputFields() {
  document.getElementById("enterTitle").value = "";
  document.getElementById("enterDescription").value = "";
  document.getElementById("enterDate").value = "";
  document.getElementById("addSubTasks").value = "";
  subtasksArray = [];
  categoryArray = [];
}

/**
 * Adds a new task to the user's task list and saves it.
 * @param {Object} newTask - The new task to add and save.
 */
async function addTaskAndSave(newTask) {
  tasks.push(newTask);
  await setItem('tasks', tasks);
}


/**
 * Updates the task list and redirects the user to the board view.
 */
async function updateTasksAndRedirect() {
  let todoCategory = ['todo'];
  await setItem('newcategory', todoCategory);
  window.location.href = 'board.html';
}

/**
 * Toggles the display of the contacts list, showing it if hidden and hiding it if shown.
 */
function toggleContacts(event) {
  event.stopPropagation();
  let contactsBox = document.getElementById('contactsBox');
  if (contactsBox.style.display === 'none' || contactsBox.innerHTML.trim() === '') {
    assignedTo(); 
    contactsBox.style.display = 'block';
  } else {
    contactsBox.style.display = 'none'; 
  }
}

// This function toggles the selection of a contact when the surrounding div is clicked.
function toggleContactSelection(initials, bgColor, name, checkboxId, event) {
  event.stopPropagation();
  const checkbox = document.getElementById(checkboxId);
  if (!checkbox) return;
  checkbox.checked = !checkbox.checked;
  updateSelectedContacts(initials, bgColor, name, checkbox);
}

function closeContactsBoxOnClickOutside(event) {
  let contactsBox = document.getElementById('contactsBox');
  if (event.target.closest('#contactsBox') === null) {
    contactsBox.style.display = 'none';
    document.removeEventListener('click', closeContactsBoxOnClickOutside);
  }

}

/**
 * Asynchronously loads contacts from web storage and displays them in the contacts box.
 */
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

/**
 * Updates the selected contacts based on user interaction with the contact list checkboxes.
 * @param {string} initials - The initials of the contact.
 * @param {string} bgColor - The background color associated with the contact.
 * @param {string} name - The name of the contact.
 * @param {HTMLInputElement} checkbox - The checkbox element that triggered the update.
 */
function updateSelectedContacts(initials, bgColor, name, checkbox) {
  let contactExistsIndex = selectedContactDetails.findIndex(c => c.name === name && c.bgColor === bgColor);
  if (checkbox.checked && contactExistsIndex === -1) {
    selectedContactDetails.push({
      name: name,
      bgColor: bgColor,
      initials: initials
    });
  } else if (!checkbox.checked && contactExistsIndex !== -1) {
    selectedContactDetails.splice(contactExistsIndex, 1);
  }
  renderSelectedContacts();
}

/**
 * Generates initials from a given name.
 * @param {string} name - The name to generate initials from.
 */
function getInitials(name) {
  let names = name.split(' ').filter(n => n !== ''); // Filter leere Zeichenfolgen heraus
  console.log(names);
  let initials = names.map(name => name[0].toUpperCase());
  return initials.length > 1 ? initials.join('') : initials[0];
}


function renderSelectedContacts() {
  let renderSelectedContacts = document.getElementById('renderSelectedContacts');
  renderSelectedContacts.innerHTML = ''; 

  if (selectedContactDetails && selectedContactDetails.length >= 0) {
    for (let i = 0; i < selectedContactDetails.length; i++) {
      const contact = selectedContactDetails[i];
      renderSelectedContacts.innerHTML += `
      <div class="renderSelectedContactdetails" style="background-color: ${contact.bgColor};"> ${getInitials(contact.name)}</div>`;
    }
  }
}

/**
 * Updates the task priority based on user selection and applies an active style to the selected priority button.
 * @param {number} buttonId - The ID of the selected priority button.
 * @param {Event} event - The event triggered by clicking the priority button.
 */
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

/**
 * Toggles the display of the category selection box, showing it if hidden and hiding it if shown.
 */
function toggleCategories(event) {
  event.stopPropagation();
  let categoryBox = document.getElementById('categoryBox');
  if (categoryBox.style.display === 'none' || categoryBox.innerHTML.trim() === '') {
    addCategory();
    categoryBox.style.display = 'block';
  } else {
    categoryBox.style.display = 'none'; 
  }
}

/**
 * Toggles the display selection box,on hiding it if shown.
 */
function dropDownOpen() {
  let contactsBox = document.getElementById('contactsBox');
  let categoryBox = document.getElementById('categoryBox');

  if (contactsBox && (contactsBox.style.display === 'block')) {
    contactsBox.style.display = 'none';
  }

  if (categoryBox && (categoryBox.style.display === 'block')) {
    categoryBox.style.display = 'none';
  }
}

function stopPropagation(event) {
  event.stopPropagation();
}

/**
 * Populates the category selection box with available categories.
 */
function addCategory() {
  let categoryBox = document.getElementById('categoryBox');
  categoryBox.innerHTML = '';
  categoryBox.innerHTML += addCategoryHTML();
}

/**
 * Updates the task category selection based on user input, ensuring only one category is selected at a time.
 * @param {string} categoryId - The ID of the category checkbox element.
 */
function toggleCategorySelection(categoryId) {
  const checkbox = document.getElementById(categoryId);
  if (!checkbox) return;
  checkbox.checked = !checkbox.checked;
  updateLabels(categoryId);
  event.stopPropagation();
}


/**
 * Updates the task category selection based on user input, ensuring only one category is selected at a time.
 * @param {string} categoryId - The ID of the category checkbox element.
 */

function updateLabels(categoryId) {
  let checkbox = document.getElementById(categoryId);
  let categoryText = document.getElementById(categoryId.replace('Checkbox', '')).innerText;
  let selectTaskCategory = document.getElementById('selectTaskCategory');

  if (checkbox.checked) {
    categoryArray = [categoryText]; 
    selectTaskCategory.innerText = categoryText;
  } else {
    categoryArray = [];
    selectTaskCategory.innerText = 'Select task category';
  }
  document.querySelectorAll('input[type="checkbox"]').forEach(otherCheckbox => {
    if (otherCheckbox.id !== categoryId) {
      otherCheckbox.checked = false;
    }
  });
}

/**
 * Adds a subtask to the subtasksArray if the input value is not empty, then displays the updated list of subtasks.
 */
function addSubTask() {
  let subTaskInput = document.getElementById('addSubTasks');
  if (subTaskInput.value.trim() !== '') {
    let newSubID = Date.now();
    
    subtasksArray.push({
      name: subTaskInput.value.trim(),
      done: false,
      subID: newSubID,
      taskID: getNextTaskId(),
    });
    subTaskInput.value = '';
    displaySubtasks();
  }
}

/**
 * Displays the list of subtasks in the subTasksBox element, allowing for editing and deletion of each subtask.
 */
function displaySubtasks() {
  let subTasksBox = document.getElementById('subTasksBox');
  subTasksBox.innerHTML = '';
  for (let i = 0; i < subtasksArray.length; i++) {
    const subtask = subtasksArray[i];
    subTasksBox.innerHTML += displaySubtasksHTML(subtask, i);
  }
}

/**
 * Opens the edit interface for a specified subtask, allowing the user to modify its name.
 * @param {number} index - The index of the subtask in the subtasksArray to be edited.
 */
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

/**
 * Deletes a subtask from the subtasksArray and updates the displayed list of subtasks.
 * @param {number} index - The index of the subtask to be deleted.
 */
function closeEditSubTask(subID, taskID){
  let subEdit = document.getElementById('editSubTaskContainer');
  subEdit.innerHTML = '';
  
}

/**
 * Loads contacts from web storage and updates the contacts object.
 */
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
        let subtaskID = subtasksArray[i]['subID'];
        let taskID = subtasksArray[i]['taskID'];
        subTasksBox.innerHTML += saveEditeSubTaskHTML(subtask, taskID, subtaskID,i);
      }
    }
  }
}

/**
 * Resets the task form to its default state, clearing all input fields, selections, and temporary data arrays.
 */
function deleteSubTask(subtaskID,taskID) {
  let index = subtasksArray.findIndex(task => task.subID === subtaskID);
  
      subtasksArray.splice(index, 1);
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
  document.getElementById("requiredMessageDate").innerHTML = "";
  document.getElementById("requiredMessageDescription").innerHTML = "";
  document.getElementById("requiredMessageTitle").innerHTML = "";
  document.getElementById("requiredMessageCategory").innerHTML = "";
}

/**
 * Validates the new task's details (title, description, date, and category) before proceeding with form submission.
 * Displays appropriate messages if validation fails.
 * @param {Event} event - The event triggered by the form submission attempt.
 */
async function checkNewTasks(event) {
  event.preventDefault();
  let newTitle = document.getElementById('enterTitle').value;
  let newDescription = document.getElementById('enterDescription').value;
  let newDate = document.getElementById('enterDate').value;
  let newCategory = categoryArray;
  
  let isTitleValid = true;
  let isDescriptionValid = true;
  let isDateValid = true;
  
  ifCheckTasks(isTitleValid,isDescriptionValid,isDateValid,newTitle,newDescription,newDate,event,newCategory);
  // createTask(event);
}

/**
 * Performs further actions based on the validity of task details. 
 * This function is structured to potentially include more complex validation or additional actions based on the task details' validity.
 * @param {boolean} isTitleValid - Indicates if the title field has passed validation.
 * @param {boolean} isDescriptionValid - Indicates if the description field has passed validation.
 * @param {boolean} isDateValid - Indicates if the date field has passed validation.
 * @param {string} newTitle - The new task's title.
 * @param {string} newDescription - The new task's description.
 * @param {string} newDate - The new task's due date.
 * @param {Event} event - The event associated with form submission or validation.
 * @param {Array} newCategory - The selected category for the new task.
 */
function ifCheckTasks(isTitleValid,isDescriptionValid,isDateValid,newTitle,newDescription,newDate,event,newCategory) {
  if (newTitle === '') {
    document.getElementById('requiredMessageTitle').innerHTML = `<span class="requiredField">This fiels is required</span>`;
    isTitleValid = false;
  } else {
    document.getElementById('requiredMessageTitle').innerHTML = '';
  }
  if (newDescription === '') {
    document.getElementById('requiredMessageDescription').innerHTML = `<span class="requiredField">This fiels is required</span>`;
    isDescriptionValid = false;
  } else {
    document.getElementById('requiredMessageDescription').innerHTML = '';
  }
  if (newDate === '') {
    document.getElementById('requiredMessageDate').innerHTML = `<span class="requiredField">This fiels is required</span>`;
    isDateValid = false;} else {
    document.getElementById('requiredMessageDate').innerHTML = '';}
  if (newCategory.length < 1) {
    document.getElementById('requiredMessageCategory').innerHTML = `<span class="requiredField">This fiels is required</span>`;
  } else {
    document.getElementById('requiredMessageCategory').innerHTML = '';
  }
  if (isTitleValid && isDescriptionValid && isDateValid && newCategory.length >= 1) {
    
    activForm(event);
  }
}