let profile = {
  letters: {
    firstletters: [],
    lastletters: [],
  },
  contactDetails: [
    { email: "dsfsdf@sdfsd", name: "Juri", tel: "dsfgdsfgdfg", firstLetter: "J" },
    { email: "dsfsdf@sdfsd", name: "Detlef", tel: "dsfgdsfgdfg", firstLetter: "D" },
    { email: "example1@example.com", name: "Alice", tel: "123456789", firstLetter: "A" },
    { email: "example2@example.com", name: "Bob", tel: "987654321", firstLetter: "B" },
    { email: "example3@example.com", name: "Charlie", tel: "555555555", firstLetter: "C" },
    { email: "example4@example.com", name: "David", tel: "666666666", firstLetter: "D" },
    { email: "example5@example.com", name: "Eva", tel: "777777777", firstLetter: "E" },
    { email: "example6@example.com", name: "Frank", tel: "888888888", firstLetter: "F" },
    { email: "example7@example.com", name: "Grace", tel: "999999999", firstLetter: "G" },
    { email: "example8@example.com", name: "Harry", tel: "111111111", firstLetter: "H" },
    { email: "example9@example.com", name: "Ivy", tel: "222222222", firstLetter: "I" },
    { email: "example10@example.com", name: "Jack", tel: "333333333", firstLetter: "J" },
    { email: "example11@example.com", name: "Jasmine", tel: "444444444", firstLetter: "J" },
    { email: "example12@example.com", name: "Klaus", tel: "555555555", firstLetter: "K" },
    { email: "example13@example.com", name: "Laura", tel: "666666666", firstLetter: "L" },
    { email: "example14@example.com", name: "Michael", tel: "777777777", firstLetter: "M" },
    { email: "example15@example.com", name: "Nina", tel: "888888888", firstLetter: "N" },
    { email: "example16@example.com", name: "Oliver", tel: "999999999", firstLetter: "O" },
    { email: "example17@example.com", name: "Paul", tel: "111111111", firstLetter: "P" },
    { email: "example18@example.com", name: "Quinn", tel: "222222222", firstLetter: "Q" },
    { email: "example19@example.com", name: "Quincy", tel: "333333333", firstLetter: "Q" },
    { email: "example20@example.com", name: "Rita", tel: "444444444", firstLetter: "R" },
  ],
  backgroundColors: [
    { color: "rgb(147, 39, 255)" },
    { color: "rgb(110, 82, 255)" },
    { color: "rgb(252, 113, 255)" },
    { color: "rgb(255, 122, 0)" },
    { color: "rgb(31, 215, 193)" },
    { color: "rgb(70, 47, 138)" },
  ],
};

  
  let letters = {
    firstletters: [],
    lastletters: [],
  };

  let firstLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R"];


  function renderContact() {
    let letterBox = document.getElementById("letterBox");
    
    letterBox.innerHTML = '';
  
    for (let i = 0; i < firstLetter.length; i++) {
      letterBox.innerHTML += /*html*/ `
        <div id="${firstLetter[i]}" class="firstLetterContainer">${firstLetter[i]}</div>
        <div class="line"></div>`;
    }
    for(let i = 0; i < profile.contactDetails.length; i++){
      let firstLetter = profile.contactDetails[i].firstLetter
      let renderContact = document.getElementById(firstLetter);
      let userName = profile.contactDetails[i].name

      renderContact.innerHTML += /*html*/ `
      <div class="firstLetterContainer">${userName}</div>
      `;
  }
    }

  
    
