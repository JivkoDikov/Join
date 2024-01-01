let cards = [
    {
        "id" : 0,
        "label" : "User Story",
        "headline" : "Kochwelt Page & Recipe Recommender",
        "text": "Build start page with recipe recommendation...",
        "progressBar" : 1,
        "user": "",
        "priority": "1",
        "category": "open"
    },
    {
        "id" : 1,
        "label" : "User Story",
        "headline" : "Kochwelt Page & Recipe Recommender",
        "text": "Build start page with recipe recommendation...",
        "progressBar" : 1,
        "user": "",
        "priority": "1",
        "category": "open"
    },
    {
        "id" : 2,
        "label" : "User Story",
        "headline" : "Kochwelt Page & Recipe Recommender",
        "text": "Build start page with recipe recommendation...",
        "progressBar" : 1,
        "user": "",
        "priority": "1",
        "category": "closed"
    },
]

let currentDraggedElement;

function updateHTML() {
    let open = cards.filter(t => t["category"] == 'open');

    document.getElementById('open').innerHTML = '';

    for (let i = 0; i < open.length; i++) {
        const element = open[i];
        
        document.getElementById('open').innerHTML += generateCardHTML(element);
    }




    let closed = cards.filter(t => t['category'] == 'closed');

    document.getElementById('closed').innerHTML = '';

    for (let j = 0; j < closed.length; j++) {
        const element = closed[j];
        document.getElementById('closed').innerHTML += generateCardHTML(element);
    }
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


function generateCardHTML(element) {
    return `
    <div class="cards" draggable="true" ondragstart="startDragging(${element['id']})">
    <h2 class="labelsBoardCard">${element['label']}</h2>
    <div class="content">
        <h3>${element['headline']}</h3>
        <span>${element['text']}</span>
    </div>
    <div class="progressBar">
        <span><svg width="128" height="8" viewBox="0 0 128 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="128" height="8" rx="4" fill="#F4F4F4"/>
            <rect width="64" height="8" rx="4" fill="#4589FF"/>
            </svg></span>
        <span>${element['progressBar']}/2 Subtasks</span>
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
        ${element['priority']}
        </div>
    </div>
</div>
    `;
}