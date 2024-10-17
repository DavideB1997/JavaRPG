<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>JRPG - Creazione Personaggio</title>
<link rel="stylesheet" type="text/css"
	href="assets/creazionePersonaggio.css">
<script>
    function redirectToGame() {
        // Usa il setTimeout per ritardare il reindirizzamento
        setTimeout(function() {
            window.location.href = 'game.jsp';
        }, 1000); // Attende 1 secondo per dare tempo al server di elaborare il form
    }
</script>
</head>
<body
	style="background-image: url('sfondo-personaggio.png'); background-size: cover; background-position: center; background-repeat: no-repeat;">
	<nav class="navbar">
		<div class="navbar-container">
			<button class="back-button" onclick="window.location.href='home.jsp'">Torna
				alla Home</button>
			<h1 class="game-title">Crea il tuo personaggio</h1>
		</div>
	</nav>

	<div class="character-creation-container">
		<!-- Lato destro: Form per creare il personaggio -->
		<form action="CreazionePersonaggio" method="POST"
			class="character-form" onsubmit="redirectToGame()">

			<!-- Scelta del personaggio -->
			<h3>Seleziona il tuo personaggio:</h3>


			<div class="character-selection">
				<label> <input type="radio" name="selectedSprite"
					value="cavaliere" checked> <img src="sprite1.gif"
					alt="Personaggio 1" width="100" height="auto">
				</label> <label> <input type="radio" name="selectedSprite"
					value="fata"> <img src="sprite2.gif" alt="Personaggio 2"
					width="100" height="auto">
				</label> <label> <input type="radio" name="selectedSprite"
					value="gnomo"> <img src="sprite3.gif" alt="Personaggio 3"
					width="100" height="auto">
				</label>
			</div>


			<!-- Nome del personaggio -->
			<h2>Nome del Personaggio:</h2>
			<input type="text" id="character-name" name="characterName"
				placeholder="Inserisci nome" required>

			<!-- Armi disponibili -->
			<h3>Armi disponibili</h3>
			<div class="weapon-container">
				<div class="image-grid">
					<label for="weapon1"> <input type="radio" id="weapon1"
						name="weapon" value="spada" checked> <img src="spada.png"
						alt="Spada" width="auto">
					</label> <label for="weapon2"> <input type="radio" id="weapon2"
						name="weapon" value="bacchetta"> <img src="bacchetta.png"
						alt="Bacchetta" width="auto">
					</label> <label for="weapon3"> <input type="radio" id="weapon3"
						name="weapon" value="mazza"> <img src="mazza.png"
						alt="Mazza" width="auto">
					</label> <label for="weapon4"> <input type="radio" id="weapon4"
						name="weapon" value="martello"> <img src="martello.png"
						alt="Martello" width="auto">
					</label>
				</div>
			</div>


			<!-- Oggetti di base -->
			<h3>Oggetti di base</h3>
			<div class="items-container">
				<div class="image-grid">
					<label for="oggetto1"> <input type="radio" id="oggetto1"
						name="pozione" value="cura" checked> <img src="cura.gif"
						alt="Pozione Cura" width="auto" height="50">
					</label> <label for="oggetto2"> <input type="radio" id="oggetto2"
						name="pozione" value="mana"> <img src="mana.gif"
						alt="Pozione Mana" width="auto" height="50">
					</label> <label for="oggetto3"> <input type="radio" id="oggetto3"
						name="pozione" value="danno"> <img src="danno.gif"
						alt="Pozione Danno" width="auto" height="50">
					</label> <label for="oggetto4"> <input type="radio" id="oggetto4"
						name="pozione" value="cura+mana"> <img src="mana-cura.gif"
						alt="Pozione Cura + Mana" width="auto" height="50">
					</label>
				</div>
			</div>
			
			
			

			<!-- Pulsante per inviare il form -->
			<button type="submit" id="start-adventure" class="styled-button">
				Inizia la tua avventura</button>
		</form>
	</div>


	<footer class="footer">
		<p>&copy; 2024 JavaRPG. Gruppo 1.</p>
	</footer>
	<script>
        // Gestisci l'invio del modulo e il reindirizzamento
        document.querySelector('.character-form').addEventListener('submit', function(e) {
            // Impedisce il comportamento predefinito
            e.preventDefault(); 

            // Invia il modulo in modo asincrono
            fetch(this.action, {
                method: this.method,
                body: new URLSearchParams(new FormData(this)),
            }).then(response => {
                if (response.ok) {
                    // Attendi un secondo e poi reindirizza
                    redirectToGame();
                } else {
                    // Gestisci eventuali errori
                    alert('Errore durante l\'invio del modulo. Riprova.');
                }
            });
        });
    </script>
</body>
</html>
