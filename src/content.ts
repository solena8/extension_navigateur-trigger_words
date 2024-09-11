export function blockWords() {
    let hasBlockedWords = false;
    let blockedWordCount = 0; // Compteur pour le nombre de mots bloqués

    // Check if we are in the popup
    if (document.getElementById("wordList")) {
        return; // Skip processing if it's the popup
    }

    chrome.storage.sync.get(["blockedWords"], (result) => {
        const blockedWords: string[] = result.blockedWords || [];

        function traverse(node: Node) {
            if (node.nodeType === Node.TEXT_NODE) {
                let text = (node as Text).textContent || "";
                blockedWords.forEach((word) => {
                    const accentMap: { [key: string]: string } = {
                        a: "[aàáâäãåAÀÁÂÄÃÅ]",
                        e: "[eéèêëEÉÈÊË]",
                        i: "[iíîïIÍÎÏ]",
                        o: "[oòóôöõOÒÓÔÖÕ]",
                        u: "[uùúûüUÙÚÛÜ]",
                    };

                    // Normalize both accented and unaccented characters
                    const normalizeWord = (word: string) => {
                        return word.replace(
                            /[aeiouáàâäãåéèêëíîïóòôöõúûü]/gi,
                            (match) => {
                                const lowerMatch = match.toLowerCase();
                                return accentMap[lowerMatch] || match;
                            }
                        );
                    };

                    // Create the regex to match words with 0-2 extra characters
                    const regex = new RegExp(
                        `\\b${normalizeWord(word)}\\w{0,2}\\b`,
                        "gi"
                    );

                    const matches = text.match(regex);
                    if (matches) {
                        hasBlockedWords = true;
                        blockedWordCount += matches.length; // Ajoute le nombre de correspondances trouvées
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

        // Traverse all nodes in the body
        traverse(document.body);

        // Si des mots bloqués ont été trouvés, afficher le nombre dans l'alerte
        if (hasBlockedWords) {
            alert(`Cette page contient ${blockedWordCount} mot(s) bloqué(s) !`);
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
