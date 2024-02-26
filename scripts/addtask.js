let IdCounter;
let subtasksArray =[];
let categoryArray =[];
let prioArray = [];
let editingSubtaskIndex = -1;
let selectedCategoryId = null;
let selectedContactDetails = [];
let newcategoryTask = [];

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
  console.log(newCategoryTask);
  return newCategoryTask[0];
}


function initializeUserTasks() {
  if (!tasks[userID]) {
    tasks[userID] = [];
  }
}


function createNewTaskObject(newCategory) {
  let headline = document.getElementById("enterTitle").value;
  let text = document.getElementById("enterDescription").value;
  let date = document.getElementById("enterDate").value;
  
  return {
    id: tasks[userID].length,
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
  console.log(tasks);
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
  if (contactsBox.style.display === 'none' || contactsBox.innerHTML.trim() === '') {
    assignedTo(); 
    contactsBox.style.display = 'block';
  } else {
    contactsBox.style.display = 'none';
  }
}


async function assignedTo() {
  await load_contacts_from_webstorage();

  let contactsBox = document.getElementById('contactsBox');
  contactsBox.innerHTML = '';

  for (let i = 0; i < contacts[userID].length; i++) {
    let contact = contacts[userID][i];
    let initials = getInitials(contact.name);

    contactsBox.innerHTML += assignedToHTML(contact,initials);
  }
}



function updateSelectedContacts(initials, bgColor, name, checkbox) {
  if (checkbox.checked) {
    selectedContactDetails.push({
      name: name,
      bgColor: bgColor,
      initials: initials
    });
  } else {
    let index = selectedContactDetails.indexOf(initials, bgColor, name);
      selectedContactDetails.splice(index, 1);
  }
}


function getInitials(name) {
  let names = name.split(' ');
  let initials = names.map(name => name[0].toUpperCase());
  return initials.join('');
}


function updatePrio(buttonId, event) {
  event.preventDefault();
  let selectedPrio2 = document.getElementById('btnUrgent');
  let selectedPrio1 = document.getElementById('btnMedium');
  let selectedPrio0 = document.getElementById('btnLow');
    prioArray = buttonId;
  if(buttonId === 0){
    selectedPrio2.classList.add('activePrio0');
    selectedPrio1.classList.remove('activePrio1');
    selectedPrio0.classList.remove('activePrio2');
  }else if (buttonId === 1) {
    selectedPrio2.classList.remove('activePrio0');
    selectedPrio1.classList.add('activePrio1');
    selectedPrio0.classList.remove('activePrio2');
  } else if (buttonId === 2) {
    selectedPrio2.classList.remove('activePrio0');
    selectedPrio1.classList.remove('activePrio1');
    selectedPrio0.classList.add('activePrio2');
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