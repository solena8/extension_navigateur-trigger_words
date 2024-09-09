export function fetchJSONData(): Promise<any> {
    return fetch(chrome.runtime.getURL('../assets/trigger_db.json'))
        .then(response => response.json())
        .then(data => {
            console.log(Object.keys(data.categories[0]));
            
            return data;
        })
        .catch(error => {
            console.error('Erreur lors du chargement du JSON:', error);
            throw error;
        });
}

export function afficherAvis(data: any) {
    const categorie = document.createElement("p");
    
    for (let i = 0; i < Object.keys(data.categories).length; i++) {
        categorie.innerHTML += `<b>${data.categories[i]}:</b><br>`;
    }
    document.getElementById("trigger_list")!.appendChild(categorie);
}

fetchJSONData().then(data => {
    window.addEventListener("DOMContentLoaded", (event) => {
        
        const header = document.getElementById('trigger_list');
        if (header) {
            afficherAvis(data.categories);
        }
    });

}).catch(error => {
    console.error('Erreur lors du chargement du JSON:', error);
});
