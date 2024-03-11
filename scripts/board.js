let cards = {};
let currentDraggedElement;
let currentChecktContact = [];
let user = [];
let categorys = [];
let subtasksArrayEditTask = [];

/**
 * Initializes the board by rendering tasks and updating the HTML layout.
 * This function should be called when the page is loaded or when the tasks need to be refreshed.
 */
async function initBoard(){  
    cards = await loadTasks(userID);
    render();
    updateHTML();
}

/**
 * Updates the HTML layout of the board by categorizing and displaying tasks.
 * This function asynchronously loads tasks for a user and updates each category section on the page.
 */
async function updateHTML() {
    
    const categories = ['todo', 'progress', 'feedback', 'done'];
    for (const category of categories) {
        let categoryElements = cards.filter(t => t['category'] === category);
        document.getElementById(category).innerHTML = '';
        for (let i = 0; i < categoryElements.length; i++) {
            let element = categoryElements[i];
            document.getElementById(category).innerHTML += generateCardHTML(element);
            userTags(element);
            updateProgressBar(element);        
            assignIcon(element);  
        }
    }
    emptyCategory();
}

/**
 * Sets the current element being dragged to the specified card ID.
 * This function is triggered when a drag operation begins on a task card.
 * @param {number} id - The ID of the card being dragged.
 */
function startDragging(id) {
    currentDraggedElement = cards.find(card => card.id === id);
}

/**
 * Allows a drop operation to occur on a drag target by preventing the default handling of the event.
 * This is typically used in conjunction with drag events to enable dropping on specific elements.
 * @param {Event} ev - The dragover event.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Moves the currently dragged card to a specified category.
 * After moving the card, this function updates the task list and visual layout.
 * @param {string} category - The category to move the card to.
 */
async function moveTo(category) {
        currentDraggedElement.category = category;
        await setItem('tasks', tasks)    
        updateHTML();
        removeHighlight(category);
}

/**
 * Applies a visual highlight to an element, indicating it is a valid drop target during a drag operation.
 * @param {string} id - The ID of the element to be highlighted.
 */
function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

/**
 * Removes the visual highlight from an element, used when a drag operation is complete or leaves the element.
 * @param {string} id - The ID of the element to remove the highlight from.
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
    document.getElementById(id).style.backgroundColor = '';
}

/**
 * Filters tasks displayed on the board based on a user's search input.
 * This function dynamically updates the task display as the user types, showing only tasks that match the search criteria.
 */
function search() {
    let search = document.getElementById('search').value.toLowerCase();
    let cardTodo = document.getElementById('todo');
    let cardProgress = document.getElementById('progress');
    let cardFeedback = document.getElementById('feedback');
    let cardDone = document.getElementById('done');

    updateCategory(cardTodo, 'todo', search);
    updateCategory(cardProgress, 'progress', search);
    updateCategory(cardFeedback, 'feedback', search);
    updateCategory(cardDone, 'done', search);
}

/**
 * Updates the display of tasks within a specific category based on a search query.
 * Only tasks that match the search criteria within the specified category are displayed.
 * @param {HTMLElement} card - The card element to update.
 * @param {string} category - The category of tasks to be filtered.
 * @param {string} search - The search query used for filtering tasks.
 */
function updateCategory(card, category, search) {
    card.innerHTML = '';
    for (let i = 0; i < cards.length; i++) {
        const element = cards[i];
        if (element['category'] === category && 
            (element['headline'].toLowerCase().includes(search) || 
             element['text'].toLowerCase().includes(search) || 
             search === '')) {
            card.innerHTML += generateCardHTML(element); 
            userTags(element);          
        }       
    }
    emptyCategory();
}

/**
 * Fills categories with a message indicating no tasks are present if they are empty.
 * This provides visual feedback to users that a category contains no tasks.
 */
