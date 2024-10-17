<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.List"%>
<%@ page import="model.LeaderboardEntry"%>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> JavaRPG - Home</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
    <div id="loadingOverlay" class="loading-overlay">
        <div class="loading-content">
            <img src="caricamento copia.gif" alt="Caricamento" class="loading-icon">
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
            <p>Caricamento...</p>
        </div>
    </div>

    <!-- Navbar -->
    <nav class="navbar">
        <h1 class="game-title"> JavaRPG </h1>
        <div class="profile-area">
            <%
            String username = (String) session.getAttribute("username");
            if (username != null) {
            %>
            <div class="dropdown">
                <span id="userName" class="dropdown-toggle">Benvenuto, <%= username %></span>
                <div class="dropdown-menu">
                    <a href="profilo.jsp">Profilo</a>
                    <a href="logout.jsp">Logout</a>
                </div>
            </div>
            <%
            } else {
            %>            
            <a href="login.jsp" id="loginLink"><button id="loginButton" class="animated-button"> Login </button> </a>
            <%
            }
            %>
        </div>
    </nav>

    <div class="parallax-container">
        <div class="parallax-layer primo-layer">
            <img src="sfondo1.png" alt="prima immagine" class="parallax-image">
        </div>
        <div class="parallax-layer secondo-layer">
            <img src="sfondo2.png" alt="seconda immagine" class="parallax-image">
        </div>
        <div class="parallax-layer terzo-layer">
            <img src="sfondo3.png" alt="terza immagine" class="parallax-image">
        </div>
        <div class="parallax-layer quarto-layer">
            <img src="orcodio.png" alt="quarta-immagine" class="parallax-image">
        </div>

        <div class="content-layer">
            <h1> JRPG </h1>
        </div>
    </div>

    <div class="info-container" id="gameInfoContainer">
        <div class="info-item">
            <h2>Descrizione del Gioco</h2>
            <p>Personalizza il tuo avatar scegliendo tra varie classi: strega, licantropo, fata, ecc. Partecipa a una campagna interattiva, completando missioni e sconfiggendo nemici. Combatti contro creature magiche e nemici umani utilizzando incantesimi e armi. Aumenta di livello e sblocca nuove abilità, incantesimi e oggetti rari. Interagisci con NPC in villaggi e città per ottenere quest e comprare oggetti. Gioca con altri giocatori online, affrontando insieme missioni e boss.</p>
        </div>

        <div class="info-item">
            <h2>Funzionalità</h2>
            <p>
                Gioco multiplayer online <br> 
                Classi personalizzabili <br>
                Missioni e boss epici <br> 
                Oggetti e abilità uniche
            </p>
        </div>

        <div class="info-item">
            <h2>Informazioni</h2>
            <p>Versione: 1.0</p>
            <p>Creato da: Gruppo 1: Buglione Davide, Campa Ada, Laviola Giovanni Battista, Mandaglio Marta</p>
        </div>

        <!-- Sezione Gioco e Leaderboard -->
        <%
        if (username != null) { // Mostra solo se l'utente è loggato
        %>
        <div class="info-item">
            <h2>Gioca</h2>
            <div class="button-container">
                <button id="continueGame" class="animated-button" onclick="window.location.href='game.jsp'">Continua Gioco <div class="ball"></div>  </button>
                <button id="newGame" class="animated-button" onclick="window.location.href='creazionePersonaggio1.jsp'">Nuovo Gioco <div class="ball"></div> </button>
            </div>
        </div>

        <div class="info-item">
            <h2>Leaderboard</h2>
            <div id="leaderboardContainer">
                <%
                List<LeaderboardEntry> leaderboard = (List<LeaderboardEntry>) request.getAttribute("leaderboard");
                if (leaderboard != null && !leaderboard.isEmpty()) {
                    for (LeaderboardEntry entry : leaderboard) {
                %>
                <p><%= entry.getUserName() %> - <%= entry.getCharacterName() %> - Punti: <%= entry.getScore() %></p>
                <%
                    }
                } else {
                %>
                <p>Non ci sono dati disponibili per la leaderboard.</p>
                <%
                }
                %>
            </div>
        </div>
        <%
        } else { // Se l'utente non è loggato
        %>
        <div class="info-item">
            <h2>Accedi per giocare e vedere la leaderboard.</h2>
            <a href="login.jsp" class="login-button-link">
                <button id="loginButton" class="animated-button">Vai al Login <div class="ball"></div> <!-- La pallina animata --></button>
            </a>
        </div>
        <%
        }
        %>
    </div>

    <footer class="footer">
        <p>&copy; 2024 Another Magic Game. Gruppo 1.</p>
    </footer>

    <script src="script.js/script.js"></script>
</body>
</html>