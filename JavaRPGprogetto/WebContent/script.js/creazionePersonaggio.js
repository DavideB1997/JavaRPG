let currentSpriteIndex = 0;
let spriteArray = []; // Questo array sarà popolato con i link delle immagini dei personaggi dal database

// Simulazione del caricamento delle sprite (sarà necessario sostituire con una chiamata DB)
document.addEventListener('DOMContentLoaded', () => {
    spriteArray = ["sprite1.png", "sprite2.png", "sprite3.png"]; // Questo deve essere popolato con le immagini dal DB
    document.getElementById('character-sprite').src = spriteArray[currentSpriteIndex];
});

document.getElementById('next-sprite').addEventListener('click', () => {
    currentSpriteIndex = (currentSpriteIndex + 1) % spriteArray.length;
    document.getElementById('character-sprite').src = spriteArray[currentSpriteIndex];
});

document.getElementById('prev-sprite').addEventListener('click', () => {
    currentSpriteIndex = (currentSpriteIndex - 1 + spriteArray.length) % spriteArray.length;
    document.getElementById('character-sprite').src = spriteArray[currentSpriteIndex];
});
let selectedWeaponId = null; // Variabile per tracciare l'arma selezionata

// Gestione della selezione dell'arma
document.querySelectorAll('.weapon').forEach(item => {
    item.addEventListener('click', function () {
        // Rimuove la classe "selected" da tutte le armi
        document.querySelectorAll('.weapon').forEach(weapon => {
            weapon.classList.remove('selected');
        });

        // Aggiunge la classe "selected" all'arma cliccata
        this.classList.add('selected');

        // Salva l'ID dell'arma selezionata
        selectedWeaponId = this.getAttribute('data-weapon-id');
    });
});

// Funzione per salvare i dati al click su "Inizia la tua avventura"
document.getElementById('start-adventure').addEventListener('click', function() {
    const characterName = document.getElementById('character-name').value;
    const characterSprite = document.getElementById('character-sprite').src;
    let characterRace = characterSprite.includes("fata") ? "fata" : "mago";

    if (!characterName || !selectedWeaponId) {
        alert("Per favore inserisci il nome del personaggio e seleziona un'arma.");
        return;
    }

    // Simulazione di invio dati al database
    fetch('/creaPersonaggio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome: characterName,
            razza: characterRace,
            armaId: selectedWeaponId,
            // Si può includere l'idUtente dalla sessione tramite backend
        }),
    }).then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'game.jsp'; // Reindirizzamento dopo la creazione del personaggio
        } else {
            alert('Errore nella creazione del personaggio.');
        }
    });
});

