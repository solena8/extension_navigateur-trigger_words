export function blockWords() {
    let hasBlockedWords = false; // Flag to track if any blocked words are found

    chrome.storage.sync.get(["blockedWords"], (result) => {
        const blockedWords: string[] = result.blockedWords || [];

        // Recursive function to traverse the DOM and replace text
        function traverse(node: Node) {
            if (node.nodeType === Node.TEXT_NODE) {
                let text = (node as Text).textContent || "";
                blockedWords.forEach((word) => {
                    const regex = new RegExp(`\\b${word}\\w{0,2}\\b`, "gi"); // Create regex for each blocked word
                    text = text.replace(regex, (match) =>
                        "*".repeat(match.length)
                    ); // Replace with asterisks
                    const regex = new RegExp(`\\b${word}\\b`, "gi"); // Create regex for each blocked word
                    if (regex.test(text)) {
                        hasBlockedWords = true; // Set flag to true if a blocked word is found

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
        if (hasBlockedWords) {
            alert("Cette page contient des mots bloqués !");
        }
    });
}

window.addEventListener("DOMContentLoaded", (event) => {
    blockWords();
});