function emptyCategory() {
    let emptytodo = document.getElementById('todo');
    let emptyprogress = document.getElementById('progress');
    let emptyfeedback = document.getElementById('feedback');
    let emptydone = document.getElementById('done');

    if(emptytodo.innerHTML === "") {
        emptytodo.innerHTML += `
                <div class="emptyContainer">
                    <div class="empty">
                        <span>No task To do</span>
                    </div>
                </div>`;
    }
    if(emptyprogress.innerHTML === "") {
        emptyprogress.innerHTML += `
                <div class="emptyContainer">
                    <div class="empty">
                        <span>No task Progress</span>
                    </div>
                </div>`;
    }
    if(emptyfeedback.innerHTML === "") {
        emptyfeedback.innerHTML += `
                <div class="emptyContainer">
                    <div class="empty">
                        <span>No task Feedback</span>
                    </div>
                </div>`;
    }
    if(emptydone.innerHTML === "") {
        emptydone.innerHTML += `
                <div class="emptyContainer">
                    <div class="empty">
                        <span>No task Done</span>
                    </div>
                </div>`;
    }
}

/**
 * Opens an overlay or modal with detailed information about a specific task.
 * This function is triggered when a user interacts with a task card intending to view more details.
 * @param {number} i - The index or identifier for the task.
 * @param {string} elementData - Encoded data representing the task details.
 */
function openOverview(i, elementData) {
    let infoArrayCard = cards.find(task => {
        return task.id == i;
    });

    let element = JSON.parse(decodeURIComponent(elementData));
    let removeClass = document.getElementById('overlay');
    removeClass.innerHTML = '';
    removeClass.innerHTML = generateOverviewHTML(infoArrayCard);
    removeClass.classList.remove('d-none');
    subtaskLoad(i);
    assignedToEdit(infoArrayCard, i);
    userTagsOver(element);
}

/**
 * Closes the detailed information overlay or modal, returning the user to the main board view.
 */
function closeOverview() {
    let overviewElement = document.getElementById('overlay');
    overviewElement.classList.add('d-none');
}

/**
 * Updates the displayed count of completed versus total subtasks for a given task.
 * This visual indicator helps users track progress on composite tasks.
 * @param {Object} element - The task element containing subtasks.
 */
function subtasksCheck(element) {
    let id = element.id;
    let subtasks = element.subtasks ? element.subtasks.length : 0;
    let trueCount = 0;
    for (let i = 0; i < subtasks; i++) {           
        if(element.subtasks[i].done === true){
            trueCount++;       
        }
    } 
    let subtaskHTMLCount = document.getElementById(`subtaskBar${id}`);
    subtaskHTMLCount.innerHTML = `<span>${trueCount}/${subtasks} Subtasks</span>`;
}

/**
 * Populates the subtask list for a given task, marking each as complete or incomplete based on their status.
 * This function is used when viewing detailed information about a task.
 * @param {number} id - The ID of the task whose subtasks are being loaded.
 */
function subtaskLoad(id) {
    let card = cards.find(card => card.id === id);
    if (card && Array.isArray(card.subtasks) && card.subtasks.length > 0) {
        for (let i = 0; i < card.subtasks.length; i++) {
            const specificSubtask = card.subtasks[i].name;
            const isDone = card.subtasks[i].done;
        let subtaskHTML = document.getElementById('unorderedListOfSubtask');
            subtaskHTML.innerHTML += `<li><input type="checkbox" id="check${i}" ${isDone ? 'checked' : ''} onclick="subtasksCheckForTrue(${id}, ${i})">${specificSubtask}</li>`;
    }}
}

/**
 * Marks a subtask as complete or incomplete and updates the display to reflect this change.
 * This function is called when a user interacts with a subtask checkbox.
 * @param {number} cardId - The ID of the task containing the subtask.
 * @param {number} subtaskID - The index of the subtask within the task.
 */
