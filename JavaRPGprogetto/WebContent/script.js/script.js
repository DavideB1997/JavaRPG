let loggedIn = false;

document.addEventListener("DOMContentLoaded", () => {
    const loginLink = document.getElementById("loginLink");
    const userNameDisplay = document.getElementById("userName");
	
	
	/*
	    if (loggedIn) {
	        userNameDisplay.textContent = "Benvenuto, Nome Utente"; // Sostituisci con il nome utente effettivo
	        userNameDisplay.classList.remove("hidden");
	        loginLink.classList.add("hidden");
	    } else {
	        userNameDisplay.classList.add("hidden");
	        loginLink.classList.remove("hidden");
	    }
	*/
	
	
	
	if(loggedIn){
		// Gestione del pulsante per continuare o iniziare un nuovo gioco
		   const continueGameButton = document.getElementById("continueGame");
		   const newGameButton = document.getElementById("newGame");

		   continueGameButton.addEventListener("click", () => {
		       // Logica per continuare il gioco
		   });

		   newGameButton.addEventListener("click", () => {
		       // Logica per iniziare un nuovo gioco
		   });
	}
   
});




document.addEventListener("DOMContentLoaded", () => {
    const loadingOverlay = document.getElementById("loadingOverlay");
  

    // Logica di caricamento
    loadingOverlay.style.display = "flex"; // Mostra l'overlay di caricamento

    // Simula un ritardo nel caricamento del contenuto
    setTimeout(() => {
        loadingOverlay.style.opacity = "0"; // Fai svanire l'overlay
        setTimeout(() => {
            loadingOverlay.style.display = "none"; // Nascondi l'overlay
        }, 500); // Aspetta che l'animazione di svanimento sia finita
    }, 3000); // Tempo di attesa (3 secondi, modifica se necessario)

 });
 
 
if(loggedIn){
	document.getElementById('userName').addEventListener('click', function() {
	    const dropdownMenu = document.querySelector('.dropdown-menu');
	    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
	});
}


 window.onclick = function(event) {
     if (!event.target.matches('#userName')) {
         const dropdowns = document.getElementsByClassName("dropdown-menu");
         for (let i = 0; i < dropdowns.length; i++) {
             const openDropdown = dropdowns[i];
             if (openDropdown.style.display === 'block') {
                 openDropdown.style.display = 'none';
             }
         }
     }
 };

 


 

