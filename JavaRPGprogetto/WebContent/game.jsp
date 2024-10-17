<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> JRPG - Gioco</title>
    <!-- Collegamento al file CSS -->
    <link rel="stylesheet" href="assets/game.css">
</head>
<body onload="connect()" style="background-color: #2a2e1f;">
    <!-- Navbar -->
    <nav class="navbar">
        <div class="navbar-container">
            <button class="back-button" onclick="window.location.href='home.jsp'">Torna alla Home</button>
             <span class="game-title"> JavaRPG </span>
        </div>
    </nav>

    <!-- Sezione per caricare la mappa -->
    <div class="game-container">
        <h2>Benvenuto!</h2>
        
        <button id="joinButton">Entra nella Stanza</button>
  		<button id="leaveRoomButton">Esci dalla Stanza</button>
        
        
        <div id="mapArea">
        </div>
    </div>

     <footer class="footer">
        <p>&copy; 2024 JavaRPG. Gruppo 1.</p>
    </footer>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.55.2/phaser.min.js"></script>

    <script src="assets/scripts/websocket.js" defer></script> 
    
    <script src="assets/scripts/classiCombat.js" defer></script>
    <script src="assets/scripts/CombatScene.js" defer></script> 
    <script src="assets/scripts/InternoCasa.js" defer></script> 
    <script src="assets/scripts/Dungeon.js" defer></script> 
    <script src="assets/scripts/Prateria.js" defer></script> 
    <script src="assets/scripts/main.js" defer></script> 
</body>
</html>
