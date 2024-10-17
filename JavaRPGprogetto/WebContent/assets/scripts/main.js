class MyScene extends Phaser.Scene {
	constructor() {
		super({ key: 'MyScene' });

		this.sceneKey = "MyScene"

		this.heroes = {}; // Oggetto per gestire più personaggi
		this.myPlayer = null; // Istanza del mio personaggio
		this.speed = 150; // Imposta la velocità del personaggio
		this.cursors = null; // Per i controlli della tastiera
		this.lastUpdateTime = 0; // Tempo dell'ultimo aggiornamento
		this.updateInterval = 1000 / 30; // Intervallo di aggiornamento per 30 FPS
		this.lastX = null;
		this.lastY = null;
		this.positionThreshold = 5;
		
		
		
		this.triggerZone = null;
		
		this.bossTrigghered = false;

		this.textbox = null;
		
	}


	preload() {
		this.load.image('tileset', 'assets/tilesets/tilemap_packed.png');
		this.load.tilemapTiledJSON('map', 'assets/maps/forzaroma.json');
		
		this.load.spritesheet('hero', 'assets/mappe/hero.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('mago', 'assets/mappe/mago.png', { frameWidth: 32, frameHeight: 32 });
		
		this.load.spritesheet('scrigno', 'assets/mappe/scrigno.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('scrigno2', 'assets/mappe/scrigno2.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('scrigno3', 'assets/mappe/scrigno3.png', { frameWidth: 32, frameHeight: 32 });
		
		
	}

	create(data) {

		this.triggerZones = [];

		const map = this.make.tilemap({ key: 'map' });
		this.map = map;

		this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

		
		//animazione
		this.anims.create({
		       key: 'playAnimation',
		       frames: [
		           { key: 'scrigno' },
		           { key: 'scrigno2' },
		           { key: 'scrigno3' }
		       ],
		       frameRate: 10, // Change as necessary for speed
		       repeat: 1 // Loop forever
		   });



		const tileset = map.addTilesetImage('tilemap1', 'tileset');
		const groundLayer = map.createLayer('Livello tile 1', tileset, 0, 0);

		// Definisci collisionLayer come proprietà della classe
		this.collisionLayer = map.createLayer('collision', tileset, 0, 0);
		this.collisionLayer.setCollisionByProperty({ collision: true });

		// Definisci combatLayer come proprietà della classe
		this.combatLayer = map.createLayer('combat', tileset, 0, 0);
		this.combatLayer.setCollisionByProperty({ combat: true });


		this.creaTriggerZone("Prateria", 700, 340, 32, 32);
		
		
		this.creaNpg("Vecchietto", 790, 260, 32, 32,"mago");
		
		this.creaNpg("Boss",800,200,50,50,"scrigno");
		
		
		
		this.creaTextBox()



		//creatextbot




		// Crea controlli da tastiera
		this.cursors = this.input.keyboard.createCursorKeys();

		// Aggiungi i tasti WASD
		this.cursors.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.cursors.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.cursors.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		this.cursors.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		this.cursors.E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);


		if (data.id != null) {

			//passare l'id così non me lo crea random'
			this.addHero(data.id, 700, 220)
			
			
		}

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

						// Controlla se l'eroe sovrappone un tile di combattimento
						this.checkCombatOverlap(this.myPlayer);

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


	creaTriggerZone(nome, x, y, xx, yy) {

		this.triggerZone = this.add.zone(x, y, xx, yy);
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
	
	
	creaNpg(nome, x, y, xx, yy,nomeSprite) {
	    // Create the trigger zone as before
	    this.triggerZone = this.add.zone(x, y, xx, yy);
	    this.triggerZone.nome = nome;

	    // Load the sprite as a visual representation for the zone
	    const triggerSprite = this.add.sprite(x, y, nomeSprite); 
	    triggerSprite.setOrigin(0.5, 0.5); // Set origin to center if needed
	    triggerSprite.setDisplaySize(xx, yy); // Resize the sprite to match the zone dimensions
	    triggerSprite.alpha = 1; // Make the sprite semi-transparent for better visibility

	    // Optional: Add the sprite to the trigger zone for reference
	    this.triggerZone.sprite = triggerSprite;

	    // Enable the physics body for the zone
	    this.physics.world.enable(this.triggerZone);
	    this.triggerZone.body.setAllowGravity(false); // Disable gravity on the zone
	    this.triggerZone.body.moves = false; // The zone does not move

	    // Store the trigger zone in an array for later use
	    this.triggerZones.push(this.triggerZone);
	}
	


	triggerEvent(player, zone) {
		console.log("Il personaggio ha attivato la zona!");

		const playerId = player.id; // Salva l'ID del giocatore
		

		if (zone.nome === "Vecchietto") {
			if (this.cursors.E.isDown) {
				this.aggiungiText("Non aprire lo scrigno!")
				this.updateTextBoxLocation();
			}
		}


		if (zone.nome === "Prateria") {
			this.autoremoveHero(playerId)
				.then(() => {
					socket.send("leave:" + roomCode + ":" + playerId);


					this.scene.start('Prateria', {
						id: playerId,
					});

				})
				.catch((error) => {
					console.error("Errore durante la rimozione dell'eroe:", error);
				});

		} else 			if (zone.nome == "Boss" && this.bossTrigghered == false) {
			    this.bossTrigghered = true;

			    zone.sprite.play("playAnimation");


			    zone.sprite.on('animationcomplete', (animation, frame) => {
			        this.scene.pause();

			        // Launch the CombatScene with parameters
			        this.scene.launch('CombatScene', { currentScene: 'MyScene', heroId: this.myPlayer.id, boss: true });
			    });
			}
	}


	aggiungiText(text) {
		   this.textBox.setText(text);
		   this.textBox.setVisible(true);
		   
		   // Nascondi la textbox dopo 3 secondi
		   setTimeout(() => {
		       this.textBox.setVisible(false);
		   }, 3000);
	}



	creaTextBox() {
		this.textBox = this.add.text(400, 300, '', {
		        fontSize: '32px',
				fill: '#fff', 
				backgroundColor: '#333', 
		        padding: {
		            x: 10,
		            y: 10
		        },
		        align: 'center',
				wordWrap: { width: 300, useAdvancedWrap: true }
		    }).setOrigin(0.5);
		    this.textBox.setVisible(false);
	}
	
	
	updateTextBoxLocation(){
		this.textBox.x = this.myPlayer.x
		this.textBox.y = this.myPlayer.y + 100
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
		this.physics.add.collider(hero, this.collisionLayer);

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
			if (this.triggerZones.length > 0) {
				this.triggerZones.forEach(zone => {

					this.physics.add.overlap(this.myPlayer, zone, this.triggerEvent, null, this);
				})


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




	checkCombatOverlap(hero) {
		// Controlla se hero è nullo
		if (!hero) {
			console.warn("Il parametro hero è nullo.");
			return;
		}

		// Calcola le coordinate del tile in base alla posizione dell'eroe
		const tileX = Math.floor(hero.x / this.combatLayer.tilemap.tileWidth);
		const tileY = Math.floor(hero.y / this.combatLayer.tilemap.tileHeight);


		// Controlla i limiti della mappa
		const maxTilesX = this.combatLayer.tilemap.width;  // Numero di colonne nella tilemap
		const maxTilesY = this.combatLayer.tilemap.height; // Numero di righe nella tilemap

		if (tileX < 0 || tileX >= maxTilesX || tileY < 0 || tileY >= maxTilesY) {
			console.warn("Coordinate fuori dai limiti della mappa:", tileX, tileY);
			return;
		}

		const tile = this.combatLayer.getTileAt(tileX, tileY);

		if (tile) {
			if (tile.properties.combat) {
				this.startCombat(hero, tile);
			}
		}
	}

	startCombat(hero, tile) {
		const tileProperties = tile.properties;

		// Controlla se il tile ha proprietà di combattimento
		if (tileProperties.combat) {
			// Genera un numero casuale tra 1 e 10
			const randomValue = Math.floor(Math.random() * 100) + 1;
			console.log("Valore randomico generato:", randomValue);

			// Controlla se il valore randomico è maggiore di 7
			if (randomValue > 80) {

				this.scene.pause();
				// Crea un nuovo personaggio nella CombatScene
				this.scene.launch('CombatScene', { currentScene: 'MyScene', heroId: this.myPlayer.id });

				// Metti in pausa MyScene

				// Assicurati che il corpo sia abilitato prima di usarlo
				if (this.myPlayer) {
					this.myPlayer.setActive(true);
					this.myPlayer.setVisible(true); // Se non vuoi che sia visibile
					if (this.myPlayer.body) {
						this.myPlayer.body.enable = true; // Abilita il corpo
					} else {
						console.error("Il corpo dell'eroe non è stato inizializzato.");
					}
				}

				// Log per il debug
				console.log(this.heroes[this.myPlayer.id].active);
				console.log(this.heroes[this.myPlayer.id].body);

				// Se l'eroe ha bisogno di essere attivato
				if (this.heroes[this.myPlayer.id]) {
					this.heroes[this.myPlayer.id].setActive(true);
					if (this.heroes[this.myPlayer.id].body) {
						this.heroes[this.myPlayer.id].body.enable = true;
					} else {
						console.error("Il corpo dell'eroe non è disponibile.");
					}
				} else {
					console.error("L'eroe non è stato trovato nella lista degli eroi.");
				}
			}
		}
	}




	handleMovement() {
		// Reset the velocity for the main character
		const hero = this.heroes[this.myPlayer.id];

		if (!hero) {
			return
		}

		if (!hero.body) {
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

// Configurazione del gioco
const config = {
	type: Phaser.AUTO,
	width: 1024,
	height: 600,
	parent: 'mapArea',
	scene: [MyScene, Prateria, InternoCasa, Dungeon, CombatScene],
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: false,
			fps: 30 // Limita a 30 FPS
		}
	},
};

// Crea il gioco
const game = new Phaser.Game(config);
