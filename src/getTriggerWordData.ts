let jsonData: string;

export function fetchJSONData(): Promise<any> {

    return fetch(chrome.runtime.getURL("./assets/trigger_db.json"))
        .then((response) => response.json())
        .then((data) => {
            jsonData = data.categories;
            return data.categories;
        })
        .catch((error) => {
            console.error("Erreur lors du chargement du JSON:", error);
            throw error;
        });
}

export function displayTriggerCategorie(data: object) {
    if (document.getElementById("trigger_list")!.innerHTML === ``) {
        const categorieParagraph = document.createElement("p");

        for (const [index, [key]] of Object.entries(Object.entries(data))) {
            categorieParagraph.innerHTML += `
                <div>
                    <input type="checkbox" id="trigger-${index}" name="categorie"/>
                    <label for="categorie">
                        <button class="subCategorie" id="${key}">${key}</button>
                    </label>
                    <span id="sub-${key}"></span>
                </div>
                </br>`;
        }
        document
            .getElementById("trigger_list")!
            .appendChild(categorieParagraph);
    } else {
        document.getElementById("trigger_list")!.innerHTML = ``;
    }
}

const buttonGroupPressed = (e: any) => {
    const isButton = e.target.nodeName === "BUTTON";

    if (!isButton) {
        return;
    }

    let getName: string;
    getName = e.target.id;

    fetchJSONData()
        .then((jsonData) => {
            afficherSousCategorie(jsonData, getName);
        })
        .catch((error) => {
            console.error("Erreur lors du chargement du JSON:", error);
        });
};

const buttonGroup = document.getElementById("trigger_list");
buttonGroup!.addEventListener("click", buttonGroupPressed);

function afficherSousCategorie(jsonData: any, categorieCible: string) {
    if (jsonData.hasOwnProperty(categorieCible)) {
        const sousCategories = jsonData[categorieCible];

        console.log(`sub-${categorieCible}`);

        console.log(
            document.getElementById(`sub-${categorieCible}`)!.childNodes
        ); // Pour voir tous les nœuds enfants
        console.log(
            document.getElementById(`sub-${categorieCible}`)!.hasChildNodes()
        );

        if (
            !document.getElementById(`sub-${categorieCible}`)!.hasChildNodes()
        ) {
            const sousCategorieParagraph = document.createElement("p");

            for (const [index, [key]] of Object.entries(
                Object.entries(sousCategories)
            )) {
                sousCategorieParagraph.innerHTML += `
                        <div>
                            <input type="checkbox" id="subTrigger-${key}" name="categorie"/>
                            <label for="categorie">${key}</label>
                        </div>
                        </br>`;
            }
            document
                .getElementById(`sub-${categorieCible}`)!
                .appendChild(sousCategorieParagraph);
        } else {
            console.log("youpi?");

            document.getElementById(`sub-${categorieCible}`)!.innerHTML = ``;
        }
    } else {
        console.error(`Catégorie "${categorieCible}" non trouvée.`);
    }
}