function subtasksCheckForTrue(cardId, subtaskID) {
    let checkbox = document.getElementById(`check${subtaskID}`).checked;
    let card = cards.find(card => card.id === cardId);

    if(checkbox === true) {
        card.subtasks[subtaskID].done = true;
    }else if(checkbox === false) {
        card.subtasks[subtaskID].done = false;}

    subtasksCheck(card);
    updateProgressBar(card);
}

function isSubTaskTrue(card) {
   
    if (card.subtasks.length > 0) {
        document.getElementById('isSubTaskTrue').innerHTML = `
        <div class="progress-container">
        <div class="progress-bar" id="progressBarId${card['id']}">
        
        </div>
        </div>
        <div id="subtaskBar${card['id']}">
        `;
    }
}

/**
 * Dynamically updates a progress bar for a task based on the completion status of its subtasks.
 * This provides a visual representation of overall task progress.
 * @param {Object} element - The task element whose progress bar should be updated.
 */
function updateProgressBar(element) {
    if (Array.isArray(element.subtasks) && element.subtasks.length > 0) {
        let currentProgress = element.subtasks.filter(subtask => subtask.done).length;
        let percent = Math.round((currentProgress / element.subtasks.length) * 100);

        let progressBarContainer = document.getElementById(`progressBarId${element.id}`);
        if (!progressBarContainer) {
            let container = document.getElementById('isSubTaskTrue');
            container.innerHTML = `
            <div class="progress-container">
                <div class="progress-bar" id="progressBarId${element.id}" style="width: ${percent}%"></div>
            </div>
            <div id="subtaskBar${element.id}"><span>${currentProgress}/${element.subtasks.length} Subtasks</span></div>
            `;
        } else {
            progressBarContainer.style.width = `${percent}%`;
            let subtaskHTMLCount = document.getElementById(`subtaskBar${element.id}`);
            subtaskHTMLCount.innerHTML = `<span>${currentProgress}/${element.subtasks.length} Subtasks</span>`;
        }
    }
}

/**
 * Opens a modal or overlay for editing the details of a task.
 * Users can modify the title, description, and other properties of the task.
 * @param {number} cardId - The ID of the task being edited.
 */
function editCard(cardId) {
    let infoArrayCard = cards.find(card => card.id === cardId);
    currentDraggedElement = cards.find(card => card.id === cardId);
    let overlay = document.getElementById('overlay');
    overlay.innerHTML = '';
    overlay.innerHTML = overviewEditHTML(cardId);
    overlay.classList.remove('d-none');

    let title = document.getElementById('editTitle');
    let textarea = document.getElementById('editTextarea');
    let data = document.getElementById('editDate');

    title.value = infoArrayCard['headline'];  
    textarea.value = infoArrayCard['text']; 
    data.value = infoArrayCard['date']; 
    addSubTaskEdit(cardId);
    prioEdit(infoArrayCard['priority'], cardId, event);
    editSubTaskContainerInBoard(cardId,event);
    renderSubtasksInEditPopup(infoArrayCard);
}

/**
 * Processes the form submission for editing a task, saving the changes.
 * This function is called when a user submits the task edit form.
 * @param {Event} event - The form submission event.
 * @param {number} cardId - The ID of the task being edited.
 */
async function CardEditForm(event,cardId) {
    event.stopPropagation();
    event.preventDefault();
    let infoArrayCard = cards.find(card => card.id === cardId);
    let titleEdit = document.getElementById('editTitle').value;
    let textareaEdit = document.getElementById('editTextarea').value;
    let dateEdit = document.getElementById('editDate').value;

    infoArrayCard.headline = titleEdit;
    infoArrayCard.text = textareaEdit;
    infoArrayCard.date = dateEdit;
    await setItem('tasks', tasks)
    
    closeOverview();
    updateHTML(); 
   
}

/**
 * Rendert die Subtasks im Bearbeitungspopup ("Edit") für eine bestimmte Karte.
 * @param {Object} card - Die Karte, für die die Subtasks gerendert werden sollen.
 */
