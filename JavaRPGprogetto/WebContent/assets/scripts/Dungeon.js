class Dungeon extends Phaser.Scene {
	
    constructor() {
        super({ key: 'Dungeon' });
		
		this.sceneKey= "Dungeon"
		
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
        this.load.image('pavimenti', 'assets/tilesets/pavimenti.png');
		this.load.image('muri', 'assets/tilesets/muri.png');
		this.load.image('oggetti', 'assets/tilesets/oggetti.png');
		this.load.image('interno', 'assets/tilesets/interno.png');
		
        this.load.tilemapTiledJSON('dungeon', 'assets/maps/dungeon.json');
		
        this.load.spritesheet('hero', 'assets/mappe/hero.png', { frameWidth: 32, frameHeight: 32 });
    }

	
	
    create(data) {
		
		this.triggerZones = [];
		
        const map = this.make.tilemap({ key: 'dungeon' });
		this.map = map;
		this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
		
		
        const pavimenti = map.addTilesetImage('pavimenti', 'pavimenti');
		const muri = map.addTilesetImage('muri', 'muri');
		const oggetti = map.addTilesetImage('oggetti', 'oggetti');
		const interno = map.addTilesetImage('interno', 'interno');
		
		
		
		this.pavimentoLayer = map.createLayer('pavimento', [pavimenti], 0, 0);
		this.muriLayer = map.createLayer("muri",[pavimenti, muri],0,0)
					
		this.oggettiLayer = map.createLayer("oggetti",[interno, oggetti],0,0)
		this.oggettiniLayer = map.createLayer("oggettini",[interno, oggetti],0,0)
		
		
		this.combatLayer = this.pavimentoLayer
		this.combatLayer.setCollisionByProperty({ combat: true });
				
		
		
		this.creaTriggerZone("Prateria",800,620,50,50);
		
		
		
        this.muriLayer.setCollisionByProperty({ collision: true });
		this.oggettiLayer.setCollisionByProperty({ collision: true });
		
		
		
        // Crea controlli da tastiera
        this.cursors = this.input.keyboard.createCursorKeys();

        // Aggiungi i tasti WASD
        this.cursors.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursors.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.cursors.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursors.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		
		
		this.addHero(data.id,800,550)
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
		const playerId = player.id; // Salva l'ID del giocatore



		this.autoremoveHero(playerId)
			.then(() => {


				if (zone.nome === "Prateria") {
					this.scene.start('Prateria', {
						id: playerId, // Passa l'ID del giocatore alla nuova scena
						scenaPrecedente: "Dungeon",
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
				this.physics.add.collider(hero, this.muriLayer);
				this.physics.add.collider(hero, this.oggettiLayer)

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
				
				console.log(tileProperties);
				

			    // Controlla se il tile ha proprietà di combattimento
			    if (tileProperties.combat) {
			        // Genera un numero casuale tra 1 e 10
			        const randomValue = Math.floor(Math.random() * 100) + 1;
			        // Controlla se il valore randomico è maggiore di 7
			        if (randomValue > 95) {

			            this.scene.pause();
			            // Crea un nuovo personaggio nella CombatScene
			            this.scene.launch('CombatScene',  { currentScene: 'Dungeon', heroId: this.myPlayer.id });

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

