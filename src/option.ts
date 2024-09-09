document.addEventListener("DOMContentLoaded", () => {
    const wordInput = document.getElementById("wordInput") as HTMLInputElement;
    const addWordButton = document.getElementById(
        "addWordButton"
    ) as HTMLButtonElement;
    const resultContainer = document.getElementById("result") as HTMLDivElement;
    const wordItemTemplate = document.getElementById(
        "wordItemTemplate"
    ) as HTMLTemplateElement;

    // Fonction pour ajouter un mot à la liste
    addWordButton.addEventListener("click", () => {
        const word = wordInput.value.trim(); // Récupère le mot entré

        if (word) {
            // Clone le template de mot
            const wordItem = document.importNode(
                wordItemTemplate.content,
                true
            );

            // Ajoute le mot dans l'élément <span> de la classe "word-text"
            const wordText = wordItem.querySelector(
                ".word-text"
            ) as HTMLSpanElement;
            wordText.textContent = word;

            // Ajoute un événement au bouton "✖" pour supprimer le mot
            const removeWordButton = wordItem.querySelector(
                ".remove-word-button"
            ) as HTMLButtonElement;
            removeWordButton.addEventListener("click", function () {
                this.parentElement?.remove();
            });

            // Ajoute l'élément de mot à la liste
            resultContainer.appendChild(wordItem);

            // Efface la zone de texte après l'ajout
            wordInput.value = "";
        }
    });
});
