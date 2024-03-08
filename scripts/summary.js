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

/**
 * Renders the summary page by loading tasks, setting greetings based on the time of day, and displaying relevant task information.
 */
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

/**
 * Determines the appropriate greeting based on the current hour of the day.
 */
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

/**
 * Sets the greeting message in the greeting popup based on the time of day.
 * @param {string} greeting - The greeting message to be displayed.
 */
function setGreeting(greeting){
    let greetingPopup = document.getElementById("greetingPopup");
    greetingPopup.innerHTML = greeting
}

/**
 * Sets the user's name in the greeting popup.
 */
function setUserName(){
    let greetingNamePopup = document.getElementById("greetingNamePopup");
    greetingNamePopup.innerHTML = nameUser
}

/**
 * Checks if the welcome popup should be displayed based on the user's session state.
 */
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

/**
 * Animates the welcome popup by hiding it after a short delay.
 * @param {HTMLElement} welcomePopup - The welcome popup element to be animated.
 */
function welcomeAnimation(welcomePopup){
    welcomePopup.classList.add("d-none");
    sessionStorage.setItem("welcome", true);
}

/**
 * Displays the greeting and user's name on the summary page.
 */
function welcomeSummary(){
    let greetingSummary = document.getElementById("greeting");
    greetingSummary.innerHTML = greeting;
    let greetingNameSummary = document.getElementById("greetingName");
    greetingNameSummary.innerHTML = nameUser;
}

/**
 * Extracts and categorizes task information from the loaded task data for display in the summary.
 * @param {Array} summaryTask - The array of tasks to summarize.
 */
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

/**
 * Filters tasks by priority to identify urgent tasks for the summary.
 * @param {Array} summaryTask - The array of tasks to check for urgency.
 */
function prioritySummary(summaryTask) {
    summaryTask.forEach(taskInfo => {
        if (taskInfo.priority === 0) {
            urgent.push(taskInfo);
        }
    });
}

/**
 * Parses and sorts task dates to find the nearest upcoming task date for the summary.
 * @param {Array} summaryTask - The array of tasks to parse for upcoming dates.
 */
function parseDate(summaryTask) {
    let filteredCards = summaryTask.filter(card => card.priority === 2 && !isNaN(new Date(card.date).getTime()));
    let sortedCards = filteredCards.sort((a, b) => new Date(a.date) - new Date(b.date));
    let earliestCard = sortedCards[0];

    if (earliestCard) {
        upcomingDate.push(earliestCard.date);
    }
}

/**
 * Updates the body of the summary page with summarized task information.
 */
function bodySummary() {
    let bodySummary = document.getElementById('bodySummaryID');
    bodySummary.innerHTML = '';
    bodySummary.innerHTML = bodySummaryHTML();
}


