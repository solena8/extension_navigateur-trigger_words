(() => {
    // Récupère tout le texte de la page
    const pageText: string = document.body.innerText;
  
    // Envoie le texte au background script
    chrome.runtime.sendMessage({ text: pageText });
  })();