function getApiKey() {
    return fetch('http://localhost:8085/getKey').then(res => res.json());
}

export { getApiKey };