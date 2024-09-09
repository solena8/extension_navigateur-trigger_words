export function blockWords() {
    let hasBlockedWords = false;

    // Check if we are in the popup context
    if (document.getElementById('wordList')) {
        return; // Skip processing if it's the popup context
    }

    chrome.storage.sync.get(["blockedWords"], (result) => {
        const blockedWords: string[] = result.blockedWords || [];

        function traverse(node: Node) {
            if (node.nodeType === Node.TEXT_NODE) {
                let text = (node as Text).textContent || "";
                blockedWords.forEach((word) => {
                    const regex = new RegExp(`\\b${word}\\w{0,2}\\b`, "gi");

                    if (regex.test(text)) {
                        hasBlockedWords = true;
                        text = text.replace(regex, (match) =>
                            "*".repeat(match.length)
                        );
                    }
                });
                (node as Text).textContent = text;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
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

// Ensure the function runs when the DOM is fully loaded
window.addEventListener("DOMContentLoaded", () => {
    blockWords();
});

// Observe for changes in the DOM (for dynamic content)
const observer = new MutationObserver(() => {
    blockWords();
});

observer.observe(document.body, { childList: true, subtree: true });
