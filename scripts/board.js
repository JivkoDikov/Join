let cards = {};
let currentDraggedElement;
let currentChecktContact = [];
let user = [];
let categorys = [];

async function initBoard(){  
    render();
    updateHTML();
}


async function updateHTML() {
    cards = await loadTasks(userID);
    console.log(cards);
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


function startDragging(id) {
    currentDraggedElement = cards.find(card => card.id === id);
}


function allowDrop(ev) {
    ev.preventDefault();
}


async function moveTo(category) {
        currentDraggedElement.category = category;
        await setItem('tasks', tasks)    
        updateHTML(); 
    }


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



function emptyCategory() {
    let emptytodo = document.getElementById('todo');
    let emptyprogress = document.getElementById('progress');
    let emptyfeedback = document.getElementById('feedback');
    let emptydone = document.getElementById('done');

    if(emptytodo.innerHTML === "") {
        emptytodo.innerHTML += `
                <div class="dropWindow" id="todo" ondrop="moveTo( 'todo')" ondragover="allowDrop(event)">
                    <div class="empty">
                        <span>No task To do</span>
                    </div>
                </div>
        `;
    }
    if(emptyprogress.innerHTML === "") {
        emptyprogress.innerHTML += `
                <div class="dropWindow" id="progress" ondrop="moveTo( 'progress')" ondragover="allowDrop(event)">
                    <div class="empty">
                        <span>No task Progress</span>
                    </div>
                </div>
        `;
    }
    if(emptyfeedback.innerHTML === "") {
        emptyfeedback.innerHTML += `
                <div class="dropWindow" id="feedback" ondrop="moveTo( 'feedback')" ondragover="allowDrop(event)">
                    <div class="empty">
                        <span>No task Feedback</span>
                    </div>
                </div>
        `;
    }
    if(emptydone.innerHTML === "") {
        emptydone.innerHTML += `
                <div class="dropWindow" id="done" ondrop="moveTo( 'done')" ondragover="allowDrop(event)">
                    <div class="empty">
                        <span>No task Done</span>
                    </div>
                </div>
        `;
    }
}


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


function closeOverview() {
    let overviewElement = document.getElementById('overlay');
    overviewElement.classList.add('d-none');
}


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


function subtasksCheckForTrue(cardId, subtaskID) {
    let checkbox = document.getElementById(`check${subtaskID}`).checked;
    let card = cards.find(card => card.id === cardId);
    if (card.subtasks[subtaskID].length > 0) {
        
    }
        if(checkbox === true) {
            card.subtasks[subtaskID].done = true;
        }else if(checkbox === false) {
            card.subtasks[subtaskID].done = false;}

    subtasksCheck(card);
    updateProgressBar(card);
}

function isSubTaskTrue(card) {
    console.log(card.subtasks.length);
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


function updateProgressBar(element) {
    // Überprüfen, ob Subtasks vorhanden sind
    if (Array.isArray(element.subtasks) && element.subtasks.length > 0) {
        // Berechnen des Fortschritts
        let currentProgress = element.subtasks.filter(subtask => subtask.done).length;
        let percent = Math.round((currentProgress / element.subtasks.length) * 100);

        // Erstellen der Fortschrittsleiste, wenn sie noch nicht existiert
        let progressBarContainer = document.getElementById(`progressBarId${element.id}`);
        if (!progressBarContainer) {
            let container = document.getElementById('isSubTaskTrue'); // Annahme: Es gibt ein Element mit dieser ID, um die Fortschrittsleiste einzufügen
            container.innerHTML = `
            <div class="progress-container">
                <div class="progress-bar" id="progressBarId${element.id}" style="width: ${percent}%"></div>
            </div>
            <div id="subtaskBar${element.id}"><span>${currentProgress}/${element.subtasks.length} Subtasks</span></div>
            `;
        } else {
            // Aktualisieren der Fortschrittsleiste, wenn sie bereits existiert
            progressBarContainer.style.width = `${percent}%`;
            let subtaskHTMLCount = document.getElementById(`subtaskBar${element.id}`);
            subtaskHTMLCount.innerHTML = `<span>${currentProgress}/${element.subtasks.length} Subtasks</span>`;
        }
    }
}



function editCard(cardId) {
    let infoArrayCard = cards.find(card => card.id === cardId);

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
   
    prioEdit(infoArrayCard['priority'], cardId, event);
}


async function CardEditForm(event,cardId) {
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


async function deleteCard(id) {
    let index = cards.findIndex((card) => card.id === id);
    if (index !== -1) {
        cards.splice(index, 1);
        await setItem('tasks', tasks);
        updateHTML();
        closeOverview();
    }
}


function prioEdit(prioID,cardId, event){
    event.preventDefault()
    const buttonCount = 3;
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


function toggleAssignedToBoard(i) {
    let contactsBox = document.getElementById('contactsBox');
    if (contactsBox.style.display === 'none' || contactsBox.innerHTML.trim() === '') {
      assignedToBoard(i);
      contactsBox.style.display = 'block';
    } else {
      contactsBox.style.display = 'none'; 
    }
  }
  
  async function assignedToBoard(i) {
    await load_contacts_from_webstorage();
    let contactsBox = document.getElementById('contactsBox');
    contactsBox.innerHTML = '';
    let uniqueUsers = {};
    let users = contacts[userID];
    
    let assignedContacts = cards[i]['user'] || [];
  
    for (let j = 0; j < users.length; j++) {
        let user = users[j];
        let key = user['name'] + user['bgColor'];
        
        if (!uniqueUsers[key]) {
            let contactUser = {
                name: user['name'],
                bgColor: user['bgColor'],
                initials: user['lastNameLetter']
            };
            let isChecked = assignedContacts.some(assignedUser => assignedUser.name === contactUser.name && assignedUser.bgColor === contactUser.bgColor) ? 'checked' : '';
            contactsBox.innerHTML += assignedToBoardHTML(user, isChecked, i);
            uniqueUsers[key] = true;
        }
    }
  }
  


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
    } else {  
        currentChecktContact = currentChecktContact.filter(contact => !(contact.name === name && contact.bgColor === bgColor));
    }
    updateAssignedUsersInCard(id);
  }

async function updateAssignedUsersInCard(id) {
    let cardIndex = cards.findIndex(card => card.id === Number(id));
    if (cardIndex !== -1) {

        cards[cardIndex].user = currentChecktContact;
        await setItem('tasks', cards);
        assignIcon(cards[cardIndex]);
        
    }
}


async function addTaskHTMLOpen(category) {
    categorys.push(category);
    let openAddTask = document.getElementById('overlay');
    openAddTask.innerHTML = '';
    openAddTask.innerHTML = addTaskHTML();
    openAddTask.classList.remove('d-none');
    await setItem('newcategory', categorys);
    categorys = [];
    updateHTML();

}


function addTaskHTMLClose() {
    let openAddTask = document.getElementById('overlay');
    openAddTask.innerHTML = '';
    openAddTask.classList.add('d-none');
}


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


function userTags(element) {
    let elementID = element['id'];
    let labelsID = 'labelsBoard' + elementID;
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