function renderSubtasksInEditPopup(card) {
    let editSubTasksBox = document.getElementById('subTasksBox');
    editSubTasksBox.innerHTML = ''; 

    if (card.subtasks && Array.isArray(card.subtasks) && card.subtasks.length > 0) {
        card.subtasks.forEach((subtask, index) => {
            let subtaskHTML = displaySubtasksHTML(subtask, index);
            editSubTasksBox.innerHTML += subtaskHTML;
        });
    } else {
        editSubTasksBox.innerHTML = '<p>No subtasks found for this task.</p>';
    }
}

/**
 * Deletes a specified task from the board and updates the layout to reflect the change.
 * This function is called when a user decides to remove a task.
 * @param {number} id - The ID of the task to delete.
 */
async function deleteCard(id) {
    let index = cards.findIndex((card) => card.id === id);
    if (index !== -1) {
        cards.splice(index, 1);
        await setItem('tasks', tasks);
        updateHTML();
        closeOverview();
    }
}

/**
 * Updates the priority of a task based on user selection in the edit form.
 * This adjusts the visual priority indicator on the task card.
 * @param {number} prioID - The priority level selected by the user.
 * @param {number} cardId - The ID of the task being edited.
 * @param {Event} event - The event associated with the priority change.
 */
function prioEdit(prioID,cardId,event){
    event.preventDefault()

    let card = cards.find(card => card.id === cardId)
    card.priority = prioID
    
    let selectedPrio0 = document.getElementById('btnUrgent');
    let selectedPrio1 = document.getElementById('btnMedium');
    let selectedPrio2 = document.getElementById('btnLow');
      prioArray = prioID;
    if(prioArray === 2){
    selectedPrio2.classList.add('activePrio2');
    selectedPrio1.classList.remove('activePrio1');
    selectedPrio0.classList.remove('activePrio0');
  }else if (prioArray === 1) {
    selectedPrio2.classList.remove('activePrio2');
    selectedPrio1.classList.add('activePrio1');
    selectedPrio0.classList.remove('activePrio0');
  } else if (prioArray === 0) {
    selectedPrio2.classList.remove('activePrio2');
    selectedPrio1.classList.remove('activePrio1');
    selectedPrio0.classList.add('activePrio0');
  } 
}
    
/**
 * Updates the assigned user display in the task editing overlay, showing who is currently assigned to the task.
 * @param {Object} element - The task element being edited.
 * @param {number} b - A parameter or identifier associated with the task.
 */
function assignedToEdit(element, b) {
    let assignProfil = document.getElementById(`assignedProfileName${b}`);
        assignProfil.innerHTML = '';

    for (let i = 0; i < element['user'].length; i++) {
        let userInitials = element['user'][i];
        assignProfil.innerHTML +=`
        <div class="profileName">
            <div class="assignedLetters" style="background-color: ${userInitials['bgColor']}">${userInitials['initials']}</div>
            <span>${userInitials['name']}</span>
        </div>`;
    }
    assignIcon(element);
}

/**
 * Updates the assigned user icons displayed on the task card on the main board.
 * This visual cue indicates which users are associated with a task.
 * @param {Object} element - The task element to update.
 */
function assignIcon(element) {
    let assignIcon = document.getElementById(`iconProfile${element['id']}`);
    assignIcon.innerHTML = '';

    for (let i = 0; i < element['user'].length; i++) {
        let icon = element['user'][i];
        assignIcon.innerHTML +=`
        <div class="imgProfile">
            <div class="assignedLetters" style="background-color: ${icon['bgColor']}">${icon['initials']}</div>
        </div>`;
    }
}

/**
 * Toggles the display of an assigned user selection interface for a task on the board.
 * This allows users to assign or unassign other users to a task directly from the board.
 * @param {number} i - The index or identifier of the task.
 */
