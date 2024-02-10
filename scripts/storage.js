const STORAGE_TOKEN = 'Y2B64H33P1ZFHWE7S0HF0V8EC9OTCQZV1FG8B8B5';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

// let contactsLey ="contacts";

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}



async function getItem(key,toPush) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    let resp = await fetch(url);
    return toPush.push(resp.json());
    
}

// function saveToRemoteStorage() {
//     setItem('letters', letters);
//     setItem('contacts', contacts);
// }

// async function loadFromRemoteStorage() {
//     try {
//         const loadedLetters = await getItem('letters');
//         const loadedContacts = await getItem('contacts');

//         if (loadedLetters && loadedContacts) {
//             letters = loadedLetters;
//             contacts = loadedContacts;
//             showContacts();
//         }
//     } catch (error) {
//         console.error('Error loading data from remote storage:', error);
//     }
// }


// function save() {
//     saveToRemoteStorage();
// }

// function load() {
//     loadFromRemoteStorage();
// }
