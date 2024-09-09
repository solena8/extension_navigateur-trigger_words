import { blockWords } from "./content";
import { fetchJSONData } from "./getTriggerWordData"; 

window.addEventListener("DOMContentLoaded", (event) => {
    fetchJSONData();    
    
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
                    chrome.scripting.executeScript({
                        target: { tabId: tabs[0].id },
                        func: blockWords, // Inject this function
                    });
                    // fetchJSONData(); // Inject this function
                    
                }
            });
        });
    }
});
