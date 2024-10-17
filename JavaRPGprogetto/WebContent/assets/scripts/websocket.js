let socket;
let playerList = [];
let playerPositions = {};
let intervalId;
let roomCode;
let playerId;



function generateRandomCode() {
    return Math.random().toString(36).substr(2, 5); // Generate a random 5-character code
}

// Function to connect to the WebSocket
function connect() {
	
    // Connect to the WebSocket
    socket = new WebSocket("ws://" + location.host + "/JavaRPGprogetto/stanze");
	console.log(socket)

    // Connection open event
    socket.onopen = function(event) {
        console.log("Connected to WebSocket!");
    };

    // Connection close event
    socket.onclose = function(event) {
        console.log("WebSocket closed:", event);
        alert("Connection to server lost. Reconnecting...");
        setTimeout(connect, 1000); // Reconnect after 1 second
    };

    // Error event
    socket.onerror = function(error) {
        console.error("WebSocket error:", error);
    };

    // Message received event
    socket.onmessage = function(event) {
        console.log("Message received: ", event.data);

        // Attempt to parse the message as JSON
        let data;
        try {
            data = JSON.parse(event.data);
        } catch (e) {
            data = event.data; 
        }

		
		handleStringMessages(data);
		
		/*
        // Handle player updates and player list
        if (data.type) {
            switch (data.type) {
                case 'removePlayer':
                    removePlayer(data.id);
                    playerList = playerList.filter(player => player.id !== data.id); // Remove from list
                    break;
                case 'updatePlayer':
                    updatePlayerInScene(data.player);
                    updatePlayerList(data.player); // Update the player list if necessary
                    break;
            }
        } else {
			handleStringMessages(data);
        }
		*/
    };
}

// Function to handle string messages
function handleStringMessages(data) {
	if (typeof data === 'string') {
		if (data.startsWith("Sei entrato nella stanza: ")) {
			
			roomCode = data.split(":")[1].trim();
			
			//devo prendere da qui l'id user
			console.log("Joined room:", roomCode);
			

		} else if (data.startsWith("Sei uscito dalla stanza:")) {
		    const parts = data.split(":");
		    const room = parts[1];
		    const id = parts[2];   

		    const myScene = game.scene.getScene('MyScene');

		    if (myScene) {
		        console.log(playerList);

		        // Filtra e rimuovi tutti i giocatori che NON hanno l'ID specificato
		        playerList = playerList.filter(p => {
		            const isDifferent = p.playerId !== id; // Verifica se l'ID è diverso
		            if (isDifferent) {
		                removePlayer(p.playerId); // Rimuove il giocatore dalla scena
		            }
		            return isDifferent; // Restituisce true se il giocatore deve rimanere nella lista
		        });
		    }
		} else if (data.startsWith("newPlayer:")) {
			let NewPlayerData = {
				playerRoom: data.split(":")[1].trim(),
				playerId: data.split(":")[2].trim(),
				playerX: data.split(":")[3].trim(),
				playerY: data.split(":")[4].trim()
			};

			
			console.log(NewPlayerData.playerId)
			addPlayerToScene(NewPlayerData);
			playerList.push(NewPlayerData);

		} else if (data.startsWith("positionUpdate:")) {

			let NewPlayerData = {
				playerRoom: data.split(":")[1].trim(),
				playerId: data.split(":")[2].trim(),
				playerX: data.split(":")[3].trim(),
				playerY: data.split(":")[4].trim()
			};

			updatePlayerInScene(NewPlayerData)
		} else if(data.startsWith("playerRemoved:")){
			const parts = data.split(":");
			const room = parts[1];
			const id = parts[2];   
			
			
			removePlayer(id)
		}
		
		//playerremoved
		
		
		
		
		else
			console.warn("Unknown message type: ", event.data);
	}
}

// Function to add a new player to the scene
function addPlayerToScene(player) {
    const myScene = game.scene.getScene('MyScene');
    
    const roomCode = player.playerRoom;
    const playerId = player.playerId;
    const playerX = parseFloat(player.playerX); // Ensure it's a number
    const playerY = parseFloat(player.playerY); // Ensure it's a number

    if (!myScene.heroes[playerId]) {
        console.log(`Adding player to scene: ID: ${playerId}`);
        myScene.addHero(playerId, playerX, playerY);
        playerPositions[playerId] = { x: playerX, y: playerY };
    } else {
        console.warn(`Player ${playerId} already exists in scene.`);
    }
}



function updatePlayerInScene(playerData) {

	
	const roomCode = playerData.playerRoom; // Make sure this matches the structure
	const playerId = playerData.playerId;
	const playerX = parseFloat(playerData.playerX); // Ensure it's a number
	const playerY = parseFloat(playerData.playerY); // Ensure it's a number
	
	
	
	

    // Validate position data before proceeding
    if (isNaN(playerX) || isNaN(playerY)) {
        console.error(`Invalid position update for player ${playerId}: X=${playerX}, Y=${playerY}`);
        return; // Exit if position data is invalid
    }

    // Get the active scene
    const myScene = game.scene.getScene('MyScene');

    // Check if the room matches before updating
    if (myScene.currentRoom !== roomCode) {
        console.log(`Cannot update player ${playerId} because the active room is not ${roomCode}`);
        return; // Exit the function if the rooms don't match
    }

    // Find the player in the scene and update their position
    const existingPlayer = myScene.heroes ? myScene.heroes[playerId] : null; // Ensure `myScene.players` exists

    if (existingPlayer) {
        existingPlayer.setPosition(playerX, playerY); // Update position
        playerPositions[playerData.playerId] = { x: playerX, y: playerY }; // Update the stored position
    } else {
        console.warn(`Player with ID ${playerId} not found in scene.`);
        addPlayerToScene(playerData);
    }
}




