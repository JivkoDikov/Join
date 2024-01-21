let tasks = [];

    
function createTask(){
    let title = document.getElementById("enterTitle");
    let description = document.getElementById("enterDescription");
    let date = document.getElementById("enterDate");
    let task = {
      id : 2,
      label : "User Story",
      headline : title.value,
      text: description.value,
      progressBar : 11,
      subtasks: 50,
      user: "",
      priority: 1,
      category: "todo",
      date: date
    };

    tasks.push(task);
    console.log(tasks);
}