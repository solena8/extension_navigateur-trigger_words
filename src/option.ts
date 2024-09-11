import { fetchJSONData } from "./getTriggerWordData";
import { displayTriggerCategorie } from "./getTriggerWordData";
import { blockWords } from "./content";
import { displaySavedWords } from "./saved_words";


window.addEventListener("DOMContentLoaded", (event) => {
    const wordInput = document.getElementById("wordInput") as HTMLInputElement;
    const addWordButton = document.getElementById(
        "addWordButton"
    ) as HTMLButtonElement;
    // Event listener for the "Save Blocked Words" button
    const saveBlockedWordsButton = document.getElementById(
        "saveBlockedWords"
    ) as HTMLButtonElement;
    if (saveBlockedWordsButton) {
        saveBlockedWordsButton.addEventListener("click", () => {
            const blockedWordsInput = document.getElementById(
                "blockedWords"
            ) as HTMLTextAreaElement;
            const blockedWords = blockedWordsInput.value
                .split(",")
                .map((word) => word.trim())
                .filter((word) => word.length > 0);

            chrome.storage.sync.set({ blockedWords: blockedWords });
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0].id !== undefined) {
                    chrome.scripting.executeScript(
                        {
                            target: { tabId: tabs[0].id },
                            func: () => {
                                console.log("Executing blockWords function");
                                blockWords();
                            },
                        },
                        () => {
                            if (chrome.runtime.lastError) {
                                console.error(chrome.runtime.lastError.message);
                            }
                        }
                    );
                }
            });
        });
    }
});


// Display words when the popup opens
displaySavedWords();


document.addEventListener("DOMContentLoaded", () => {
    const showOption = document.getElementById(
        "showTriggerOption"
    ) as HTMLButtonElement;

    showOption.addEventListener("click", () => {
        fetchJSONData()
       
        
            .then((data) => {
                const header = document.getElementById("trigger_list");
                if (header) {
                    displayTriggerCategorie(data);
                }
            })
            .catch((error) => {
                console.error("Erreur lors du chargement du JSON:", error);
            });
            console.log("fetchjson data excecuted");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const blurButton = document.getElementById(
        "blurButton"
    ) as HTMLInputElement;

    if (!blurButton) {
        console.error("Blur button element not found");
        return;
    }

    // Set the initial state of the blur button based on storage
    chrome.storage.sync.get("blurButtonToggled", (result) => {
        blurButton.checked = result.blurButtonToggled || false;
    });

    // Add event listener for the blur button toggle
    blurButton.addEventListener("change", () => {
        const isToggled = blurButton.checked;
        chrome.storage.sync.set({ blurButtonToggled: isToggled });
    });
});
