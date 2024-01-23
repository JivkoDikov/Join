let timeOfDay = ["Good Morning,", "Good Afternoon,", "Good Evening,"]
let greeting = ""

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

}

function setGreeting(greeting){
    let greetingHeader = document.getElementById("greeting");
    greetingHeader.innerHTML = greeting
}

function setUserName(){
    let name = localStorage.getItem("name")
    let greetingName = document.getElementById("greetingName");
    greetingName.innerHTML = name
}

function checkwelcome(){
    let stateWelcome = sessionStorage.getItem("welcome")

    if (!stateWelcome){
        welcomeSummary.classList.remove("d-none");
        setTimeout(function() {
            welcomeSummary.classList.add("d-none");
            sessionStorage.setItem("welcome", 1)
        }, 2800);
    }
}