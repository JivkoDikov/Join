let timeOfDay = ["Good Morning,", "Good Afternoon,", "Good Evening,"];
let greeting = "";
let nameUser = localStorage.getItem("name");
let tasks = [];



function renderSummary(){
    checkWelcomePopup(); 
    hourCheck();
    loadTasks();
}

// Function to generate the greeting based on the current time
function hourCheck() {
    // Get the current time
    let currentDate = new Date();
    let currentHour = currentDate.getHours();


    // Generate greeting based on the current hour
    if (currentHour >= 0 && currentHour < 12) {
        greeting = timeOfDay[0];
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = timeOfDay[1]
    } else {
        greeting = timeOfDay[2]
    }
    setGreeting(greeting);
    setUserName();
    welcomeSummary();
}

function setGreeting(greeting){
    let greetingPopup = document.getElementById("greetingPopup");
    greetingPopup.innerHTML = greeting
}

function setUserName(){
    let greetingNamePopup = document.getElementById("greetingNamePopup");
    greetingNamePopup.innerHTML = nameUser
}

async function loadTasks(){
    //lädt den aktuellen user aus dem Local Storage und speichert ihn in user ab
    let user = localStorage.getItem("user")
    //übergibt den aktuellen user an getitem
    let userTask = await getItem(user);
    //holt sich alle task für ein user
    tasks = JSON.parse(userTask.data.value)
}

function checkWelcomePopup(){
    let stateWelcome = sessionStorage.getItem("welcome")
    let welcomePopup = document.getElementById("welcomePopup")

    if (!stateWelcome){
        welcomePopup.classList.remove("d-none");
        setTimeout(function() {
            welcomeAnimation(welcomePopup);
        }, 2800);
    }
    
}

function welcomeAnimation(welcomePopup){
    welcomePopup.classList.add("d-none");
    sessionStorage.setItem("welcome", true);
}

function welcomeSummary(){
    let greetingSummary = document.getElementById("greeting");
    greetingSummary.innerHTML = greeting;
    let greetingNameSummary = document.getElementById("greetingName");
    greetingNameSummary.innerHTML = nameUser;
}