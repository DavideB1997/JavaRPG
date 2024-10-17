class InternoCasa extends Phaser.Scene {
	
    constructor() {
        super({ key: 'InternoCasa' });
		
		this.sceneKey= "InternoCasa"
		
        this.heroes = {}; // Oggetto per gestire più personaggi
        this.myPlayer = null; // Istanza del mio personaggio
        this.speed = 150; // Imposta la velocità del personaggio
        this.cursors = null; // Per i controlli della tastiera
        this.lastUpdateTime = 0; // Tempo dell'ultimo aggiornamento
        this.updateInterval = 1000 / 30; // Intervallo di aggiornamento per 30 FPS
		
		this.lastX=null;
		this.lastY=null;
		this.positionThreshold = 5;
    }
	
	
    preload() {
        this.load.image('interno', 'assets/tilesets/interno.png');
		
        this.load.tilemapTiledJSON('mappaInternoCasa', 'assets/maps/internocasa.json');
		
		
        this.load.spritesheet('hero', 'assets/mappe/cane.png', { frameWidth: 32, frameHeight: 32 });
    }

	
	
    create(data) {
		
		this.triggerZones = [];
		
        const map = this.make.tilemap({ key: 'mappaInternoCasa' });
		this.map = map;
		this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
		
        const internoCasa = map.addTilesetImage('interno', 'interno');
		
		this.pavimentoLayer = map.createLayer('pavimento', internoCasa, 0, 0);
		this.oggettini = map.createLayer("oggettini",internoCasa,0,0)
		this.oggettivari = map.createLayer("oggettivari",internoCasa,0,0)
		this.muriLayer = map.createLayer("muri",internoCasa,0,0)
		
		
		
		this.muriLayer.setCollisionByProperty({ collision: true });
		this.oggettivari.setCollisionByProperty({ collision: true });
				
		this.creaTriggerZone("Prateria",575,630,50,50);

        // Crea controlli da tastiera
        this.cursors = this.input.keyboard.createCursorKeys();

        // Aggiungi i tasti WASD
        this.cursors.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursors.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.cursors.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursors.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		
		
		this.addHero(data.id,575,580)
    }
	
	

	creaTriggerZone(nome,x,y,xx,yy) {

		this.triggerZone = this.add.zone(x,y,xx,yy);
		this.triggerZone.nome = nome;		

		// Aggiungi una rappresentazione visiva per la zona (rettangolo colorato)
		const graphics = this.add.graphics();
		graphics.fillStyle(0xff0000, 0.5); // Colore rosso con trasparenza 0.5
		graphics.fillRect(this.triggerZone.x - this.triggerZone.width / 2, this.triggerZone.y - this.triggerZone.height / 2, this.triggerZone.width, this.triggerZone.height);

		// Abilita il body per la zona di trigger, così possiamo controllare l'overlap
		this.physics.world.enable(this.triggerZone);
		this.triggerZone.body.setAllowGravity(false); // Disabilita la gravità sulla zona
		this.triggerZone.body.moves = false; // La zona non si muove

		
		this.triggerZones.push(this.triggerZone);
	}


	triggerEvent(player, zone) {
		console.log(zone.nome);

		const playerId = player.id; // Salva l'ID del giocatore



		this.autoremoveHero(playerId)
			.then(() => {


				if (zone.nome === "Prateria") {
					this.scene.start('Prateria', {
						id: playerId, // Passa l'ID del giocatore alla nuova scena
						scenaPrecedente: "InternoCasa"
					});
				}
				
				/*
				rimozione del pg ma non c'è la socket 
				socket.send("leave:" + roomCode + ":" + playerId);
				*/

			})
			.catch((error) => {
				console.error("Errore durante la rimozione dell'eroe:", error);
			});
	}

	
	


	
	
	update(time) {
	    if (time - this.lastUpdateTime >= this.updateInterval) {
	        this.lastUpdateTime = time;

	        // Controlla se myPlayer esiste prima di gestire il movimento e il combattimento
	        if (this.myPlayer) {
	            // Salva la posizione attuale
	            let playerX = this.myPlayer.x;
	            let playerY = this.myPlayer.y;

	            // Gestisci il movimento del personaggio
	            this.handleMovement();

	            // Controlla se lastX e lastY sono null (ovvero se non sono stati inizializzati)
	            if (this.lastX === null || this.lastY === null) {
	                // Imposta lastX e lastY alla posizione attuale
	                this.lastX = playerX;
	                this.lastY = playerY;
	            } else {
	                // Controlla se il personaggio si è mosso
	                if (
	                    Math.abs(playerX - this.lastX) > this.positionThreshold ||
	                    Math.abs(playerY - this.lastY) > this.positionThreshold
	                ) {
	                    // Aggiorna lastX e lastY
	                    this.lastX = playerX; // Aggiorna lastX
	                    this.lastY = playerY; // Aggiorna lastY

	                    // Aggiorna la posizione precedente solo se il personaggio si è mosso
	                    this.previousPosition = { x: playerX, y: playerY };
	                } else {
	                    return; // Esci dalla funzione
	                }
	            }
	        } else {
	            console.warn("myPlayer non è stato inizializzato."); // Log di avviso
	        }
	    }
	}

	
	
	autoremoveHero(playerId) {
		    return new Promise((resolve, reject) => {
		        const hero = this.heroes[playerId];

		        if (hero) {
		            // Distruggi lo sprite del personaggio
		            hero.destroy(); 

		            // Rimuovi l'eroe dalla lista degli eroi
		            delete this.heroes[playerId];

		            // Se il personaggio rimosso era il giocatore corrente (myPlayer), resetta myPlayer
		            if (this.myPlayer && this.myPlayer.id === playerId) {
		                this.myPlayer = null;
		            }

		            console.log(`Personaggio con id ${playerId} rimosso.`);
		            resolve(); // Risolvi la promessa
		        } else {
		            console.warn(`Personaggio con id ${playerId} non trovato.`);
		            reject(new Error(`Personaggio con id ${playerId} non trovato.`)); // Rifiuta la promessa
		        }
		    });
		}
	
	
	
		addHero(id, x, y) {
		    const hero = this.physics.add.sprite(x, y, 'hero');
		    hero.setCollideWorldBounds(true);
			this.physics.add.collider(hero,this.muriLayer);
			this.physics.add.collider(hero,this.oggettivari)

		    // Assegna l'ID al personaggio
		    hero.id = id;

		    // Imposta myPlayer solo se non è già impostato
		    if (!this.myPlayer) {
				
		        this.myPlayer = hero; // Imposta myPlayer
				
				//camera
				this.cameras.main.startFollow(this.myPlayer);
				this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
				this.cameras.main.setZoom(2);  
				
		        
		        // Aggiungi la sovrapposizione qui, ora che myPlayer è inizializzato
		        if (this.triggerZone) {
		            this.physics.add.overlap(this.myPlayer, this.triggerZone, this.triggerEvent, null, this);
		        } else {
		            console.warn("triggerZone non è inizializzato.");
		        }
		    }

		    this.heroes[id] = hero;
		    return hero;
		}
	
		removeHero(id) {
			    const hero = this.heroes[id];
			    console.log("Current heroes before removal:", Object.keys(this.heroes));

			    if (hero) {
			        console.log(`Destroying hero with ID: ${id}`);
			        hero.destroy(); // Distruggi lo sprite del personaggio
			        delete this.heroes[id]; // Rimuovi l'eroe dalla lista degli eroi

			        // Se il personaggio rimosso era il giocatore corrente (myPlayer), resetta myPlayer
			        if (this.myPlayer && this.myPlayer.id === id) {
			            this.myPlayer = null;
			        }

			        console.log(`Personaggio con id ${id} rimosso.`);
			    } else {
			        console.warn(`Personaggio con id ${id} non trovato.`);
			    }

			    console.log("Current heroes after removal:", Object.keys(this.heroes));
			}
	



    handleMovement() {
        // Reset the velocity for the main character
        const hero = this.heroes[this.myPlayer.id];
		
		if(!hero){
			return
		}
		
		if(!hero.body){
			hero.setActive(true)
		}
		
		
        hero.setVelocity(0); // Reset velocity

        // Control key checks for movement
        if (this.cursors.left.isDown || this.cursors.A.isDown) {
            hero.setVelocityX(-this.speed);
            this.sendPosition(hero); // Send position to server
        } else if (this.cursors.right.isDown || this.cursors.D.isDown) {
            hero.setVelocityX(this.speed);
            this.sendPosition(hero); // Send position to server
        } else if (this.cursors.up.isDown || this.cursors.W.isDown) {
            hero.setVelocityY(-this.speed);
            this.sendPosition(hero); // Send position to server
        } else if (this.cursors.down.isDown || this.cursors.S.isDown) {
            hero.setVelocityY(this.speed);
            this.sendPosition(hero); // Send position to server
        }
    }

    sendPosition(hero) {
        // Invia la posizione del personaggio al server
        if (socket && socket.readyState === WebSocket.OPEN) {
            const positionData = {
                type: 'positionUpdate', // Includi il tipo di messaggio
                player: {
                    id: hero.id, // Identifier of the character
                    x: hero.x,
                    y: hero.y
                }
            };
            socket.send(JSON.stringify(positionData)); // Invia i dati della posizione
        }
    }

    updateHeroPosition(data) {
        // Aggiorna la posizione di un altro personaggio (es. player2)
        const hero = this.heroes[data.id];
        if (hero) {
            hero.setPosition(data.x, data.y); // Aggiorna la posizione
        }
    }
}

