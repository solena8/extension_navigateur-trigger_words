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

    document.getElementById("trigger_list")!.innerHTML = ``;
    
    const categorie = document.createElement("p");

    for (const [index, [key, value]] of Object.entries(Object.entries(data))) {
        categorie.innerHTML += ``;
        categorie.innerHTML += `
            <div>
            <input type="checkbox" id="${key}" name="categorie"/>
            <label for="categorie">${key}</label>
            <button onclick="GFG_click(this.id)" class="subCategorie" id="${index}">test</button>
            </div>
            </br>`;
      }

    document.getElementById("trigger_list")!.appendChild(categorie);
}

export function GFG_click(clicked: any) { console.log(clicked); };



const buttonGroup = document.getElementById("trigger_list");
const buttonGroupPressed = (e: any) => { 

    const isButton = e.target.nodeName === 'BUTTON';
    
    if(!isButton) {
      return
    }
    console.log(e.target.id);

}

buttonGroup!.addEventListener("click", buttonGroupPressed);
