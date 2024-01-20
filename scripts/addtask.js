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

function inputFrame(id){
  let inputField = document.getElementById(id);
  let required = document.getElementById(id+"Class")

  if(inputField.value){
    inputField.style.border = "1px solid #29abe2";
    required.classList.add("d-none")
  } else{
    inputField.style.border = "1px solid red";
    required.classList.remove("d-none")
  }
}

function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;

}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("enterDate").value = getCurrentDate();
});