
//classi
class CombatState {
  constructor(partecipanti) {
    this.partecipanti = partecipanti;
  }
}

class Partecipanti {
  constructor(personaggio, nemico) {
    this.personaggio = personaggio;
    this.nemico = nemico;
  }
}

class Spell{
	constructor(nome,danno,tipo,costoMana){
		this.nome = nome;
		this.danno = danno;
		this.tipo = tipo
		this.costoMana = costoMana;
	}
}

const spellsList = [new Spell("Spell Danno",3,"danno",3),new Spell("Spell Cura",3,"cura",4)];


class Personaggio {
  constructor(nome, maxHp, maxMana,livello) {
    this.nome = nome;
	this.livello = livello;
	
	
    this.hp = maxHp;
	this.maxHp = maxHp;
	
	
	this.mana = maxMana;
	this.maxMana = maxMana;
	
	
	//parametri lvl up 
	//razza.hpOnLvlUp;
	
	
	
	this.spells = [spellsList[0],spellsList[1],spellsList[1],spellsList[1]];
	this.inventario = [new Oggetto("Oggetto Danno",3,"danno"),new Oggetto("Oggetto Cura",3,"cura")]
	
	
	this.attaccoBase = {
			nome: "Attacco Base",
			danno: 2, //in verita qui prende i danni dell'arma'
			tipo: "danno",
			costoMana: 0
		}
		
  }
}


function levelUp(personaggio){
	personaggio.forza+= personaggio.forzaOnLvlup //razza.forzaOnLlvUP;
}



class Nemico {
	constructor(nome, maxHp, maxMana) {
		this.nome = nome;

		this.hp = maxHp;
		this.maxHp = maxHp;


		this.mana = maxMana;
		this.maxMana = maxMana;

		this.spells = [spellsList[0], spellsList[1]];


		this.attaccoBase = {
			nome: "Attacco Base",
			danno: 2,
			tipo: "danno",
			costoMana: 0
		}
	}
}



class Oggetto {
    constructor(nome, danno, tipo) {
        this.nome = nome;
        this.danno = danno;
        this.tipo = tipo;
        this.quantita = 1;
    }

    usa() {
        if (this.quantita > 0) {
            this.quantita--;
            return this.quantita === 0;
        }
        return false; 
    }
}