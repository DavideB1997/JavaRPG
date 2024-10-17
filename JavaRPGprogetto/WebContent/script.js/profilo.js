document.addEventListener("DOMContentLoaded", function() {
    const editProfileButton = document.getElementById("editProfileButton");
    const profileForm = document.getElementById("profileForm");
    const usernameDisplay = document.getElementById("usernameDisplay");
    const emailDisplay = document.getElementById("emailDisplay");
    const newUsername = document.getElementById("newUsername");
    const newEmail = document.getElementById("newEmail");
    const newPassword = document.getElementById("newPassword");
    const updateButton = document.getElementById("updateButton");

    // Mostra o nasconde il modulo di modifica profilo
    editProfileButton.addEventListener("click", function() {
        if (profileForm.style.display === "block") {
            // Nascondi il modulo
            profileForm.style.display = "none";
            usernameDisplay.parentElement.style.display = "block"; // Rendi visibili le informazioni
            emailDisplay.parentElement.style.display = "block";
        } else {
            // Mostra il modulo
            profileForm.style.display = "block";
            newUsername.value = usernameDisplay.textContent;
            newEmail.value = emailDisplay.textContent;

            // Nascondi il display delle informazioni
            usernameDisplay.parentElement.style.display = "none";
            emailDisplay.parentElement.style.display = "none";
        }
    });

    // Aggiorna i dati del profilo
    updateButton.addEventListener("click", function() {
        // Raccogli i dati dai campi di input
        const username = newUsername.value;
        const email = newEmail.value;
        const password = newPassword.value;

        // Effettua una chiamata al server per aggiornare i dati
        fetch('UpdateProfileServlet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Dati aggiornati con successo!');
                // Aggiorna i display
                usernameDisplay.innerText = username;
                emailDisplay.innerText = email;
                
                // Nascondi il modulo di modifica
                profileForm.style.display = "none";

                // Mostra di nuovo le informazioni aggiornate
                usernameDisplay.parentElement.style.display = "block";
                emailDisplay.parentElement.style.display = "block";

                // Resetta i campi di input
                newUsername.value = '';
                newEmail.value = '';
                newPassword.value = '';
            } else {
                alert('Errore nell\'aggiornamento dei dati.');
            }
        })
        .catch(error => {
            console.error('Errore:', error);
        });
    });
});
