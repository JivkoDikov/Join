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
    parseDate();
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

function parseDate() {
    let earliestCard = summaryTask
    .filter(card => !isNaN(new Date(card.date).getTime()))
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0]; 

    upcomingDate.push(earliestCard.date); 
}

function bodySummary() {
    let bodySummary = document.getElementById('bodySummaryID');
    bodySummary.innerHTML = '';
    bodySummary.innerHTML = bodySummaryHTML();
}


function bodySummaryHTML() {

    return `<div class="bodySummary">
    <div class="summarySelektor1">
      <a href="/assets/templates/board.html" class="todo tile hoverCube" onclick="addActiveStyle(3)">
        <div class="doneImg">
          <img src="/assets/img/todo.svg" alt="" class="svgImgNormal">
          <img src="/assets/img/todo_invert.svg" alt="" class="svgImgHoverTodo">
        </div>
        <div class="doneCount hoverCube">
          <p id="todoSummary">${todo.length}<span>To-do</span></p>
        </div>
      </a>
      <a href="/assets/templates/board.html" class="done tile hoverCube" onclick="addActiveStyle(3)">
        <div class="doneImg">
          <img src="/assets/img/done.svg" alt="" class="svgImgNormal">
          <img src="/assets/img/done_invert.svg" alt="" class="svgImgHoverDone">
        </div>
        <div class="doneCount">
          <p id="doneSummary">${done.length}<span>Done</span></p>
        </div>
      </a>
    </div>
    <a  href="/assets/templates/board.html"  onclick="addActiveStyle(3)">
      <div class="summarySelektor2 hoverCube tile">
        <div class="urgent" >
          <div class="group7">
            <img src="/assets/img/Prio alta.svg" alt="">
          </div>
          <div class="doneCount">
            <p id="urgentSummary">${urgent.length}<span>Urgent</span></p>
          </div>
        </div>
          <div ><img src="/assets/img/vector.svg" alt=""></div>
          <div class="frame68">
            <span id="deadlineSummary">${upcomingDate}</span>
            <span>Upcoming Deadline</span>
          </div>
        </div>
    </a>
    <div class="summarySelektor3" onclick="addActiveStyle(3)">
      <a href="/assets/templates/board.html" class="square-button tile hoverCube">
        <div class="frame">
          <div ><span id="tasksSummary" class="element">${howManyTasks}</span></div>
          <div class="tasks-on-board"><span>Task in<br />Board</span></div>
        </div>
    </a>
      <a href="/assets/templates/board.html" class="square-button tile hoverCube" onclick="addActiveStyle(3)">
        <div class="frame">
          <div ><span id="tasksInProgressSummary" class="element">${progress.length}</span></div>
          <div class="tasks-on-board"><span>Task in<br />Progress</span></div>
        </div>
    </a>
      <a href="/assets/templates/board.html" class="square-button tile hoverCube" onclick="addActiveStyle(3)">
        <div class="frame">
          <div ><span id="taskAwaitingSummary" class="element">${feedback.length}</span></div>
          <div class="tasks-on-board"><span>Awaiting<br />Feedback</span></div>
        </div>
      </a>
  </div>`;
}