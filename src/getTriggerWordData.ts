export function fetchJSONData(): Promise<any> {
    return fetch(chrome.runtime.getURL('../assets/trigger_db.json'))
        .then(response => response.json())
        .then(data => {
            return data.categories;
        })
        .catch(error => {
            console.error('Erreur lors du chargement du JSON:', error);
            throw error;
        });
}

export function afficherAvis(data: any) {

    const categorie = document.createElement("p");

    for (const key in data) {
        if (data.hasOwnProperty(key)) {

            const value = data[key as keyof typeof data];
            if (typeof value === 'object') {
                categorie.innerHTML += `${key}: ${JSON.stringify(value, null, 2)}`;
            } else {
                console.log(`${key}: ${value}`);
            }
        }
    }

    document.getElementById("trigger_list")!.appendChild(categorie);
}
