<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>JRPG - Home</title>
<!-- Collegamento al file CSS -->
<link rel="stylesheet" href="assets/login.css">
</head>
<body style="background-image: url('sfondo-login.png'); background-size: cover; background-position: center; background-repeat: no-repeat;">

	<!-- Navbar -->
	<nav class="navbar">
		<div class="navbar-container">
			<button class="animated-button" onclick="window.location.href='home.jsp'">Torna alla Home</button>
		</div>
	</nav>

	<!-- Titolo -->
	<div class="header">
		<h1>JRPG</h1>
		<p>Scegli il tuo destino e avventurati nel mondo della magia</p>
	</div>

	<!-- Sezione di Login -->
	<div class="login-container">
		<!-- Scheda di login -->
		<div class="form-container" id="loginForm">
			<h2>Accedi</h2>
			<form id="login" action="UserLoginServlet" method="POST">
				<label for="username">Utente:</label> 
				<input type="text" id="username" name="username" required> 
				<label for="password">Password:</label> 
				<input type="password" id="password" name="password" required>
			</form>

			<!-- Pulsante di login -->
			<button id="loginButton" class="animated-button" type="submit" form="login">Login
				<div class="ball"></div>
			</button>

			<!-- Link per passare alla registrazione -->
			<p>
				Non hai un account? <a href="#" id="showRegister">Registrati</a>
			</p>
		</div>

		<!-- Scheda di registrazione (nascosta all'inizio) -->
		<div class="form-container hidden" id="registerForm">
			<h2>Registrati</h2>
			<form id="register" action="UserRegisterServlet" method="POST">
				<label for="newUsername">Utente:</label> 
				<input type="text" id="newUsername" name="newUsername" required> 
				<label for="newEmail">Email:</label> 
				<input type="email" id="newEmail" name="newEmail" required> 
				<label for="newPassword">Password:</label> 
				<input type="password" id="newPassword" name="newPassword" required>
				<label for="confirmPassword">Conferma Password:</label> 
				<input type="password" id="confirmPassword" name="confirmPassword" required>
			</form>

			<!-- Pulsante di registrazione -->
			<button id="registerButton" class="animated-button" type="submit" form="register" style="display: none;">Registrati
				<div class="ball"></div>
			</button>

			<p>
				Hai già un account? <a href="#" id="showLogin">Accedi</a>
			</p>
		</div>
	</div>

	<footer class="footer">
		<p>&copy; 2024 Another Magic Game. Gruppo 1.</p>
	</footer>

	<!-- Collegamento al file JavaScript -->
	<script src="script.js/login.js"></script>
</body>
</html>
