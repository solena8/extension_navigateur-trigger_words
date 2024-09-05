// content.ts :

export function blockWords() {
    // Fonction principale qui va récupérer les mots bloqués depuis le stockage de Chrome et les remplacer dans la page web.

    chrome.storage.sync.get(["blockedWords"], (result) => {
        // Récupère les mots bloqués depuis le stockage synchronisé de Chrome.
        // -> Fond : `chrome.storage.sync.get` est une API asynchrone qui récupère des données enregistrées localement et,
        //si l'utilisateur est connecté, les synchronise entre les appareils.
        // -> Ici, on récupère un tableau contenant les mots à bloquer sous la clé "blockedWords".

        const blockedWords: string[] = result.blockedWords || [];
        // Si aucun mot bloqué n'est récupéré (par exemple, si la clé "blockedWords" est vide), on initialise avec un tableau
        //vide.

        // Fonction récursive pour parcourir le DOM et remplacer le texte
        function traverse(node: Node) {
            // La fonction `traverse` parcourt chaque nœud du DOM. Un nœud peut être du texte, un élément HTML, etc.
            // -> Fond : `Node` est l'objet de base dans le DOM représentant un nœud individuel. Il existe différents types
            //de nœuds, comme les nœuds de texte (TEXT_NODE) et les éléments (ELEMENT_NODE).

            if (node.nodeType === Node.TEXT_NODE) {
                // Si le nœud est un nœud de texte, on procède au remplacement des mots.
                let text = (node as Text).textContent || "";
                // On récupère le contenu textuel du nœud. Si c'est null ou vide, on initialise avec une chaîne vide.

                blockedWords.forEach((word) => {
                    // Pour chaque mot bloqué, on crée une expression régulière pour le trouver dans le texte.
                    const regex = new RegExp(`\\b${word}\\b`, "gi");
                    // -> Fond : Le motif `\\b` garantit que l'on ne remplace que des mots entiers. Par exemple, "chat" ne
                    //remplacera pas "château".
                    // -> `gi` signifie que la recherche est insensible à la casse et globale (remplace toutes les occurrences
                    //du mot).

                    text = text.replace(regex, (match) =>
                        "*".repeat(match.length)
                    );
                    // On remplace chaque occurrence du mot par une chaîne d'astérisques de la même longueur que le mot trouvé.
                    // -> Fond : Cela cache le mot bloqué tout en maintenant la longueur du texte inchangée pour ne pas
                    //perturber la mise en forme.
                });

                (node as Text).textContent = text;
                // On met à jour le contenu du nœud de texte avec le nouveau texte, où les mots bloqués ont été remplacés.
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                // Si le nœud est un élément HTML (par exemple, une balise `<div>`, `<p>`, etc.), on parcourt ses enfants.
                // -> Fond : `ELEMENT_NODE` fait référence aux balises HTML dans le DOM.

                // On ignore certains éléments comme les balises <script>, <style>, et <noscript>
                if (!["SCRIPT", "STYLE", "NOSCRIPT"].includes(node.nodeName)) {
                    // -> Fond : Ces balises ne contiennent pas de texte destiné à être visible pour l'utilisateur, donc on
                    //ne les modifie pas.
                    node.childNodes.forEach(traverse);
                    // On appelle récursivement `traverse` sur chaque nœud enfant de l'élément actuel.
                    // -> Fond : Cela permet de descendre dans la hiérarchie du DOM pour analyser tous les nœuds.
                }
            }
        }

        traverse(document.body);
        // On commence le parcours du DOM à partir de la balise `<body>`, pour affecter tout le contenu visible de la page web.
        // -> Fond : Le corps du document contient tous les éléments visibles, comme le texte et les images.
    });
}

window.addEventListener("DOMContentLoaded", (event) => {
    // Quand la page est complètement chargée, on appelle la fonction `blockWords`.
    // -> Fond : Cela garantit que tout le contenu est disponible dans le DOM avant que la fonction n'essaie de parcourir et
    //de modifier les nœuds.

    blockWords();
    // -> Fond : La fonction est exécutée au chargement de la page pour appliquer immédiatement les remplacements.
});

/*Explications des concepts clés :
Récupération des mots bloqués :
chrome.storage.sync.get permet de récupérer les données stockées dans l'extension Chrome. Dans ce cas, il s'agit 
des mots bloqués stockés sous la clé "blockedWords".
Parcours récursif du DOM :

La fonction traverse parcourt tous les nœuds d'une page web en vérifiant s'il s'agit de texte ou d'éléments HTML. Pour 
chaque nœud de texte, elle remplace les mots bloqués par des astérisques.
Le parcours récursif permet d'explorer chaque nœud de l'arbre DOM, en descendant dans chaque élément enfant.
Expressions régulières (Regex) :

\\b${word}\\b est une expression régulière qui correspond uniquement aux mots entiers (délimités par des espaces ou des 
caractères de ponctuation). Cela empêche la modification de parties de mots, comme "château" pour "chat".
replace() permet de substituer chaque occurrence du mot par des astérisques. Le nombre d'astérisques est égal à la longueur 
du mot bloqué.
Protection des balises non textuelles :

Certains éléments comme <script>, <style>, et <noscript> ne doivent pas être modifiés, car ils contiennent du code ou des 
instructions non textuelles qui peuvent perturber le fonctionnement de la page si modifiés.
DOM entièrement chargé :

DOMContentLoaded garantit que la page web est complètement chargée avant d'essayer de parcourir et de modifier les nœuds 
du DOM, évitant ainsi des erreurs liées à des éléments non disponibles lors du chargement initial.*/