// Define the movement threshold
const positionThreshold = 5; // units for significant movement

// Store last known positions for players
let lastPlayerPositions = {}; // Object to store last positions

function redrawPlayers() {
    const myScene = game.scene.getScene('MyScene');
    for (let playerId in playerPositions) {
        const pos = playerPositions[playerId];
        const player = myScene.heroes[playerId];

        // Initialize last position if it doesn't exist
        if (!lastPlayerPositions[playerId]) {
            lastPlayerPositions[playerId] = { x: pos.x, y: pos.y };
        }

        // Calculate distance moved from last known position
        const lastPos = lastPlayerPositions[playerId];
        const distanceMoved = Math.sqrt(
            Math.pow(pos.x - lastPos.x, 2) + Math.pow(pos.y - lastPos.y, 2)
        );

        // Only update if the distance moved is greater than the threshold
        if (distanceMoved > positionThreshold) {
            player.setPosition(pos.x, pos.y); // Update position
            // Update the last known position
            lastPlayerPositions[playerId] = { x: pos.x, y: pos.y };
			console.log(`Player ${playerId} has not moved significantly. Current position: (${pos.x}, ${pos.y})`);
			
        } 
    }
}



// Function to update the player list with the latest data
function updatePlayerList(playerData) {
    const playerIndex = playerList.findIndex(p => p.id === playerData.id);
    if (playerIndex !== -1) {
        playerList[playerIndex] = playerData; // Update the player data in the list
    }
}


function removePlayer(playerId) {
    const myScene = game.scene.getScene('MyScene');
	
	
    console.log(`Attempting to remove player with ID: ${playerId}`);
    console.log("Current heroes in scene before removal:", myScene.heroes);

    if (myScene && myScene.heroes[playerId]) {
        console.log(`Hero found with ID: ${playerId}. Proceeding with removal.`);
        myScene.removeHero(playerId);
		
		
        playerList = playerList.filter(p => p.playerId != playerId); // Filtra i giocatori
		
		
        console.log(`Successfully removed player with ID: ${playerId}`);
    } else {
        console.warn(`Player with ID ${playerId} not found in scene. Cannot remove.`);
    }

    console.log("Current heroes in scene after removal:", myScene.heroes);
}


// Join button event listener
document.getElementById("joinButton").onclick = function() {
    const roomCode = "prateria"

    // Only set playerId if it's not already set
    if (!playerId) {
        playerId = Math.random().toString(36).substr(2, 9); 
    }

    console.log(socket && socket.readyState === WebSocket.OPEN);
    console.log(playerId);
	
	

    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send("join:" + roomCode + ":" + playerId);
        console.log("Join room request sent: " + roomCode);

        const foundPlayers = playerList.filter(player => player.id === playerId);

        if (foundPlayers.length === 0) {
            console.log(`Player with ID ${playerId} is not in the player list.`);
        } else {
            console.log(`Player with ID ${playerId} is already in the player list.`);
        }

        // Get the active scene
        const myScene = game.scene.getScene('MyScene');
		myScene.currentRoom = roomCode;

		
		
        // Check if the player exists, otherwise add it
        if (!myScene.myPlayer) {
            const initialPosition = { x: 700, y: 220 }; // You can modify the initial coordinates
            console.log("Adding player to scene.");
            myScene.myPlayer = myScene.addHero(playerId, initialPosition.x, initialPosition.y);
        }
		
		
		
		// Variabili per tenere traccia dell'ultima posizione
		let lastX = null;
		let lastY = null;
		const positionThreshold = 5; // Invia un aggiornamento solo se la differenza di posizione è maggiore di 5 unità

		// Dopo esserti unito, invia i dati sulla posizione e ricevi le posizioni degli altri
		intervalId = setInterval(() => {
		    if (myScene.myPlayer) {
		        const playerX = myScene.myPlayer.x;
		        const playerY = myScene.myPlayer.y;

		        // Controlla se la posizione è cambiata di più del threshold
		        if (lastX === null || lastY === null || 
		            Math.abs(playerX - lastX) > positionThreshold || 
		            Math.abs(playerY - lastY) > positionThreshold) {
		            
		            lastX = playerX; // Aggiorna l'ultima posizione X
		            lastY = playerY; // Aggiorna l'ultima posizione Y
					
		            if (socket && socket.readyState === WebSocket.OPEN) {
		                // Invia i dati sulla posizione
		                socket.send("positionUpdate:" + roomCode + ":" + playerId + ":" + playerX + ":" + playerY);
		            } else {
		                clearInterval(intervalId);
		            }
					
		        }
		    }
			
			redrawPlayers();
			
		}, 1000 / 30); // Verifica ogni 100ms, ovvero 10 volte al secondo

    }
};

// Leave room button event listener
document.getElementById("leaveRoomButton").onclick = function() {
    const roomCode = "prateria"
    
    if (socket && socket.readyState === WebSocket.OPEN) {
        console.log("Sending leave message for room:", roomCode, "and player:", playerId);
		
		
        socket.send("leave:" + roomCode + ":" + playerId); // Invio del messaggio leave
    } else {
        console.error("Socket not open. Unable to send message.");
    }
};



