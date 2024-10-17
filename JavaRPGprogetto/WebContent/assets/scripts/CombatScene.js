class CombatScene extends Phaser.Scene {
	
    constructor() {
        super({ key: 'CombatScene' });
        this.statoCombat = "InizioCombat"; 
		this.heroData = null;
		this.scenaVecchia= null;
    }

    preload() {
		
    }

	create(data) {
	    this.getCombatState();
		
		
		const background = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x808080);
		background.setOrigin(0, 0); 
		

	    const heroId = data.heroId;
	    console.log("ID dell'eroe ricevuto:", heroId);
		this.scenaVecchia = data.currentScene;
		
		console.log(this.scene.get("MyScene").heroes)
		
	    // Ricerchi l'eroe nella scena MyScene (questo richiede di avere accesso all'oggetto heroes)
	    const hero = this.scene.get('MyScene').heroes[heroId];

	    if (hero) {
	        this.heroData = hero; 
			
			console.log("Hero recuperato:", this.heroData);
	    } else {
	        console.error("Errore: l'eroe non è stato trovato.");
	    }
		
		console.log(data)
		
		if(data.boss == true){
			
			console.log("ho un nemico!")
			
			this.nemico = new Nemico("Scrigno", 6, 10);
		}else{
			this.nemico = null;
		}
		
		
	}

	
	
	getCombatState() {
	    // Fetch combat state from the server
	    fetch("/TestStanze/testajax")
	        .then(response => {
	            if (!response.ok) {
	                throw new Error(`HTTP error! status: ${response.status}`);
	            }
	            return response.json(); // Convert response to JSON
	        })
	        .then(data => {
	            const personaggio = new Personaggio(data.nome, data.hp, data.mana, data.livello);
				
				
				let nemico = null;
				
				if(!this.nemico){
					nemico = new Nemico("Nemico", 3, 5); // Example enemy
				} else {
					nemico = this.nemico;
				}
	            

	            // Create combat state
	            this.combatState = new CombatState(new Partecipanti(personaggio, nemico));

	            // Update the UI with the combat state
	            this.updateCombatState(this.combatState);
	        })
	        .catch(error => {
	            console.error("Error:", error);
	            alert("Error during request: " + error.message);
	        });
	}

	// Update the combat state UI and manage combat
	updateCombatState(combatState) {
	    const partecipanti = combatState.partecipanti;
		
		
		this.createUI(partecipanti);
		
		this.updateVisuals(partecipanti);
					
		this.gestisciCombattimento(partecipanti);
	}

	
	

	
	
	//COMBAT
	
	
	gestisciCombattimento(partecipanti){
		var risultato = null;

		switch(this.statoCombat){
			case "InizioCombat":
				console.log("Siamo qui " + this.statoCombat)
				
				this.disabilitaBottoni();
				this.hideTooltip();
				
				//cambiato Stato al primo giocatore
				this.statoCombat = "TurnoGiocatore"
				
				
				this.gestisciCombattimento(partecipanti);
				break;
				
				
			case "TurnoGiocatore":
				console.log("Siamo qui " + this.statoCombat)

				this.abilitaBottoni();
				
				this.turnoGiocatore(partecipanti).then((azione) => {
				    risultato = this.verificaFineCombattimento(partecipanti);
				    if (risultato.finito) {
				        this.statoCombat = "FineCombat";
				    } else {
				        this.statoCombat = "TurnoAvversario";
				    }
				    
				    this.disabilitaBottoni();
					
					
					
				    setTimeout(() => {
				        this.gestisciCombattimento(partecipanti);
				    }, 3000);
				});


				break;
			case "TurnoAvversario":
				console.log("Siamo qui " + this.statoCombat);
				
				this.turnoAvversario(partecipanti);

				risultato = this.verificaFineCombattimento(partecipanti)
											
				if (risultato.finito) {
					this.statoCombat = "FineCombat";
				} else {
					this.statoCombat = "TurnoGiocatore";
				}
				
				setTimeout(() => {
				    this.gestisciCombattimento(partecipanti);
				}, 3000);

				break;
			case "FineCombat":
				console.log("Siamo qui " + this.statoCombat)
							
				
				this.fineCombat(partecipanti)
				
				//function esci dal combat
				
		}

	}
	

	//TURNO GIOCATORE
	
	turnoGiocatore(partecipanti) {
	    const personaggio = partecipanti.personaggio;
	    
	    // Pulisci la schermata di gioco precedente (se necessario)
	    this.screenLog.removeAll(true);

	    // Ritorna una Promise che attende l'azione del giocatore
	    return new Promise((resolve) => {
	        console.log("Available spells for " + personaggio.nome);

	        // Configura i pulsanti e le loro azioni
	        this.setupPlayerActions(partecipanti, resolve);
	    });
	}
	
	setupPlayerActions(partecipanti, resolve) {
	    // Rendi i pulsanti interattivi e configura le azioni per il turno del giocatore
	    
	    // Configura il pulsante degli incantesimi
	    this.addSpellButton(partecipanti, resolve);
		this.addInventarioButton(partecipanti,resolve);
		this.addButtonAttacco(partecipanti,resolve);
		this.addFugaButton(partecipanti,resolve);
	    
	}
	
	

	addFugaButton(partecipanti, resolve) {
	    this.buttonFuga.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.buttonFuga.width, this.buttonFuga.height), Phaser.Geom.Rectangle.Contains)
	        .on('pointerdown', () => {  
	            console.log("Fuga button pressed");
	            this.fuga(partecipanti); 
	        });
	}
	
	
	
	fuga() {
	    console.log('Fuga eseguita');
		
	    this.scene.stop("CombatScene");
		
	    this.scene.resume(this.scenaVecchia);

	    // Rendi l'eroe visibile e attiva
	    if (this.heroData) {
	        this.heroData.setVisible(true); // Rendi l'eroe visibile
	        this.heroData.setActive(true); // Riattiva l'eroe
			
			this.heroData.inputEnabled = true;
	    } else {
	        console.error("Errore: l'eroe o il suo body non esiste.");
	    }
	}
	
	
	
	
	addButtonAttacco(partecipanti, resolve) {
		
		this.buttonAttacco.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.buttonAttacco.width, this.buttonAttacco.height), Phaser.Geom.Rectangle.Contains)
			.on('pointerdown', () => {
				console.log("Attacco button pressed");

				this.eseguiAzione(partecipanti.personaggio.attaccoBase, partecipanti.personaggio, partecipanti.nemico).then(function() {
					resolve(partecipanti);
				});
			});
	}
			


	addSpellButton(partecipanti, resolve) {
	    // Rendi il pulsante "Spell" interattivo e assegna una hit area rettangolare
	    this.buttonSpells.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.buttonSpells.width, this.buttonSpells.height), Phaser.Geom.Rectangle.Contains)
	        .on('pointerdown', () => {
	            console.log("Spell button pressed");

	            // Mostra il menu degli incantesimi e passa anche resolve
	            this.mostraSpells(partecipanti, resolve);
	        });
	}
	
	addInventarioButton(partecipanti, resolve) {
		    // Rendi il pulsante "Spell" interattivo e assegna una hit area rettangolare
		    this.buttonInventario.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.buttonInventario.width, this.buttonInventario.height), Phaser.Geom.Rectangle.Contains)
		        .on('pointerdown', () => {
		            console.log("Inventario premuto");

		            // Mostra il menu degli incantesimi e passa anche resolve
		            this.mostraInventario(partecipanti, resolve);
		        });
		}


	//SPELLS
	
	mostraInventario(partecipanti, resolve) {
	    const inv = partecipanti.personaggio.inventario;
	    this.screenLog.removeAll(true); // Pulisce la schermata di gioco esistente

	    // Per ogni oggetto disponibile nell'inventario
	    inv.forEach((oggetto, index) => {
	        // Salta gli oggetti con quantità <= 0
	        if (oggetto.quantita <= 0) {
	            return;
	        }

	        // Crea un pulsante per utilizzare l'oggetto
	        const button = this.add.text(0, index * 30, oggetto.nome, { fontSize: '18px', fill: '#00f' })
	            .setInteractive()
	            .on('pointerdown', () => {
	                // Esegui l'azione con l'oggetto
	                this.eseguiAzione(oggetto, partecipanti.personaggio, partecipanti.nemico).then(() => {
	                    resolve();
	                });
	            })
	            .on('pointerover', () => {
	                // Mostra tooltip quando il mouse passa sopra
	                this.showTooltip(button, `${oggetto.nome}\nTipo: ${oggetto.tipo}\nDanno: ${oggetto.danno}\nQuantità: ${oggetto.quantita}`);
	            })
	            .on('pointerout', () => {
	                // Nascondi tooltip quando il mouse esce
	                this.hideTooltip();
	            });

	        // Aggiungi il pulsante al contenitore dell'inventario
	        this.screenLog.add(button);
	    });
	}


	mostraSpells(partecipanti, resolve) {
	    if (typeof resolve !== 'function') {
	        console.error('Resolve is not a function');
	        return; // Esci dalla funzione se non è una funzione
	    }

	    const spells = partecipanti.personaggio.spells;
	    
	    // Pulisci il contenuto dello screenLog per aggiungere i nuovi pulsanti
	    this.screenLog.removeAll(true); // Rimuovi tutti i figli dal contenitore di log

	    // Per ogni spell disponibile
	    spells.forEach((spell, index) => {
	        // Crea una descrizione della spell in più righe
	        const textSpell = `${spell.nome}<br>Tipo: ${spell.tipo}<br>Danno: ${spell.danno}<br>Costo: ${spell.costoMana} Mana`;
	        
	        // Crea un pulsante e usa il tooltip di Bootstrap
	        const button = this.add.text(0, index * 30, spell.nome, { fontSize: '20px', fill: '#fff' }) // Posizionamento verticale
	            .setInteractive()
	            .on('pointerover', () => {
	                this.showTooltip(button, textSpell); // Mostra il tooltip
	            })
	            .on('pointerout', () => {
	                this.hideTooltip(); // Nascondi il tooltip
	            })
	            .on('pointerdown', () => {
	                // Controlla se il mana è sufficiente per lanciare la spell
	                if (partecipanti.personaggio.mana >= spell.costoMana) {
	                    this.eseguiAzione(spell, partecipanti.personaggio, partecipanti.nemico).then(() => {
	                        resolve(); // Chiama resolve quando l'azione è completata
	                    });
	                } else {
	                    console.log("Non puoi lanciare questa spell, mana insufficiente");
	                }
	            });

	        // Aggiungi il pulsante al contenitore di log
	        this.screenLog.add(button);
	    });
	}

	

	/////////////////////////////////////
	
	//TURNO AVVERSARIO
	
	turnoAvversario(partecipanti) {
	    return new Promise((resolve, reject) => {
	        this.screenLog.removeAll(true); 

	        const spellNemico = this.scegliAzioneNemico(partecipanti.nemico); 

	        // Esegui l'azione del nemico usando la spell selezionata
	        this.eseguiAzione(spellNemico, partecipanti.nemico, partecipanti.personaggio)
	            .then(() => {
	                this.updateVisuals(partecipanti);

	                resolve(partecipanti);
	            })
	            .catch((error) => {
	                console.error("Errore durante l'esecuzione dell'azione:", error);
	                reject(error);
	            });
	    });
	}
	
	
	
	
	
	
	scegliAzioneNemico(nemico) {

		//cerca le spell che il nemico può utilizzare con il mana disponibile
		var spellUtilizzabili = nemico.spells.filter(spell => spell.costoMana <= nemico.mana);

		//se è maggiore di 0 prende una random e la lancia altrimenti attacco base
		if (spellUtilizzabili.length > 0) {
			var randomIndex = Math.floor(Math.random() * spellUtilizzabili.length);
			return spellUtilizzabili[randomIndex];
		}
		else {
			return nemico.attaccoBase;
		}
	}

	//esegui azione
	
	eseguiAzione(spell, attaccante, bersaglio) {
	    // Rimuovi il contenuto precedente dallo schermo di log
	    this.screenLog.removeAll(true); 
		this.hideTooltip();

	    return new Promise((resolve) => {
	        let text;

	        // Controllo se è un danno o una cura
	        if (spell.tipo === "danno") {
	            console.log("Faccio danni");
	            bersaglio.hp -= spell.danno;

	            if (bersaglio.hp < 0) { // Controlla se supera gli hp
	                bersaglio.hp = 0;
	            }

	            text = this.add.text(20, 20, 
	                `${attaccante.nome} ha usato ${spell.nome} su ${bersaglio.nome} infliggendo ${spell.danno} danni.`, 
	                { fontSize: '20px', fill: '#fff' }
	            );
	        } else if (spell.tipo === "cura") {
	            console.log("Curo danni");

	            // La cura non deve superare gli hp massimi
	            attaccante.hp += spell.danno; 

	            if (attaccante.hp > attaccante.maxHp) { // Controlla se supera gli hp
	                attaccante.hp = attaccante.maxHp; 
	            }

	            text = this.add.text(20, 20, 
	                `${attaccante.nome} ha usato ${spell.nome} per curarsi di ${spell.danno} HP.`, 
	                { fontSize: '20px', fill: '#fff' }
	            );
	        }

	        if (spell instanceof Oggetto) {
	            spell.usa();
	            console.log(spell.quantita);
	        }

	        if (spell instanceof Spell) {
	            attaccante.mana -= spell.costoMana;
	        }

	        // Aggiorna la visualizzazione
	        this.updateVisuals({ personaggio: attaccante, nemico: bersaglio });
	        
	        // Aggiungi il messaggio nel contenitore della schermata di gioco
	        this.screenLog.add(text);

	        // Risolvi la promessa
	        resolve();
	    });
	}

	/////////////////////////////////////
	
	//VITTORIA
	
	fineCombat(partecipanti) {
	    // Controlla chi ha vinto il combattimento
	    var vincitore = this.verificaFineCombattimento(partecipanti).esito == 2 ? partecipanti.personaggio : partecipanti.nemico;

		this.mostraTestoVittoria(vincitore);
		
		this.scene.stop("CombatScene");
		this.scene.resume(this.scenaVecchia);
	   
		
		
	    //non funziona il timer?
	    setTimeout(function() {
			
	    }, 3000);
	}
	
	mostraTestoVittoria(vincitore) {
	    // Messaggio di vittoria
	    const message = vincitore.nome + " ha vinto il combattimento!";

	    // Crea il testo e impostalo con uno stile
	    const victoryText = this.add.text(0, 0, message, {
	        fontSize: '24px',
	        fill: '#00ff00', // Verde per il testo di vittoria
	        fontFamily: 'Arial'
	    });

	    // Aggiungi il testo al contenitore esistente
	    this.gameScreenContainer.add(victoryText);
	    
	    // Opzionalmente, puoi centrare il testo
	    victoryText.setOrigin(0.5); // Centra il testo
	    victoryText.setPosition(this.gameScreenContainer.width / 2, this.gameScreenContainer.height / 2);
	}
	
	/////////////
	
	// Abilito dei bottoni
	
	disabilitaBottoni() {
	    this.buttonSpells.removeInteractive();
	    this.buttonInventario.removeInteractive();
	    this.buttonAttacco.removeInteractive();
	    this.buttonFuga.removeInteractive();

	    this.buttonSpells.setStyle({ fill: '#ccc' });
	    this.buttonInventario.setStyle({ fill: '#ccc' });
	    this.buttonAttacco.setStyle({ fill: '#ccc' });
	    this.buttonFuga.setStyle({ fill: '#ccc' });
	}

	abilitaBottoni() {
	    this.buttonSpells.setInteractive();
	    this.buttonInventario.setInteractive();
	    this.buttonAttacco.setInteractive();
	    this.buttonFuga.setInteractive();

	    // Ripristina lo stile originale dei bottoni (sostituisci i colori con quelli desiderati)
	    this.buttonSpells.setStyle({ fill: '#fff' }); // Colore originale
	    this.buttonInventario.setStyle({ fill: '#fff' }); // Colore originale
	    this.buttonAttacco.setStyle({ fill: '#fff' }); // Colore originale
	    this.buttonFuga.setStyle({ fill: '#fff' }); // Colore originale
	}


	////////////////////////////////
	
	//TOOLTIP
	showTooltip(button, text) {
	    if (this.tooltip) {
	        this.tooltip.destroy(); // Distruggi il tooltip precedente
	    }
	    
	    this.tooltip = this.add.text(button.x + 10, button.y + 350, text, { fontSize: '16px', fill: '#fff', backgroundColor: '#000' });
	    this.tooltip.setOrigin(0.5);
	}

	// Funzione per nascondere il tooltip
	hideTooltip() {
	    if (this.tooltip) {
	        this.tooltip.destroy(); // Distruggi il tooltip
	        this.tooltip = null; // Resetta il tooltip
	    }
	}

	/////////////////////////////////////
	
	
	createUI(partecipanti) {
	        const nemico = partecipanti.nemico;
	        const personaggio = partecipanti.personaggio;

	        // Crea il contenitore per il nemico
	        this.nemicoContainer = this.add.container(20, 20);
	        this.createNemicoUI(nemico);
	        
	        // Crea il contenitore per il personaggio
	        this.personaggioContainer = this.add.container(400, 20);
	        this.createPersonaggioUI(personaggio);

	        // Crea il contenitore per la schermata di gioco
	        this.gameScreenContainer = this.add.container(20, 200);
	        this.createGameScreenUI(partecipanti);

	        // Aggiungi i contenitori alla scena
	        this.add.existing(this.nemicoContainer);
	        this.add.existing(this.personaggioContainer);
	        this.add.existing(this.gameScreenContainer);
	        this.add.existing(this.menuSceltaContainer);
	}

	createNemicoUI(nemico) {
	    // Nome nemico
	    this.nemicoNome = this.add.text(0, 0, nemico.nome, { fontSize: '24px', fill: '#fff' });
		
		
		
		
	    // Barra HP nemico
	    this.nemicoHpBar = this.add.graphics();
	    this.nemicoHpBar.fillStyle(0x00ff00, 1); // Verde
	    this.nemicoHpBar.fillRect(0, 40, 200, 20);
	    
	    // Text HP nemico
	    this.nemicoHpText = this.add.text(0, 70, 'Hp: ' + nemico.hp / nemico.maxHp, { fill: '#fff' });
	    
	    // Barra Mana nemico
	    this.nemicoManaBar = this.add.graphics();
	    this.nemicoManaBar.fillStyle(0x0000ff, 1); // Blu
	    this.nemicoManaBar.fillRect(0, 100, 200, 15);
	    
	    // Text Mana nemico
	    this.nemicoManaText = this.add.text(0, 120, 'Mana: '+ nemico.mana / nemico.maxMana, { fill: '#fff' });

	    // Aggiungi tutto al contenitore nemico
	    this.nemicoContainer.add([this.nemicoNome,this.nemicoHpBar, this.nemicoHpText, this.nemicoManaBar, this.nemicoManaText]);
	}

	createPersonaggioUI(personaggio) {
	    // Nome personaggio
	    this.personaggioNome = this.add.text(0, 0, personaggio.nome, { fontSize: '24px', fill: '#fff' });
	    this.personaggioLivello = this.add.text(200, 0, 'Lvl: ' + personaggio.livello, { fontSize: '24px', fill: '#fff' });
	    this.personaggioContainer.add([this.personaggioNome, this.personaggioLivello]);

	    // Barra HP personaggio
	    this.personaggioHpBar = this.add.graphics();
	    this.personaggioHpBar.fillStyle(0x00ff00, 1); // Verde
	    this.personaggioHpBar.fillRect(0, 40, 200, 20);
	    
	    // Text HP personaggio
	    this.personaggioHpText = this.add.text(0, 70, 'Hp: '+ personaggio.hp / personaggio.maxHp, { fill: '#fff' });
	    
	    // Barra Mana personaggio
	    this.personaggioManaBar = this.add.graphics();
	    this.personaggioManaBar.fillStyle(0x0000ff, 1); // Blu
	    this.personaggioManaBar.fillRect(0, 100, 200, 15);
	    
	    // Text Mana personaggio
	    this.personaggioManaText = this.add.text(0, 120, 'Mana: '+ personaggio.mana / personaggio.maxMana, { fill: '#fff' });

	    // Aggiungi tutto al contenitore personaggio
	    this.personaggioContainer.add([this.personaggioHpBar, this.personaggioHpText, this.personaggioManaBar, this.personaggioManaText]);
	}

	createGameScreenUI() {
	    // Crea il contenitore principale per la schermata di gioco
	    this.gameScreenContainer = this.add.container(0, 0);

	    // Crea il contenitore per lo screen log
	    this.screenLog = this.add.container(0,450);
	    
	    // Aggiungi uno sfondo per lo screen log
	    const screenLogBackground = this.add.rectangle(0, 0, 400, 100, 0xffffff);
	    this.screenLog.add(screenLogBackground);
	    
	    // Aggiungi il contenitore dello screen log al contenitore principale
	    this.gameScreenContainer.add(this.screenLog);
	    
	    // Crea pulsanti per le azioni
	    this.menuSceltaContainer = this.add.container(550, 450);

	    this.buttonSpells = this.add.text(0, 0, 'Spell', { fill: '#fff' });
	    this.buttonSpells.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.buttonSpells.width, this.buttonSpells.height), Phaser.Geom.Rectangle.Contains);

	    this.buttonInventario = this.add.text(100, 0, 'Inventario', { fill: '#fff' });
	    this.buttonInventario.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.buttonInventario.width, this.buttonInventario.height), Phaser.Geom.Rectangle.Contains);

	    this.buttonAttacco = this.add.text(0, 50, 'Attacco', { fill: '#fff' });
	    this.buttonAttacco.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.buttonAttacco.width, this.buttonAttacco.height), Phaser.Geom.Rectangle.Contains);

	    this.buttonFuga = this.add.text(100, 50, 'Fuga', { fill: '#fff' });
	    this.buttonFuga.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.buttonFuga.width, this.buttonFuga.height), Phaser.Geom.Rectangle.Contains);

	    // Aggiungi i pulsanti al contenitore
	    this.menuSceltaContainer.add([
	        this.buttonSpells,
	        this.buttonInventario,
	        this.buttonAttacco,
	        this.buttonFuga
	    ]);
	}

	

	
	
	
	verificaFineCombattimento(partecipanti) {
	    // Verifica se il combattimento è finito
	    if (partecipanti.personaggio.hp <= 0) {
	        this.statoCombat = "FineCombat"; // Il combattimento è finito, il personaggio ha perso
	        return { finito: true, esito: 2 }; // Esito: sconfitta
	    } else if (partecipanti.nemico.hp <= 0) {
	        this.statoCombat = "FineCombat"; // Il combattimento è finito, il personaggio ha vinto
	        return { finito: true, esito: 1 }; // Esito: vittoria
	    }
	    
	    // Il combattimento non è finito, si passa al prossimo turno
	    this.statoCombat = "TurnoGiocatore";
	    return { finito: false, esito: null }; // Esito: il combattimento continua
	}
	
	
	

	updateVisuals(partecipanti) {
	    // Log dei partecipanti per debug
	    console.log(partecipanti);
	    
	    // Aggiorna le barre della salute e del mana per il nemico
	    this.nemicoHpText.setText(`${partecipanti.nemico.hp} / ${partecipanti.nemico.maxHp}`);
	    this.updateBar(partecipanti.nemico.hp, this.nemicoHpBar, partecipanti.nemico.maxHp, "hp", 0, 40); // Posizione (0, 40)
	    
	    this.nemicoManaText.setText(`${partecipanti.nemico.mana} / ${partecipanti.nemico.maxMana}`);
	    this.updateBar(partecipanti.nemico.mana, this.nemicoManaBar, partecipanti.nemico.maxMana, "mana", 0, 100); // Posizione (0, 70)
	    
	    // Aggiorna le barre della salute e del mana per il personaggio
	    this.personaggioHpText.setText(`${partecipanti.personaggio.hp} / ${partecipanti.personaggio.maxHp}`);
	    this.updateBar(partecipanti.personaggio.hp, this.personaggioHpBar, partecipanti.personaggio.maxHp, "hp", 0, 40); // Posizione (0, 40)
	    
	    this.personaggioManaText.setText(`${partecipanti.personaggio.mana} / ${partecipanti.personaggio.maxMana}`);
	    this.updateBar(partecipanti.personaggio.mana, this.personaggioManaBar, partecipanti.personaggio.maxMana, "mana", 0, 100); // Posizione (0, 70)
	}

	
	updateBar(value, barFill, maxValue, type, posX, posY) {
	    if (maxValue > 0) {
	        const percentage = (value / maxValue) * 100;

	        // Assicurati che il valore non scenda sotto 0
	        const clampedPercentage = Math.max(0, Math.min(percentage, 100));

	        // Aggiorna la larghezza della barra di riempimento
	        barFill.clear(); // Pulisci il grafico esistente

	        // Determina il colore in base al tipo e alla percentuale
	        if (type === "hp") {
	            if (clampedPercentage > 60) {
	                barFill.fillStyle(0x00FF00); // Verde
	            } else if (clampedPercentage > 40) {
	                barFill.fillStyle(0xFFFF00); // Giallo
	            } else if (clampedPercentage > 20) {
	                barFill.fillStyle(0xFFA500); // Arancione
	            } else {
	                barFill.fillStyle(0xFF0000); // Rosso
	            }
	        } else if (type === "mana") {
	            if (clampedPercentage > 60) {
	                barFill.fillStyle(0x00008B); // Blu scuro
	            } else if (clampedPercentage > 40) {
	                barFill.fillStyle(0x0000FF); // Blu
	            } else if (clampedPercentage > 20) {
	                barFill.fillStyle(0xADD8E6); // Azzurro chiaro
	            } else {
	                barFill.fillStyle(0x800080); // Viola
	            }
	        }

	        // Calcola la larghezza della barra
	        const barWidth = (200 * clampedPercentage) / 100; // Calcola la larghezza della barra
	        barFill.fillRect(posX, posY, barWidth, 20); // Usa le posizioni passate
	    }
	}


	
	



}