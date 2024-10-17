<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>JRPG - Profilo</title>
<!-- Collegamento al file CSS -->
<link rel="stylesheet" href="assets/profilo.css">
<%@page import="model.Utente"%>
<%@page import="java.util.*"%>
<%@page import="model.Personaggio"%>
</head>
<body
	style="background-image: url('sfondo-login.png'); background-size: cover; background-position: center; background-repeat: no-repeat;">
	<!-- Navbar -->
	<nav class="navbar">
		<div class="navbar-container">
			<h1 class="game-title">JRPG</h1>
			<div class="navbar-buttons">
				<button class="animated-button"
					onclick="window.location.href='home.jsp'">Torna alla Home</button>
			</div>
		</div>
	</nav>
	<%
	Utente u = (Utente) session.getAttribute("utente");
	%>
	<%
	List<Personaggio> personaggi = (List<Personaggio>) session.getAttribute("personaggi");
	%>
	<!-- Sezione Profilo -->
	<div class="profile-container">
		<h2>Profilo Utente</h2>
		<div class="user-info">
			<p>
				<strong>Username:</strong> <span id="usernameDisplay"> <%=u.getNome()%>
				</span>
			</p>
			<p>
				<strong>Email:</strong> <span id="emailDisplay"> <%=u.getEmail()%>
				</span>
			</p>
			<p>
				<strong>Posizione in Classifica:</strong> <span id="rankDisplay">
					<%
					if (personaggi != null && !personaggi.isEmpty() && personaggi.get(0) != null) {
					%> <%=personaggi.get(0).getPosizioneLb()%> <%
 } else {
 %>
					<p>Nessun personaggio disponibile</p> <%
 }
 %>
				</span>
			</p>
		</div>

		<h2>I tuoi Personaggi</h2>

		<!-- Scorrimento dei personaggi -->
		<div class="character-selection">
			<div class="character-container">
				<img id="character-sprite" src="default_sprite.png"
					alt="Personaggio" class="character-sprite">
				<div class="character-details">
					<h4 id="character-name">
						<%
						if (personaggi != null && !personaggi.isEmpty() && personaggi.get(0) != null) {
						%>
						<%=personaggi.get(0).getNome()%>
						<%
						} else {
						%>
						<p>Nessun personaggio disponibile</p>
						<%
						}
						%>
					</h4>
					<p>
						<strong>Caratteristiche:</strong>
					</p>
					<ul id="character-stats">
						<li>Attacco: <%
						if (personaggi != null && !personaggi.isEmpty() && personaggi.get(0) != null) {
						%> <%=personaggi.get(0).getAttacco()%> <%
 } else {
 %>
							<p>Attacco non disponibile</p> <%
 }
 %>
						</li>
						<li>Livello: <%
						if (personaggi != null && !personaggi.isEmpty() && personaggi.get(0) != null) {
						%> <%=personaggi.get(0).getCurrentLevel()%> <%
 } else {
 %>
							<p>Livello non disponibile</p> <%
 }
 %>
						</li>
					</ul>
					<p>
						<strong>Equipaggiamento:</strong> <span id="character-gear">
							<%
							if (personaggi != null && !personaggi.isEmpty() && personaggi.get(0) != null) {
							%> <%=personaggi.get(0).getArmaEquipaggiata()%>, <%=personaggi.get(0).getArmaturaEquipaggiata()%>
							<%
							} else {
							%>
							<p>Equipaggiamento non disponibile</p> <%
 }
 %>

						</span>
					</p>
				</div>
			</div>
			<div class="arrows-container">
				<button id="prev-character" class="arrow-button animated-button">
					<</button>
				<button id="next-character" class="arrow-button animated-button">
					></button>
			</div>
		</div>

		<!-- Modifica profilo -->
		<button class="animated-button" id="editProfileButton">
			Modifica Profilo</button>
		<form action="UpdateProfileServlet" method="post" id="profileForm"
			style="display: none;">
			<label for="newUsername">Nuovo Username:</label> <input type="text"
				id="newUsername" name="newUsername" required> <label
				for="newEmail">Nuova Email:</label> <input type="text" id="newEmail"
				name="newEmail" required> <label for="newPassword">Nuova
				Password:</label> <input type="text" id="newPassword" name="newPassword"
				required>

			<button type="submit" id="updateButton" class="animated-button">Aggiorna
				Dati</button>
		</form>
	</div>

	<footer class="footer">
		<p>&copy; 2024 Another Magic Game. Gruppo 1.</p>
	</footer>

	<!-- Collegamento al file JavaScript -->
	<script src="script.js/profilo.js"></script>
</body>
</html>