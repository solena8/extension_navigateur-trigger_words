window.addEventListener("DOMContentLoaded", (event) => {
    // Add event listener for the "Extract Text" button
    const extractButton = document.getElementById("extractButton");
    if (extractButton) {
        extractButton.addEventListener("click", function () {
            // Execute the text extraction function in the active tab
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                if (tabs[0].id !== undefined) {
                    chrome.scripting.executeScript(
                        {
                            target: { tabId: tabs[0].id },
                            func: extractTextFromPage, // Use `func` instead of `function`
                        },
                        (results) => {
                            const resultElement = document.getElementById("result");
                            if (resultElement) {
                                if (results && results[0].result) {
                                    resultElement.textContent = "Extracted Text: " + results[0].result;
                                } else {
                                    resultElement.textContent = "No text found!";
                                }
                            }
                        }
                    );
                }
            });
        });
    }
});

// Function to be executed as a content script in the active tab
function extractTextFromPage(): string {
    // List of tags to ignore
    const ignoreTags: string[] = ["SCRIPT", "STYLE", "NOSCRIPT", "IFRAME", "OBJECT"];

    // Recursive function to extract text while filtering out undesired tags
    function getTextFromNode(node: Node): string {
        let text = "";

        node.childNodes.forEach(child => {
            if (ignoreTags.includes(child.nodeName)) {
                // Ignore specified tags
                return;
            }

            if (child.nodeType === Node.TEXT_NODE) {
                // Add text from text nodes
                text += (child as Text).textContent;
            } else {
                // Recurse on other types of nodes
                text += getTextFromNode(child);
            }
        });

        return text;
    }

    // Start with the body to retrieve all text
    const body = document.body;
    if (!body) return '';

    const pageText = getTextFromNode(body);
    return pageText.trim(); // Remove extra spaces
}
