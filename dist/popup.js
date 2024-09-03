window.addEventListener("DOMContentLoaded", (event) => {

    // Add event listener for the "Extract Text" button
    document.getElementById("extractButton").addEventListener("click", function () {
        // Execute the text extraction function in the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript(
                {
                    target: { tabId: tabs[0].id },
                    function: extractTextFromPage,
                },
                (results) => {
                    if (results && results[0].result) {
                        document.getElementById("result").textContent =
                            "Extracted Text: " + results[0].result;
                    } else {
                        document.getElementById("result").textContent = "No text found!";
                    }
                }
            );
        });
    });
});

// Function to be executed as a content script in the active tab
function extractTextFromPage() {
    // Liste des balises à ignorer
    const ignoreTags = ["SCRIPT", "STYLE", "NOSCRIPT", "IFRAME", "OBJECT"];

    // Fonction récursive pour extraire du texte en filtrant les balises non désirées
    function getTextFromNode(node) {
        let text = "";

        node.childNodes.forEach(child => {
            if (ignoreTags.includes(child.nodeName)) {
                // Ignorer les balises spécifiées
                return;
            }

            if (child.nodeType === Node.TEXT_NODE) {
                // Ajouter le texte des nœuds texte
                text += (child).textContent;
            } else {
                // Récursion sur les autres types de nœuds
                text += getTextFromNode(child);
            }
        });

        return text;
    }

    // Commencer par le body pour récupérer tout le texte
    const body = document.body;
    if (!body) return '';

    const pageText = getTextFromNode(body);
    return pageText.trim(); // Retirer les espaces en trop
}