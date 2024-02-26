let timeOfDay = ["Good Morning,", "Good Afternoon,", "Good Evening,"];
let greeting = "";
let nameUser = localStorage.getItem("name");
let summaryTask = [];
let todo = [];
let progress = [];
let feedback = [];
let done = [];
let howManyTasks = [];
let urgent = [];
let upcomingDate = [];


async function renderSummary(){
    checkWelcomePopup(); 
    hourCheck();
    loadTasks();
    summaryTask = await loadTasks(userID);
    takeInfoSummary(summaryTask);
    prioritySummary(summaryTask);
    parseDate(summaryTask);
    bodySummary();
}


function hourCheck() {
    let currentDate = new Date();
    let currentHour = currentDate.getHours();

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


async function takeInfoSummary(summaryTask) {
    todo = [];
    progress = [];
    feedback = [];
    done = [];

    const categories = ['todo', 'progress', 'feedback', 'done'];
    summaryTask.forEach(taskInfo => {

        if (categories.includes(taskInfo.category)) {
            switch (taskInfo.category) {
                case 'todo':
                    todo.push(taskInfo);
                    break;
                case 'progress':
                    progress.push(taskInfo);
                    break;
                case 'feedback':
                    feedback.push(taskInfo);
                    break;
                case 'done':
                    done.push(taskInfo);
                    break;
            }
        }
    });
    howManyTasks = todo.length + progress.length + feedback.length + done.length;
}


function prioritySummary(summaryTask) {
    summaryTask.forEach(taskInfo => {
        if (taskInfo.priority === 2) {
            urgent.push(taskInfo);
        }
    });
}

function parseDate(summaryTask) {
    let filteredCards = summaryTask.filter(card => card.priority === 2 && !isNaN(new Date(card.date).getTime()));
    let sortedCards = filteredCards.sort((a, b) => new Date(a.date) - new Date(b.date));

    let earliestCard = sortedCards[0];
    if (earliestCard) {
        upcomingDate.push(earliestCard.date);
    }
}


function bodySummary() {
    let bodySummary = document.getElementById('bodySummaryID');
    bodySummary.innerHTML = '';
    bodySummary.innerHTML = bodySummaryHTML();
}


