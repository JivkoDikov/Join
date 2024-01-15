let tasks = [];

    
function createTask(){
    let title = document.getElementById("enterTitle");
    let description = document.getElementById("enterDescription");
    let date = document.getElementById("enterDate");
    let task = {
      title: title.value,
      description: description.value,
      date: date.value,
    };

    tasks.push(task);
    console.log(tasks);
}