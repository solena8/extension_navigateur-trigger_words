window.addEventListener("DOMContentLoaded", (event) => {
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
            chrome.storage.sync.set({ blockedWords: blockedWords }, () => {
                console.log("Blocked words saved:", blockedWords);
                alert("Blocked words saved!");
            });
        });
    }

    // Event listener for the "Block Words" button
    const blockWordsButton = document.getElementById(
        "blockWordsButton"
    ) as HTMLButtonElement;
    if (blockWordsButton) {
        blockWordsButton.addEventListener("click", () => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0].id !== undefined) {
                    chrome.scripting.executeScript({
                        target: { tabId: tabs[0].id },
                        func: blockWords, // Inject this function
                    });
                }
            });
        });
    }
});

// Function to be executed as a content script in the active tab
function extractTextFromPage(): string {
    // List of tags to ignore
    const ignoreTags: string[] = [
        "SCRIPT",
        "STYLE",
        "NOSCRIPT",
        "IFRAME",
        "OBJECT",
    ];

    // Recursive function to extract text while filtering out undesired tags
    function getTextFromNode(node: Node): string {
        let text = "";

        node.childNodes.forEach((child) => {
            if (ignoreTags.includes(child.nodeName)) {
                // Ignore specified tags
                return;
            }

            if (child.nodeType === Node.TEXT_NODE) {
                // Add text from text nodes
                text += (child as Text).textContent || "";
            } else {
                // Recurse on other types of nodes
                text += getTextFromNode(child);
            }
        });

        return text;
    }

    // Start with the body to retrieve all text
    const body = document.body;
    if (!body) return "";

    const pageText = getTextFromNode(body);
    return pageText.trim(); // Remove extra spaces
}

// Function to be executed as a content script in the active tab to block words
function blockWords() {
    chrome.storage.sync.get(["blockedWords"], (result) => {
        const blockedWords: string[] = result.blockedWords || [];

        // Recursive function to traverse the DOM and replace text
        function traverse(node: Node) {
            if (node.nodeType === Node.TEXT_NODE) {
                let text = (node as Text).textContent || "";
                blockedWords.forEach((word) => {
                    const regex = new RegExp(word, "gi"); // Create regex for each blocked word
                    text = text.replace(regex, (match) =>
                        "*".repeat(match.length)
                    ); // Replace with asterisks
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
    });
}
