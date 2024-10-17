const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');

// Oggetto con credenziali valide
const validCredentials = {
    username: 'tuoUsername',  
    password: 'tuaPassword'   
};

// Listener per mostrare il form di registrazione
showRegister.addEventListener('click', function(event) {
    event.preventDefault(); 
    loginForm.classList.add('hidden'); 
    registerForm.classList.remove('hidden');
    loginButton.style.display = 'none';
    registerButton.style.display = 'block';
});

// Listener per mostrare il form di login
showLogin.addEventListener('click', function(event) {
    event.preventDefault(); 
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    loginButton.style.display = 'block';
    registerButton.style.display = 'none';
});

