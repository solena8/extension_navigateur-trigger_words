let jsonData: object | null = null;

export function fetchJSONData(): Promise<any> {
    return fetch(chrome.runtime.getURL('../assets/trigger_db.json'))
        .then(response => response.json())
        .then(data => {
            jsonData = data;
            return jsonData;
        })
        .catch(error => {
            console.error('Erreur lors du chargement du JSON:', error);
            throw error;
        });
}

fetchJSONData().then(data => {
    console.log('Données JSON chargées:', data);
}).catch(error => {
    console.error('Erreur lors du chargement du JSON:', error);
});