function toggleAssignedToBoard(i, event) {
    event.stopPropagation();
    let contactsBox = document.getElementById('contactsBox');
    if (contactsBox.style.display === 'none' || contactsBox.innerHTML.trim() === '') {
      assignedToBoard(i);
      contactsBox.style.display = 'block';
    } else {
      contactsBox.style.display = 'none'; 
    }
  }
  
/**
 * Populates and displays the assigned user selection interface for a task, allowing users to be assigned to the task.
 * @param {number} cardId - The ID of the task for which users are being assigned.
 */
  async function assignedToBoard(cardId) {
    await load_contacts_from_webstorage();
    let contactsBox = document.getElementById('contactsBox');
    contactsBox.innerHTML = '';
    let users = contacts[userID];
    let card = cards.find(card => card.id === cardId);

    if (!card) {
        return; 
    }
    let assignedContacts = card.user || [];
    let uniqueUsers = {};
    for (let j = 0; j < users.length; j++) {
        let user = users[j];
        let key = user['name'] + user['bgColor'];

        if (!uniqueUsers[key]) {
            let isChecked = assignedContacts.some(assignedUser => assignedUser.name === user.name && assignedUser.bgColor === user.bgColor) ? 'checked' : '';
            contactsBox.innerHTML += assignedToBoardHTML(user, isChecked, cardId);
            uniqueUsers[key] = true;
        }
    }
    
}


/**
 * Updates the list of selected contacts for a task based on user interactions in the assigned user interface.
 * @param {string} initials - The initials of the user being selected or deselected.
 * @param {string} bgColor - The background color associated with the user.
 * @param {string} name - The name of the user.
 * @param {number} id - The ID of the task being updated.
 * @param {HTMLInputElement} checkbox - The checkbox input indicating whether the user is selected.
 */
  function updateSelectedContactsBoard(initials, bgColor, name, id, checkbox) {
    let key = name + bgColor; 
    if (checkbox.checked) {
        let isContactAlreadyAdded = currentChecktContact.some(contact => contact.name + contact.bgColor === key);
        if (!isContactAlreadyAdded) {
            currentChecktContact.push({
                name: name,
                bgColor: bgColor,
                initials: initials
            });
        }
    }else {  
        currentChecktContact = currentChecktContact.filter(contact => !(contact.name === name && contact.bgColor === bgColor));
    }
    updateAssignedUsersInCard(id);
  }

 /**
 * Saves the updated list of assigned users to a task and refreshes the task's display on the board.
 * @param {number} id - The ID of the task for which assigned users are being updated.
 */ 
async function updateAssignedUsersInCard(id) {
    let cardIndex = cards.findIndex(card => card.id === Number(id));
    if (cardIndex !== -1) {

        cards[cardIndex].user = currentChecktContact;
        await setItem('tasks', cards);
        assignIcon(cards[cardIndex]);   
    }
}

/**
 * Opens an overlay or modal for adding a new task, pre-selecting a specified category.
 * @param {string} category - The category to pre-select for the new task.
 */
async function addTaskHTMLOpen(category) {
    categorys.push(category);
    let openAddTask = document.getElementById('overlay');
    if (!openAddTask) {
        return;
    }

    openAddTask.innerHTML = '';
    openAddTask.innerHTML = addTaskHTML();
    openAddTask.classList.remove('d-none');
    await setItem('newcategory', categorys); 
    categorys = [];
    updateHTML();
}


/**
 * Closes the add task overlay or modal, discarding any input and returning to the board view.
 */
function addTaskHTMLClose() {
    let openAddTask = document.getElementById('overlay');
    openAddTask.innerHTML = '';
    openAddTask.classList.add('d-none');
}

/**
 * Updates the display of user tags (e.g., "User Story", "Technical Task") for a task based on its label.
 * This function adjusts the visual styling of the task card to reflect the type of task.
 * @param {Object} element - The task element to update with user tags.
 */
