let IdCounter = 0;
let cards = [
    {
        "id" : 0,
        "label" : "User Story",
        "headline" : "Recommender",
        "text": "Build start page with recipe recommendation...",
        "progressBar" : 100,
        "subtasks": 50,
        "user": "",
        "priority": 1,
        "category": "progress",
        "date": 1151,
        "subtask1": "AddTask"
    },
    {
        "id" : 1,
        "label" : "User Story",
        "headline" : "Page",
        "text": "Build start page with recipe recommendation...",
        "progressBar" : 0,
        "subtasks": 50,
        "user": "",
        "priority": 1,
        "category": "todo",
        "date": 1151,
        "subtask1": "AddTask"
    },
    {
        "id" : 2,
        "label" : "User Story",
        "headline" : "Recipe Recommender",
        "text": "Build start page with recipe recommendation...",
        "progressBar" : 10,
        "subtasks": 50,
        "user": "",
        "priority": 1,
        "category": "todo",
        "date": 1151,
        "subtask1": "AddTask"
    },
]



let currentDraggedElement;

const STORAGE_TOKEN = 'Y2B64H33P1ZFHWE7S0HF0V8EC9OTCQZV1FG8B8B5';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}



async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;

    let fetchPromises = Array.from( (_, i) =>
        fetch(url).then(res => res.json()).then(res => res.data.value)
    );
    let results = await Promise.all(fetchPromises);
    cards.push(results);
}


function updateHTML() {
    const categories = ['todo', 'progress', 'feedback', 'done'];
    for (const category of categories) {
        let categoryElements = cards.filter(t => t['category'] === category);
        document.getElementById(category).innerHTML = '';
        for (let i = 0; i < categoryElements.length; i++) {
            let element = categoryElements[i];
            document.getElementById(category).innerHTML += generateCardHTML(element);
            updateProgressBar(element);
            console.log(element);
        }
    }
    emptyCategory();
}

    


function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}


