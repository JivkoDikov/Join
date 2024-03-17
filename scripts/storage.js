const STORAGE_TOKEN = 'Y2B64H33P1ZFHWE7S0HF0V8EC9OTCQZV1FG8B8B5';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**
 * Saves an item to remote storage with the specified key and value.
 * This function uses the predefined STORAGE_TOKEN and STORAGE_URL constants for authentication and the storage endpoint.
 * @param {string} key - The key under which the value is stored.
 * @param {any} value - The value to be stored.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN }; 
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}


/**
 * Retrieves an item from remote storage using the specified key.
 * This function constructs a request URL using the predefined STORAGE_TOKEN and STORAGE_URL constants.
 * @param {string} key - The key of the item to retrieve.
 */
async function getItem(key) { 
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    let resp = await fetch(url);
    let data = await resp.json(); 
    return data;
}