function userTags(element) {
    let elementID = element['id'];
    let labelsID = 'labelsBoard'+elementID;
    let labelID = cards.find(card => card.id === elementID);
    let userLabel = labelID['label'];
    let tagName = 'User Story';
    if (userLabel[0] === tagName) {
        let userLabelStory = document.getElementById(labelsID);
        userLabelStory.classList.add('userStory');
    }else {
        let userLabelStory = document.getElementById(labelsID);
        userLabelStory.classList.add('technicalTask');
    }
}

/**
 * Specifically updates the display of user tags for a task in the overview or detail view, based on its label.
 * This adjusts the visual styling similar to `userTags`, but is intended for use in detailed task views.
 * @param {Object} element - The task element in the detail view to update with user tags.
 */
function userTagsOver(element) {
    let elementID = element['id'];
    let labelsID = 'labelsBoardOver' + elementID;
    let labelID = cards.find(card => card.id === elementID);
    let userLabel = labelID['label'];
    let tagName = 'User Story';
    if (userLabel[0] === tagName) {
        let userLabelStory = document.getElementById(labelsID);
        userLabelStory.classList.add('userStory');
    }else {
        let userLabelStory = document.getElementById(labelsID);
        userLabelStory.classList.add('technicalTask');
    }
}


function mobileCategory(event, id) {
    event.stopPropagation();
    let openCategory = document.getElementById(`categoryOpenMobile${id}`);

    if (openCategory.style.display === 'none') {        
        openCategory.style.display = 'block';
        openCategory.innerHTML = mobileCategoryHTML(id);
    }else {
        openCategory.style.display = 'none'; 
    }
}

async function newCategoryHTMLOpen(categorys,event,id) {
    event.stopPropagation();
    currentDraggedElement = cards.find(card => card.id === id);
    currentDraggedElement.category = categorys;
        await setItem('tasks', tasks);
        updateHTML();
}

function editSubTaskContainerInBoard(cardId,event) {
    event.stopPropagation();
    let card = cards.find(card => card.id === cardId);
    console.log(card);
    let editSubTaskBorad = document.getElementById('subtasksContainerEdit');
    editSubTaskBorad.innerHTML = editSubTaskContainerInBoardHTML(cardId);
}
function addSubTaskEdit(id) {
    let subEdit = cards.find(card => card.id === id);
    if (subEdit && subEdit.subtasks && subEdit.subtasks.length > 0) {
        for (let i = 0; i < subEdit.subtasks.length; i++) {
            let currentSub = subEdit.subtasks[i];
            let currentID = currentSub['subID'];
            console.log(currentID);
            console.log(currentSub);
            document.getElementById('subtasksContainerEdit').innerHTML += `
            <div class="subTasksIconsContainer">
                <div id="subTaskText" class="subTaskText">
                    <li>${currentSub.name}</li>
                </div>
                <div class="subTaskIconsBox">
                    <img onclick="editSubTask(${i}, ${currentID})" class="subTaskIcon" src="/assets/img/pencel.jpg" alt="">
                    <img onclick="deleteSubTask(${i}, ${currentID})" class="subTaskIcon" src="/assets/img/trash.jpg" alt="">
                </div>
            </div>
            `;
        }
    } else {
        document.getElementById('subtasksContainerEdit').innerHTML = '<p>No subtasks found for this task.</p>';
    }
}


  function editSubTaskContainerInBoardHTML(cardId) {

    return`                
    <p class="title">Subtasks</p>
    <div class="addNewSubtask">
        <div class="addNewSubtasksContainer">
        <input id="addSubTasks" type="text" class="subtaskText" placeholder="Add new subtask">
        <svg id="addNewSubtask" onclick ="addSubTaskNewTask(${cardId})"class="subtaskSVG"width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_123060_1727" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
            <rect x="0.248535" width="24" height="24" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_123060_1727)">
            <path d="M11.2485 13H6.24854C5.9652 13 5.7277 12.9042 5.53604 12.7125C5.34437 12.5208 5.24854 12.2833 5.24854 12C5.24854 11.7167 5.34437 11.4792 5.53604 11.2875C5.7277 11.0958 5.9652 11 6.24854 11H11.2485V6C11.2485 5.71667 11.3444 5.47917 11.536 5.2875C11.7277 5.09583 11.9652 5 12.2485 5C12.5319 5 12.7694 5.09583 12.961 5.2875C13.1527 5.47917 13.2485 5.71667 13.2485 6V11H18.2485C18.5319 11 18.7694 11.0958 18.961 11.2875C19.1527 11.4792 19.2485 11.7167 19.2485 12C19.2485 12.2833 19.1527 12.5208 18.961 12.7125C18.7694 12.9042 18.5319 13 18.2485 13H13.2485V18C13.2485 18.2833 13.1527 18.5208 12.961 18.7125C12.7694 18.9042 12.5319 19 12.2485 19C11.9652 19 11.7277 18.9042 11.536 18.7125C11.3444 18.5208 11.2485 18.2833 11.2485 18V13Z" fill="#2A3647"/>
            </g>
            </svg>
        </div>
            
    </div>
    <div id="subTasksBox"class="addSubTasksBox"></div>
    <div id="editSubTasksBox" class="editSubTasksBox"></div>                   
    `;
}

