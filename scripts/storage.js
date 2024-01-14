const STORAGE_TOKEN = 'Y2B64H33P1ZFHWE7S0HF0V8EC9OTCQZV1FG8B8B5';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


async function setItem(profile, contactDeta) {
    const payload = { profile, contactDetails, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

async function getItem(profile) {
    const url = `${STORAGE_URL}?key=${profile}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
}

