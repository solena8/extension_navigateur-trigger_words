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
      const bodyText = document.body.textContent || "";
      return bodyText.trim() || "No text found!";
    }