/**
 * Deletes a specific subtask from the task being edited and updates the display.
 * This function is triggered when a user clicks the trash icon next to a subtask in the edit popup.
 * @param {number} subtaskIndex - The index of the subtask to delete.
 */
function deleteSubTask(subtaskIndex) {
    let subtasksContainer = document.getElementById('subtasksContainerEdit');
    let subtaskElements = subtasksContainer.querySelectorAll('.subTasksIconsContainer');
    let subtaskToDelete = subtaskElements[subtaskIndex];
    subtaskToDelete.remove();
    if (currentDraggedElement.subtasks && currentDraggedElement.subtasks.length > subtaskIndex) {
        currentDraggedElement.subtasks.splice(subtaskIndex, 1);
    }
}


function editSubTask(subtaskIndex, id) {
    console.log(id);
    let subtasksContainer = document.getElementById('subtasksContainerEdit');
    let subtaskElements = subtasksContainer.querySelectorAll('.subTasksIconsContainer');
    let subtaskToEdit = subtaskElements[subtaskIndex];
    let subtaskText = subtaskToEdit.querySelector('.subTaskText').innerText;
    
    let editSubTaskBox = document.getElementById('editSubTasksBox');
    editSubTaskBox.innerHTML = '';
    editSubTaskBox.innerHTML = `
    <div id="editSubTaskContainer"class="editSubTaskContainer">
    <input id="editSubTaskInput" class="editSubTasksInput" type="text" value="${subtaskText}">
    <div class="editSubTasksIcons">
    <svg onclick="closeEditSubTask(${subtaskIndex}, ${id})" class="editSubTasksClose"width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_117793_4210" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="24" height="24">
  <rect x="4" y="4" width="24" height="24" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_117793_4210)">
  <path d="M16 17.4L11.1 22.3C10.9167 22.4834 10.6833 22.575 10.4 22.575C10.1167 22.575 9.88332 22.4834 9.69999 22.3C9.51665 22.1167 9.42499 21.8834 9.42499 21.6C9.42499 21.3167 9.51665 21.0834 9.69999 20.9L14.6 16L9.69999 11.1C9.51665 10.9167 9.42499 10.6834 9.42499 10.4C9.42499 10.1167 9.51665 9.88338 9.69999 9.70005C9.88332 9.51672 10.1167 9.42505 10.4 9.42505C10.6833 9.42505 10.9167 9.51672 11.1 9.70005L16 14.6L20.9 9.70005C21.0833 9.51672 21.3167 9.42505 21.6 9.42505C21.8833 9.42505 22.1167 9.51672 22.3 9.70005C22.4833 9.88338 22.575 10.1167 22.575 10.4C22.575 10.6834 22.4833 10.9167 22.3 11.1L17.4 16L22.3 20.9C22.4833 21.0834 22.575 21.3167 22.575 21.6C22.575 21.8834 22.4833 22.1167 22.3 22.3C22.1167 22.4834 21.8833 22.575 21.6 22.575C21.3167 22.575 21.0833 22.4834 20.9 22.3L16 17.4Z" fill="#2A3647"/>
  </g>
  </svg>
    <svg onclick="saveEditeSubTask(${subtaskIndex}, ${id})" class="editsubTasksSVG" width="24" height="24" viewBox="0 0 24 25" fill="#000000" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_131179_1277" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
  <rect y="0.5" width="24" height="24" fill="#000000"/>
  </mask>
  <g mask="url(#mask0_131179_1277)">
  <path d="M9.55057 15.65L18.0256 7.175C18.2256 6.975 18.4631 6.875 18.7381 6.875C19.0131 6.875 19.2506 6.975 19.4506 7.175C19.6506 7.375 19.7506 7.6125 19.7506 7.8875C19.7506 8.1625 19.6506 8.4 19.4506 8.6L10.2506 17.8C10.0506 18 9.81724 18.1 9.55057 18.1C9.28391 18.1 9.05057 18 8.85057 17.8L4.55057 13.5C4.35057 13.3 4.25474 13.0625 4.26307 12.7875C4.27141 12.5125 4.37557 12.275 4.57557 12.075C4.77557 11.875 5.01307 11.775 5.28807 11.775C5.56307 11.775 5.80057 11.875 6.00057 12.075L9.55057 15.65Z" fill="white"/>
  </g>
  </svg>
  
     </div>
    
    `;
}

