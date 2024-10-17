<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JRPG - Creazione Personaggio</title>
    <link rel="stylesheet" type="text/css" href="assets/creazionePersonaggio.css">
    <script src="script.js/creazionePersonaggio.js" defer></script>
</head>
<body style="background-image: url('sfondo-personaggio.png'); background-size: cover; background-position: center; background-repeat: no-repeat;">
    <nav class="navbar">
        <div class="navbar-container">
            <button class="back-button" onclick="window.location.href='home.jsp'">Torna alla Home</button>
            <h1 class="game-title">Crea il tuo personaggio</h1>
        </div>
    </nav>

    <div class="character-creation-container">
        <!-- Scorrimento Sprite -->
        <div class="character-selection">
            <button id="prev-sprite" class="arrow-button">&lt;</button>
            <div class="sprite-container">
                <img id="character-sprite" src="default_sprite.png" alt="Personaggio">
            </div>
            <button id="next-sprite" class="arrow-button">&gt;</button>
        </div>

        <!-- Lato destro: Form per creare il personaggio -->
        <div class="character-form">
            <form action="CreaPersonaggioServlet" method="post" onsubmit="return validateForm()">
                <label for="character-name">
                    <h2>Nome del Personaggio:</h2>
                </label>
                <input type="text" id="character-name" name="nomePersonaggio" placeholder="Inserisci nome" required>
                
                <!-- Sezione Armi -->
                <div id="weapon-container">
                    <h3>Armi disponibili</h3>
                    <div class="image-grid">
                        <div class="grid-item weapon" data-weapon-id="1" onclick="selectWeapon(1)">
                            <img src="arma1.png" alt="Spada">
                        </div>
                        <div class="grid-item weapon" data-weapon-id="2" onclick="selectWeapon(2)">
                            <img src="arma2.png" alt="Mazza">
                        </div>
                        <div class="grid-item weapon" data-weapon-id="3" onclick="selectWeapon(3)">
                            <img src="arma3.png" alt="Ascia">
                        </div>
                        <div class="grid-item weapon" data-weapon-id="4" onclick="selectWeapon(4)">
                            <img src="arma4.png" alt="Coltello">
                        </div>
                    </div>
                </div>

                <!-- Input nascosto per salvare l'arma selezionata -->
                <input type="hidden" id="selected-weapon-id" name="armaId" value="">

                <!-- Oggetti di base -->
                <h3>Oggetti di base</h3>
                <div id="items-container">
                    <div class="image-grid">
                        <div class="grid-item"></div>
                        <div class="grid-item"></div>
                        <div class="grid-item"></div>
                        <div class="grid-item"></div>
                    </div>
                </div>

                <!-- Pulsante per avviare l'avventura -->
                <button type="submit" id="start-adventure" class="styled-button">
                    Inizia la tua avventura
                    <div class="ball"></div>
                </button>
            </form>
        </div>
    </div>

    <footer class="footer">
        <p>&copy; 2024 Another Magic Game. Gruppo 1.</p>
    </footer>
</body>
</html>
