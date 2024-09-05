import { readFileSync } from 'fs';

export function fetchJSONData() {

    const banWords: string = readFileSync('../assets/trigger_db.json', 'utf-8');

    console.log(banWords);
    

}

export function blockWords() {
    let HasBlockedWords: boolean = false;
    chrome.storage.sync.get(["blockedWords"], (result) => {
        
        const blockedWords: string[] = result.blockedWords || [];
        
        // Recursive function to traverse the DOM and replace text
        function traverse(node: Node) {
            if (node.nodeType === Node.TEXT_NODE) {
                let text = (node as Text).textContent || "";
                blockedWords.forEach((word) => {
                    const regex = new RegExp(`\\b${word}\\w{0,2}\\b`, "gi"); // Create regex for each blocked word
                    
                    if (regex.test(text)) {
                        HasBlockedWords = true;
                        
                        text = text.replace(regex, (match) =>
                            "*".repeat(match.length)
                    );
                } // Replace with asterisks
            });
            (node as Text).textContent = text;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Ignore tags that shouldn't be modified
            if (!["SCRIPT", "STYLE", "NOSCRIPT"].includes(node.nodeName)) {
                node.childNodes.forEach(traverse);
            }
        }
    }
    
    traverse(document.body);
    if (HasBlockedWords) {
        alert("Cette page contient des mots bloqués !");
    }
});
}

window.addEventListener("DOMContentLoaded", (event) => {
    fetchJSONData();
    blockWords();
});

window.addEventListener("DOMContentLoaded", () => {
    displayWordList();
});

// Save the word list to localStorage
function saveWordList(wordList: string[]): void {
    localStorage.setItem("wordList", JSON.stringify(wordList));
}

// Load the word list from localStorage
function loadWordList(): string[] {
    const jsonData = localStorage.getItem("wordList");
    return jsonData ? JSON.parse(jsonData) : [];
}

// Add a word to the list if it doesn't already exist
function addWord(word: string): void {
    const wordList = loadWordList();
    if (!wordList.includes(word)) {
        wordList.push(word);
        saveWordList(wordList);
    }
}

// Remove a word from the list
function removeWord(word: string): void {
    const wordList = loadWordList().filter((w) => w !== word);
    saveWordList(wordList);
}

// Display the word list
function displayWordList(): void {
    const wordList = loadWordList();
    const wordListContainer = document.getElementById("wordList");
    const template = document.getElementById(
        "wordItemTemplate"
    ) as HTMLTemplateElement;

    if (wordListContainer && template) {
        wordListContainer.innerHTML = ""; // Clear the current list

        wordList.forEach((word) => {
            const clone = document.importNode(template.content, true);
            const wordText = clone.querySelector(".word-text");
            const removeButton = clone.querySelector(".remove-word-button");

            if (wordText && removeButton) {
                wordText.textContent = word;
                removeButton.addEventListener("click", () => {
                    removeWord(word);
                    displayWordList(); // Refresh the list after removal
                });
                wordListContainer.appendChild(clone);
            }
        });
    }
}

// Event listeners for adding words
document.getElementById("addWordButton")?.addEventListener("click", () => {
    const wordInput = document.getElementById("wordInput") as HTMLInputElement;
    const word = wordInput.value.trim();
    if (word) {
        addWord(word);
        wordInput.value = ""; // Clear the input field
        displayWordList(); // Refresh the list after adding
    }
});