function closeEditSubTask(subtaskIndex, id) {
    console.log(id);
    let editSubTaskBox = document.getElementById('editSubTasksBox');
    editSubTaskBox.innerHTML = '';
    deleteSubTask(id);
    }


    function saveEditeSubTask(subtaskIndex, id) {
        let editSubTaskInput = document.getElementById('editSubTaskInput').value;
    
        // Aktualisiere das 'cards' Array direkt mit dem neuen Subtask-Namen
        if (currentDraggedElement && currentDraggedElement.subtasks && currentDraggedElement.subtasks[subtaskIndex]) {
            currentDraggedElement.subtasks[subtaskIndex].name = editSubTaskInput;
            // Persistiere die Änderungen (ersetze 'setItem' durch deine Funktion zum Speichern)
            // saveTasks(); // Annahme: Du hast eine Funktion, die deine Tasks persistiert
        }
    
        // Schließe und leere das Bearbeitungsfeld
        document.getElementById('editSubTasksBox').innerHTML = '';
    }
    
    
    function addSubTaskNewTask(cardId) {
        let subTaskInput = document.getElementById('addSubTasks').value.trim();
        if (subTaskInput) {
            let card = cards.find(card => card.id === cardId);
            if (!card.subtasks) {
                card.subtasks = [];
            }
            // Generiere eine pseudo-einzigartige ID durch Kombination von Datum und Zufallszahl
            let newSubID = Date.now();
            card.subtasks.push({ name: subTaskInput, done: false, subID: newSubID });
    
            document.getElementById('addSubTasks').value = '';
            displaySubtasksInBoard(cardId);
        }
    }
    
    

    function displaySubtasksInBoard(cardId) {
        let card = cards.find(card => card.id === cardId);
        let subTasksBox = document.getElementById('subTasksBox');
        subTasksBox.innerHTML = ''; // Bereinige das Subtask-Display
    
        if (card && card.subtasks) {
            for (let i = 0; i < card.subtasks.length; i++) {
                const subtask = card.subtasks[i];
                // Füge hier die Logik zum Anzeigen der Subtasks ein, z.B.:
                subTasksBox.innerHTML += displaySubtasksHTML(subtask, i);
            }
        }
    }
    