// popup.ts :

//import { blockWords } from "./content";
// Importation de la fonction `blockWords` depuis le module "content".
// -> Fond : Cette fonction sera injectée dans la page active via l'API `chrome.scripting`.
// -> Forme : La syntaxe `import` fait partie des modules ES6. Elle permet d'importer du code externe.

window.addEventListener("DOMContentLoaded", (event) => {
    // Ajoute un écouteur d'événement au document pour le moment où le DOM est complètement chargé.
    // -> Fond : `DOMContentLoaded` est déclenché quand tout le HTML est chargé et analysé, sans attendre le chargement
    //complet des ressources (images, CSS, etc.).
    // -> Forme : La fonction fléchée est une alternative plus concise à la déclaration classique d'une fonction.

    const saveBlockedWordsButton = document.getElementById(
        "saveBlockedWords"
    ) as HTMLButtonElement;
    // Sélectionne un élément HTML avec l'ID "saveBlockedWords" (probablement un bouton).
    // -> Fond : On suppose que cet élément est un bouton que l'utilisateur clique pour enregistrer des mots bloqués.
    // -> Forme : `as HTMLButtonElement` est une annotation TypeScript qui aide le compilateur à comprendre qu'il s'agit
    //d'un bouton.

    if (saveBlockedWordsButton) {
        // Vérifie que l'élément existe avant d'ajouter un écouteur d'événement.
        // -> Fond : Cela évite une erreur si l'élément n'est pas trouvé sur la page.

        saveBlockedWordsButton.addEventListener("click", () => {
            // Ajoute un écouteur d'événement pour gérer le clic sur le bouton.
            // -> Fond : Quand l'utilisateur clique, l'action à l'intérieur de cette fonction sera exécutée.

            const blockedWordsInput = document.getElementById(
                "blockedWords"
            ) as HTMLTextAreaElement;
            // Sélectionne une zone de texte avec l'ID "blockedWords" où l'utilisateur entre les mots à bloquer.
            // -> Forme : `as HTMLTextAreaElement` est utilisé pour indiquer que cet élément est une zone de texte (textarea).

            const blockedWords = blockedWordsInput.value
                .split(",") // Divise la chaîne de caractères en un tableau, en séparant chaque mot avec une virgule.
                .map((word) => word.trim()) // Supprime les espaces blancs autour de chaque mot.
                .filter((word) => word.length > 0); // Filtre les mots vides (cas où l'utilisateur entre une virgule sans mot).
            // -> Fond : Cela permet de créer une liste propre des mots bloqués à partir de la saisie de l'utilisateur.
            // -> Forme : `split`, `map` et `filter` sont des méthodes de tableau intégrées en JavaScript pour manipuler les
            //tableaux.

            chrome.storage.sync.set({ blockedWords: blockedWords });
            // Enregistre la liste des mots bloqués dans le stockage synchronisé de Chrome.
            // -> Fond : Les mots bloqués sont stockés localement, mais synchronisés entre les sessions si l'utilisateur est
            //connecté à Chrome.
            // -> Forme : `chrome.storage.sync` est une API de Chrome pour gérer le stockage persistant dans les extensions.

            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                // Requête pour obtenir l'onglet actuellement actif dans la fenêtre courante.
                // -> Fond : Cela permet d'obtenir des informations sur l'onglet dans lequel l'utilisateur se trouve.
                // -> Forme : `chrome.tabs.query` est une API asynchrone de Chrome utilisée pour interagir avec les onglets du
                //navigateur.

                if (tabs[0].id !== undefined) {
                    // Vérifie que l'ID de l'onglet est défini (évite les erreurs si aucun onglet n'est trouvé).

                    chrome.scripting.executeScript({
                        target: { tabId: tabs[0].id },
                        func: blockWords, // Injecte la fonction `blockWords` dans l'onglet actif.
                    });
                    // -> Fond : Cela permet d'exécuter la fonction `blockWords` dans l'onglet actif, ce qui appliquera le
                    //blocage des mots sur cette page.
                    // -> Forme : `chrome.scripting.executeScript` est une API de Chrome pour injecter du JavaScript dans
                    //des pages web ouvertes.
                }
            });
        });
    }
});

/*Explications supplémentaires sur les concepts du code :

Fonctions fléchées (arrow functions) :
Syntaxe : (param) => { ... }
C'est une version plus concise des fonctions anonymes. Elles sont utiles car elles ne créent pas leur 
propre contexte this. Cela évite les erreurs lorsque des callbacks sont utilisés, notamment dans des 
événements ou des fonctions asynchrones comme celles des API Chrome.

API Chrome :
chrome.storage.sync.set() : Permet de sauvegarder des données dans le stockage synchronisé de Chrome, accessible 
sur tous les appareils si l'utilisateur est connecté.
chrome.tabs.query() : Récupère les informations sur les onglets dans Chrome. Ici, on récupère l'onglet actif de la 
fenêtre actuelle.
chrome.scripting.executeScript() : Permet d'exécuter du code dans l'onglet spécifié. C'est utilisé ici pour 
injecter et exécuter la fonction blockWords dans la page web de l'onglet actif.

TypeScript : L'utilisation de as HTMLButtonElement ou as HTMLTextAreaElement est spécifique à TypeScript et permet 
de donner un type explicite aux éléments DOM, aidant ainsi à la vérification du type à la compilation.*/