function moveTo(category) {
    cards[currentDraggedElement]['category'] = category;
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
        
        if (element['category'] === category && (element['headline'].toLowerCase().includes(search) || search === '')) {
            card.innerHTML += generateCardHTML(element);           
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
                <div class="dropWindow" id="todo" ondrop="moveTo('todo')" ondragover="allowDrop(event)">
                    <div class="empty">
                        <span>No task To do</span>
                    </div>
                </div>
        `;
    }

    if(emptyprogress.innerHTML === "") {
        emptyprogress.innerHTML += `
                <div class="dropWindow" id="todo" ondrop="moveTo('todo')" ondragover="allowDrop(event)">
                    <div class="empty">
                        <span>No task Progress</span>
                    </div>
                </div>
        `;
    }

    if(emptyfeedback.innerHTML === "") {
        emptyfeedback.innerHTML += `
                <div class="dropWindow" id="todo" ondrop="moveTo('todo')" ondragover="allowDrop(event)">
                    <div class="empty">
                        <span>No task Feedback</span>
                    </div>
                </div>
        `;
    }

    if(emptydone.innerHTML === "") {
        emptydone.innerHTML += `
                <div class="dropWindow" id="todo" ondrop="moveTo('todo')" ondragover="allowDrop(event)">
                    <div class="empty">
                        <span>No task Done</span>
                    </div>
                </div>
        `;
    }
}


function openOverview(i) {
    let infoArrayCard = cards.find(task => {
        return task.id == i;
    });
    console.log(infoArrayCard);
    let removeClass = document.getElementById('overlay');
    removeClass.innerHTML = '';
    removeClass.innerHTML = generateOverviewHTML(infoArrayCard);
    removeClass.classList.remove('d-none');
}


function closeOverview() {
    let overviewElement = document.getElementById('overlay');
    overviewElement.classList.add('d-none');     
    
}


function subtasksCheck(id) {
    let index = cards.findIndex((card) => {
        return card.id === id
    });

    let check = document.getElementById('subtasks1').checked;
    console.log(check);
    let progress = cards[index]['progressBar'];
    let numberOfTask = cards[index]['subtasks'];
    let calculatedTask = numberOfTask / 10;
    let calculatedProgress = progress / calculatedTask;
    

    if(check === true){
       
       console.log(progress);
       let addProgress = progress + calculatedProgress;
       cards[index]['progressBar'] = addProgress;
    }else if(check === false) {
        let addProgress = progress - calculatedProgress;
       cards[index]['progressBar'] = addProgress;
    }
    updateHTML();
}






function updateProgressBar(element) {
    for (let j = 0; j < cards.length; j++) {
        
        let infoArrayCard = element['progressBar'];
        let progressBarId = `myProgressBar${element['id']}`;

       
        let progressBar = document.getElementById(`progressBarId${element['id']}`);
        
        progressBar.innerHTML = `<div class="progress-bar" id="${progressBarId}"></div>`;
        
        
        if (progressBar) {
            
            progressBar.style.width = infoArrayCard + '%';
            progressBar.innerHTML = infoArrayCard + '%';
            progressBar.innerText = ''; 

            if (infoArrayCard < 100) {
                infoArrayCard += 10;
            }
        }
    }
}

function editCard(i) {

    let infoArrayCard = cards[i];



    let overlay = document.getElementById('overlay');
    overlay.innerHTML = '';
    overlay.innerHTML = overviewEditHTML(i);
    overlay.classList.remove('d-none');


    let title = document.getElementById('editTitle');
    let textarea = document.getElementById('editTextarea');
    let data = document.getElementById('editDate');

    title.value = infoArrayCard['headline'];  
    textarea.value = infoArrayCard['text']; 
    data.value = infoArrayCard['date']; 

    
}



function CardEditForm(i) {
    let infoArrayCard = cards[i];

    let titleEdit = document.getElementById('editTitle').value;
    let textareaEdit = document.getElementById('editTextarea').value;
    let dateEdit = document.getElementById('editDate').value;

    infoArrayCard['headline'] = titleEdit;
    infoArrayCard['text'] = textareaEdit;
    infoArrayCard['date'] = dateEdit;
    closeOverview();
    updateHTML();
}


function deleteCard(id) {
    let index = cards.findIndex((card) => {
        return card.id === id
    });
    console.log(index);
    cards.splice(index, 1);
    updateHTML();
    closeOverview();
    }



function priorityCheck(element) {
    if (element && element['priority'] !== undefined) {
        const priority = element['priority'];
    
    if (priority === 0) {
        return `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_122331_4841)">
        <path d="M15.9997 17.2452C15.8003 17.2456 15.606 17.1837 15.4455 17.0686L7.877 11.6347C7.77852 11.5639 7.69535 11.475 7.63223 11.373C7.5691 11.2709 7.52726 11.1578 7.5091 11.0401C7.47241 10.8023 7.53439 10.5601 7.68138 10.3667C7.82838 10.1734 8.04835 10.0447 8.29292 10.0091C8.53749 9.97339 8.78661 10.0336 8.98549 10.1766L15.9997 15.2075L23.014 10.1766C23.1125 10.1058 23.2243 10.0546 23.3431 10.0258C23.462 9.9971 23.5855 9.9914 23.7066 10.0091C23.8277 10.0267 23.944 10.0674 24.0489 10.1288C24.1538 10.1901 24.2453 10.271 24.3181 10.3667C24.3909 10.4625 24.4436 10.5712 24.4731 10.6868C24.5027 10.8023 24.5085 10.9224 24.4904 11.0401C24.4722 11.1578 24.4304 11.2709 24.3672 11.373C24.3041 11.475 24.221 11.5639 24.1225 11.6347L16.554 17.0686C16.3934 17.1837 16.1992 17.2456 15.9997 17.2452Z" fill="#7AE229"/>
        <path d="M16 22.0001C15.8006 22.0005 15.6063 21.9386 15.4457 21.8235L7.87724 16.3896C7.67837 16.2466 7.54603 16.0328 7.50934 15.795C7.47266 15.5572 7.53463 15.315 7.68163 15.1216C7.82862 14.9283 8.0486 14.7996 8.29317 14.7639C8.53773 14.7283 8.78686 14.7885 8.98574 14.9314L16 19.9624L23.0142 14.9314C23.2131 14.7885 23.4622 14.7283 23.7068 14.7639C23.9514 14.7996 24.1713 14.9283 24.3183 15.1216C24.4653 15.315 24.5273 15.5572 24.4906 15.795C24.4539 16.0328 24.3216 16.2466 24.1227 16.3896L16.5542 21.8235C16.3937 21.9386 16.1994 22.0005 16 22.0001Z" fill="#7AE229"/>
        </g>
        <defs>
        <clipPath id="clip0_122331_4841">
        <rect width="17" height="12" fill="white" transform="translate(7.5 10)"/>
        </clipPath>
        </defs>
        </svg>`;
    } else if (priority === 1) {
        return `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_117793_2582)">
        <path d="M23.5685 19.1666L8.43151 19.1666C8.18446 19.1666 7.94752 19.0677 7.77283 18.8918C7.59814 18.7158 7.5 18.4772 7.5 18.2283C7.5 17.9795 7.59814 17.7408 7.77283 17.5649C7.94752 17.3889 8.18446 17.29 8.43151 17.29L23.5685 17.29C23.8155 17.29 24.0525 17.3889 24.2272 17.5649C24.4019 17.7408 24.5 17.9795 24.5 18.2283C24.5 18.4772 24.4019 18.7158 24.2272 18.8918C24.0525 19.0677 23.8155 19.1666 23.5685 19.1666Z" fill="#FFA800"/>
        <path d="M23.5685 14.7098L8.43151 14.7098C8.18446 14.7098 7.94752 14.6109 7.77283 14.435C7.59814 14.259 7.5 14.0204 7.5 13.7715C7.5 13.5227 7.59814 13.284 7.77283 13.1081C7.94752 12.9321 8.18446 12.8333 8.43151 12.8333L23.5685 12.8333C23.8155 12.8333 24.0525 12.9321 24.2272 13.1081C24.4019 13.284 24.5 13.5227 24.5 13.7715C24.5 14.0204 24.4019 14.259 24.2272 14.435C24.0525 14.6109 23.8155 14.7098 23.5685 14.7098Z" fill="#FFA800"/>
        </g>
        <defs>
        <clipPath id="clip0_117793_2582">
        <rect width="17" height="6.33333" fill="white" transform="translate(7.5 12.8333)"/>
        </clipPath>
        </defs>
        </svg>`;
    } else if (priority === 2) {
        return `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_122331_4781)">
        <path d="M16.0003 14.7548C16.1997 14.7544 16.394 14.8163 16.5545 14.9314L24.123 20.3653C24.2215 20.4361 24.3046 20.525 24.3678 20.627C24.4309 20.7291 24.4727 20.8422 24.4909 20.9599C24.5276 21.1977 24.4656 21.4399 24.3186 21.6333C24.1716 21.8266 23.9516 21.9553 23.7071 21.9909C23.4625 22.0266 23.2134 21.9664 23.0145 21.8234L16.0003 16.7925L8.98602 21.8234C8.88754 21.8942 8.7757 21.9454 8.65687 21.9742C8.53803 22.0029 8.41455 22.0086 8.29345 21.9909C8.17235 21.9733 8.05602 21.9326 7.95109 21.8712C7.84616 21.8099 7.75469 21.729 7.68191 21.6333C7.60912 21.5375 7.55644 21.4288 7.52688 21.3132C7.49732 21.1977 7.49146 21.0776 7.50962 20.9599C7.52779 20.8422 7.56963 20.7291 7.63275 20.627C7.69588 20.525 7.77905 20.4361 7.87752 20.3653L15.446 14.9314C15.6066 14.8163 15.8008 14.7544 16.0003 14.7548Z" fill="#FF3D00"/>
        <path d="M16 9.99988C16.1994 9.99954 16.3937 10.0614 16.5543 10.1765L24.1228 15.6104C24.3216 15.7534 24.454 15.9672 24.4907 16.205C24.5273 16.4428 24.4654 16.685 24.3184 16.8784C24.1714 17.0717 23.9514 17.2004 23.7068 17.2361C23.4623 17.2717 23.2131 17.2115 23.0143 17.0686L16 12.0376L8.98577 17.0686C8.78689 17.2115 8.53777 17.2717 8.2932 17.2361C8.04863 17.2004 7.82866 17.0717 7.68166 16.8784C7.53467 16.685 7.47269 16.4428 7.50938 16.205C7.54606 15.9672 7.6784 15.7534 7.87728 15.6104L15.4458 10.1765C15.6063 10.0614 15.8006 9.99954 16 9.99988Z" fill="#FF3D00"/>
        </g>
        <defs>
        <clipPath id="clip0_122331_4781">
        <rect width="17" height="12" fill="white" transform="translate(24.5 22) rotate(-180)"/>
        </clipPath>
        </defs>
        </svg>`;
    }
}
}



function generateCardHTML(element) {
    let prioritySVG = priorityCheck(element);
    return `
    <div class="cards" draggable="true" ondragstart="startDragging(${element['id']})" onclick="openOverview(${element['id']})">
    <h2 class="labelsBoardCard">${element['label']}</h2>
    <div class="content">
        <h3>${element['headline']}</h3>
        <span>${element['text']}</span>
    </div>
    <div class="progressBar">
        <div class="progress-container">
        <div class="progress-bar" id="progressBarId${element['id']}">
        
        </div>
        </div>
        <span>${element['progressBar']/10}/${element['subtasks']/10} Subtasks</span>
    </div>
    <div class="labelProfile">
        <div class="containerProfile">
            <svg class="imgProfile" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="16" fill="white"/>
                <circle cx="16" cy="16" r="15.5" fill="#FF7A00" stroke="white"/>
                <path d="M8.02224 20.1904H6.91428L10.1188 11.4632H11.2097L14.4143 20.1904H13.3063L10.6984 12.8438H10.6302L8.02224 20.1904ZM8.43133 16.7813H12.8972V17.7188H8.43133V16.7813ZM15.7737 11.4632H17.035L20.0009 18.7075H20.1032L23.0691 11.4632H24.3305V20.1904H23.3418V13.5597H23.2566L20.5293 20.1904H19.5748L16.8475 13.5597H16.7623V20.1904H15.7737V11.4632Z" fill="white"/>
            </svg>

            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="16" fill="white"/>
                <circle cx="16" cy="16" r="15.5" fill="#FF7A00" stroke="white"/>
                <path d="M8.02224 20.1904H6.91428L10.1188 11.4632H11.2097L14.4143 20.1904H13.3063L10.6984 12.8438H10.6302L8.02224 20.1904ZM8.43133 16.7813H12.8972V17.7188H8.43133V16.7813ZM15.7737 11.4632H17.035L20.0009 18.7075H20.1032L23.0691 11.4632H24.3305V20.1904H23.3418V13.5597H23.2566L20.5293 20.1904H19.5748L16.8475 13.5597H16.7623V20.1904H15.7737V11.4632Z" fill="white"/>
            </svg> 
        </div>

        <div id="priority">
        ${prioritySVG}
        </div>
    </div>
    </div>
    `;
    
    
}





function generateOverviewHTML(element) {
    let prioritySVG = priorityCheck(element);
    let id = element['id'];
    return `
    
    <div class="overview">
    <div class="overlayCard ">
            <div class="labelContent">
                <h2 class="labelsBoardCard">${element['label']}</h2>
                <button class="btn-close" onclick="closeOverview()">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_117793_4210" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="24" height="24">
                    <rect x="4" y="4" width="24" height="24" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_117793_4210)">
                    <path d="M16 17.4L11.1 22.3C10.9167 22.4834 10.6833 22.575 10.4 22.575C10.1167 22.575 9.88332 22.4834 9.69999 22.3C9.51665 22.1167 9.42499 21.8834 9.42499 21.6C9.42499 21.3167 9.51665 21.0834 9.69999 20.9L14.6 16L9.69999 11.1C9.51665 10.9167 9.42499 10.6834 9.42499 10.4C9.42499 10.1167 9.51665 9.88338 9.69999 9.70005C9.88332 9.51672 10.1167 9.42505 10.4 9.42505C10.6833 9.42505 10.9167 9.51672 11.1 9.70005L16 14.6L20.9 9.70005C21.0833 9.51672 21.3167 9.42505 21.6 9.42505C21.8833 9.42505 22.1167 9.51672 22.3 9.70005C22.4833 9.88338 22.575 10.1167 22.575 10.4C22.575 10.6834 22.4833 10.9167 22.3 11.1L17.4 16L22.3 20.9C22.4833 21.0834 22.575 21.3167 22.575 21.6C22.575 21.8834 22.4833 22.1167 22.3 22.3C22.1167 22.4834 21.8833 22.575 21.6 22.575C21.3167 22.575 21.0833 22.4834 20.9 22.3L16 17.4Z" fill="#2A3647"/>
                    </g>
                    </svg>
                </button>
            </div>

            <div class="overlayContent">
                <h3>${element['headline']}</h3>
                <span>${element['text']}</span>
            </div>
            <div class="overlayDate">
                <span>Due date:</span>
                <span>10/05/2023</span>
            </div>
            <div class="overlayPriority">
                <span>Priority:</span>
                <span>
                ${prioritySVG}
                </span>
            </div>
            <div class="containerProfileName">
                <span>Assigned To:</span>
                <div class="profileName">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="16" fill="white"/>
                        <circle cx="16" cy="16" r="15.5" fill="#FF7A00" stroke="white"/>
                        <path d="M8.02224 20.1904H6.91428L10.1188 11.4632H11.2097L14.4143 20.1904H13.3063L10.6984 12.8438H10.6302L8.02224 20.1904ZM8.43133 16.7813H12.8972V17.7188H8.43133V16.7813ZM15.7737 11.4632H17.035L20.0009 18.7075H20.1032L23.0691 11.4632H24.3305V20.1904H23.3418V13.5597H23.2566L20.5293 20.1904H19.5748L16.8475 13.5597H16.7623V20.1904H15.7737V11.4632Z" fill="white"/>
                    </svg>
                    <span>Anton Mayer</span>
                </div>

                <div class="profileName">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="16" fill="white"/>
                        <circle cx="16" cy="16" r="15.5" fill="#FF7A00" stroke="white"/>
                        <path d="M8.02224 20.1904H6.91428L10.1188 11.4632H11.2097L14.4143 20.1904H13.3063L10.6984 12.8438H10.6302L8.02224 20.1904ZM8.43133 16.7813H12.8972V17.7188H8.43133V16.7813ZM15.7737 11.4632H17.035L20.0009 18.7075H20.1032L23.0691 11.4632H24.3305V20.1904H23.3418V13.5597H23.2566L20.5293 20.1904H19.5748L16.8475 13.5597H16.7623V20.1904H15.7737V11.4632Z" fill="white"/>
                    </svg>
                    <span>Anton Mayer</span>
                </div>
            </div>

            <div class="subtasks">
                <span>Subtasks</span>
                <div>
                    <ul>
                        <li><input type="checkbox" id="subtasks1" onclick="subtasksCheck(${id})">${element['subtask1']}</li>
                        <li><input type="checkbox" id="subtasks2" onclick="subtasksCheck(${id})">${element['subtask2']}</li>
                    </ul>
                </div>
            </div>
            <div class="deleteUedit">
                    <div class="delete" onclick="deleteCard(${id})">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_119188_3520" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                            <rect width="24" height="24" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_119188_3520)">
                            <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
                            </g>
                        </svg>
                        <span>Delete</span>
                    </div>
                    <div class="edit" onclick="editCard(${element['id']})">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_119188_2072" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_119188_2072)">
                    <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
                    </g>
                    </svg>
                    <span>Edit</span>
                    </div>
                </div>
    </div>`;
}

function overviewEditHTML(i) {
    
    return `
    <div class="overview">
    <div class="overlayCard" id="overlayEdit">
    <div class="overlayCardEdit">
    <div class="deleteEdit">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_119188_3520" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            <rect width="24" height="24" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_119188_3520)">
            <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
            </g>
        </svg>
    </div>
    <form class="overlayCardEditForm" onsubmit="CardEditForm(${i});return false">
        <div class="titleInputContainer">
            <div class="titleStar">
            <p class="title">Title</p><p class="star">*</p>
            </div>
            <div class="inputTitleRequiredContainer">
            <input class="inputTitle"type="text" required="true" id="editTitle" placeholder="Enter a Title">
            <p class="requiredField">This fiels is required</p>
            </div>
        </div>
        <div class="textareaDescription">
            <p class="title">Description</p>
            <div class="textareaTitleRequiredContainer">
            <textarea name="" id="editTextarea" cols="30" rows="10" placeholder="Enter a Description"></textarea>
            <p class="requiredField">This fiels is required</p>
            </div>
        </div>
        <div class="titleDateContainer">
            <div class="titleStar">
            <p class="title">Due date</p>
            <p class="star">*</p>
            </div>
            <div class="dateInputRequiredContainer">
                <div class="dateInputImg">
            <input class="inputMonth"type="date" id="editDate" placeholder="dd/mm/yyyy">
            <img class="imgCalendar"src="/assets/img/calendar.png" alt="">
                </div>
                <p class="requiredField">This fiels is required</p>
                </div>
        </div>
    
        <div class="prioContainer">
            <p class="title">Prio</p>
            <div class="prioButtonContainer">
                <button class="btnUrgent">
                    <div class="urgentSVGText">
                    <p class="urgentText">Urgent</p>
                    <svg class="svgUrgent"width="20" height="20" viewBox="0 0 32 32" fill="" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_122331_4781)">
                        <path d="M16.0003 14.7548C16.1997 14.7544 16.394 14.8163 16.5545 14.9314L24.123 20.3653C24.2215 20.4361 24.3046 20.525 24.3678 20.627C24.4309 20.7291 24.4727 20.8422 24.4909 20.9599C24.5276 21.1977 24.4656 21.4399 24.3186 21.6333C24.1716 21.8266 23.9516 21.9553 23.7071 21.9909C23.4625 22.0266 23.2134 21.9664 23.0145 21.8234L16.0003 16.7925L8.98602 21.8234C8.88754 21.8942 8.7757 21.9454 8.65687 21.9742C8.53803 22.0029 8.41455 22.0086 8.29345 21.9909C8.17235 21.9733 8.05602 21.9326 7.95109 21.8712C7.84616 21.8099 7.75469 21.729 7.68191 21.6333C7.60912 21.5375 7.55644 21.4288 7.52688 21.3132C7.49732 21.1977 7.49146 21.0776 7.50962 20.9599C7.52779 20.8422 7.56963 20.7291 7.63275 20.627C7.69588 20.525 7.77905 20.4361 7.87752 20.3653L15.446 14.9314C15.6066 14.8163 15.8008 14.7544 16.0003 14.7548Z" fill="#FF3D00"/>
                        <path d="M16 9.99988C16.1994 9.99954 16.3937 10.0614 16.5543 10.1765L24.1228 15.6104C24.3216 15.7534 24.454 15.9672 24.4907 16.205C24.5273 16.4428 24.4654 16.685 24.3184 16.8784C24.1714 17.0717 23.9514 17.2004 23.7068 17.2361C23.4623 17.2717 23.2131 17.2115 23.0143 17.0686L16 12.0376L8.98577 17.0686C8.78689 17.2115 8.53777 17.2717 8.2932 17.2361C8.04863 17.2004 7.82866 17.0717 7.68166 16.8784C7.53467 16.685 7.47269 16.4428 7.50938 16.205C7.54606 15.9672 7.6784 15.7534 7.87728 15.6104L15.4458 10.1765C15.6063 10.0614 15.8006 9.99954 16 9.99988Z" fill="#FF3D00"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_122331_4781">
                        <rect width="17" height="12" fill="white" transform="translate(24.5 22) rotate(-180)"/>
                        </clipPath>
                        </defs>
                        </svg>
                        </div>
                        
                </button>
                <button class="btnMedium">
                    <div class="mediumSVGText">
                    <p class="mediumText">Medium</p>
                    <svg  class="svgMedium"width="20" height="20" viewBox="0 0 32 32" fill="" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_117793_2582)">
                        <path d="M23.5685 19.1666L8.43151 19.1666C8.18446 19.1666 7.94752 19.0677 7.77283 18.8918C7.59814 18.7158 7.5 18.4772 7.5 18.2283C7.5 17.9795 7.59814 17.7408 7.77283 17.5649C7.94752 17.3889 8.18446 17.29 8.43151 17.29L23.5685 17.29C23.8155 17.29 24.0525 17.3889 24.2272 17.5649C24.4019 17.7408 24.5 17.9795 24.5 18.2283C24.5 18.4772 24.4019 18.7158 24.2272 18.8918C24.0525 19.0677 23.8155 19.1666 23.5685 19.1666Z" fill="#FFA800"/>
                        <path d="M23.5685 14.7098L8.43151 14.7098C8.18446 14.7098 7.94752 14.6109 7.77283 14.435C7.59814 14.259 7.5 14.0204 7.5 13.7715C7.5 13.5227 7.59814 13.284 7.77283 13.1081C7.94752 12.9321 8.18446 12.8333 8.43151 12.8333L23.5685 12.8333C23.8155 12.8333 24.0525 12.9321 24.2272 13.1081C24.4019 13.284 24.5 13.5227 24.5 13.7715C24.5 14.0204 24.4019 14.259 24.2272 14.435C24.0525 14.6109 23.8155 14.7098 23.5685 14.7098Z" fill="#FFA800"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_117793_2582">
                        <rect width="17" height="6.33333" fill="white" transform="translate(7.5 12.8333)"/>
                        </clipPath>
                        </defs>
                        </svg>
                    </div>
                        
                </button>
                <button class="btnLow">
                    <div class="lowSVGText">
                    <p class="lowText">Low</p>
                    <svg  class="svgLow"width="20" height="20" viewBox="0 0 32 32" fill="" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_122331_4841)">
                        <path d="M15.9997 17.2452C15.8003 17.2456 15.606 17.1837 15.4455 17.0686L7.877 11.6347C7.77852 11.5639 7.69535 11.475 7.63223 11.373C7.5691 11.2709 7.52726 11.1578 7.5091 11.0401C7.47241 10.8023 7.53439 10.5601 7.68138 10.3667C7.82838 10.1734 8.04835 10.0447 8.29292 10.0091C8.53749 9.97339 8.78661 10.0336 8.98549 10.1766L15.9997 15.2075L23.014 10.1766C23.1125 10.1058 23.2243 10.0546 23.3431 10.0258C23.462 9.9971 23.5855 9.9914 23.7066 10.0091C23.8277 10.0267 23.944 10.0674 24.0489 10.1288C24.1538 10.1901 24.2453 10.271 24.3181 10.3667C24.3909 10.4625 24.4436 10.5712 24.4731 10.6868C24.5027 10.8023 24.5085 10.9224 24.4904 11.0401C24.4722 11.1578 24.4304 11.2709 24.3672 11.373C24.3041 11.475 24.221 11.5639 24.1225 11.6347L16.554 17.0686C16.3934 17.1837 16.1992 17.2456 15.9997 17.2452Z" fill="#7AE229"/>
                        <path d="M16 22.0001C15.8006 22.0005 15.6063 21.9386 15.4457 21.8235L7.87724 16.3896C7.67837 16.2466 7.54603 16.0328 7.50934 15.795C7.47266 15.5572 7.53463 15.315 7.68163 15.1216C7.82862 14.9283 8.0486 14.7996 8.29317 14.7639C8.53773 14.7283 8.78686 14.7885 8.98574 14.9314L16 19.9624L23.0142 14.9314C23.2131 14.7885 23.4622 14.7283 23.7068 14.7639C23.9514 14.7996 24.1713 14.9283 24.3183 15.1216C24.4653 15.315 24.5273 15.5572 24.4906 15.795C24.4539 16.0328 24.3216 16.2466 24.1227 16.3896L16.5542 21.8235C16.3937 21.9386 16.1994 22.0005 16 22.0001Z" fill="#7AE229"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_122331_4841">
                        <rect width="17" height="12" fill="white" transform="translate(7.5 10)"/>
                        </clipPath>
                        </defs>
                        </svg>
                    </div>
                        
                </button>
        </div>
    </div>
    <div class="assignedContainer">
        <p class="titleAssigned">Assigned to</p>
        <div class="inputDropDown">
            <div class="inputDropDownContainer">
                <div class="inputContactsSVG">
        <input class="inputContacts" type="text" placeholder="Select contacts to assign">
        <svg class="svgArrow"width="24" height="24" viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_123060_2330" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            <rect width="24" height="24" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_123060_2330)">
            <path d="M11.3 14.3L8.69998 11.7C8.38331 11.3833 8.31248 11.0208 8.48748 10.6125C8.66248 10.2042 8.97498 10 9.42498 10H14.575C15.025 10 15.3375 10.2042 15.5125 10.6125C15.6875 11.0208 15.6166 11.3833 15.3 11.7L12.7 14.3C12.6 14.4 12.4916 14.475 12.375 14.525C12.2583 14.575 12.1333 14.6 12 14.6C11.8666 14.6 11.7416 14.575 11.625 14.525C11.5083 14.475 11.4 14.4 11.3 14.3Z" fill="#2A3647"/>
            </g>
            </svg>
                </div>
            </div>
        </div>  

    </div>
    <div class="submitEdit">
            <button class="onsubmitEdit">Ok</button>
        </div>
    </form>
        
    </div>
    </div>
    </div>
    `;


}