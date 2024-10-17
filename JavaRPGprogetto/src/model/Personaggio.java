package model;

import java.util.*;

public class Personaggio extends Entita {
	private int idPersonaggio;
	private int idUtente;
	private Inventario inventario;
	private int currentLevel;
	private final int maxLevel = 11;
	private int currentExp;
	private final int maxExp = 12500;
	private Arma armaEquipaggiata;
	private Armatura armaturaEquipaggiata;
	private int puntiLb;
	private int posizioneLb;
	private Razza razza;
	
	
	public Personaggio(int currentHp, int maxHp, int maxMana, int currentMana, int attacco, String nome,
			int idPersonaggio, int idUtente, Inventario inventario, int currentLevel, int currentExp,
			Arma armaEquipaggiata, Armatura armaturaEquipaggiata, int puntiLb, int posizioneLb,Razza r) {
		super(currentHp, maxHp, maxMana, currentMana, attacco, nome);
		this.setIdPersonaggio(idPersonaggio);this.setIdUtente(idUtente);
		this.setInventario(inventario);this.setCurrentLevel(currentLevel);
		this.setCurrentLevel(currentLevel);this.setCurrentExp(currentExp);
		this.setArmaEquipaggiata(armaEquipaggiata);this.setArmaturaEquipaggiata(armaturaEquipaggiata);
		this.setPuntiLb(puntiLb);this.setPosizioneLb(posizioneLb);this.setRazza(r);
	}


	/*
	 * public void gainExp(int e) { if (this.getCurrentExp() < 12500) {
	 * this.setCurrentExp(e + this.getCurrentExp()); switch (this.getCurrentLevel())
	 * { case 1: if (this.getCurrentExp() >= 1250) { levelUp(); break; } case 2: if
	 * (this.getCurrentExp() >= 2500) { levelUp(); break; } case 3: if
	 * (this.getCurrentExp() >= 3750) { levelUp(); break; } case 4: if
	 * (this.getCurrentExp() >= 5000) { levelUp(); break; } case 5: if
	 * (this.getCurrentExp() >= 6250) { levelUp(); break; } case 6: if
	 * (this.getCurrentExp() >= 7500) { levelUp(); break; } case 7: if
	 * (this.getCurrentExp() >= 8750) { levelUp(); break; } case 8: if
	 * (this.getCurrentExp() >= 10000) { levelUp(); break; } case 9: if
	 * (this.getCurrentExp() >= 11250) { levelUp(); break; } case 10: if
	 * (this.getCurrentExp() >= 12500) { levelUp(); this.setCurrentExp(12500);
	 * break; } } } else {
	 * 
	 * }
	 * 
	 * }
	 * 
	 * public void levelUp() { this.setCurrentLevel(currentLevel + 1); switch
	 * (this.getCurrentLevel()) { case 2, 3, 4, 5, 6, 7, 8, 9, 10, 11: if (this
	 * instanceof Gnomo) { this.setCurrentMana(getCurrentMana() + 5);
	 * this.setMaxMana(getCurrentMana() + 5); this.setCurrentHp(this.getCurrentHp()
	 * + 30); this.setMaxHp(getMaxHp() + 30); this.setAttacco(getAttacco() + 10); }
	 * else if (this instanceof Cavaliere) { this.setCurrentMana(getCurrentMana() +
	 * 10); this.setMaxMana(getCurrentMana() + 10);
	 * this.setCurrentHp(this.getCurrentHp() + 25);
	 * this.setMaxHp(this.getCurrentHp() + 25); this.setAttacco(getAttacco() + 8); }
	 * else if (this instanceof Fata) { this.setCurrentMana(getCurrentMana() + 20);
	 * this.setMaxMana(getCurrentMana() + 20); this.setCurrentHp(getCurrentHp() +
	 * 15); this.setMaxHp(getMaxHp() + 15); this.setAttacco(getAttacco() + 5); }
	 * 
	 * } }
	 * 
	 * public void addItem(Oggetto o) { this.getInventario().getOggetti().add(o);
	 * 
	 * }
	 * 
	 * public void usa(Oggetto o) { if (o instanceof Consumabili) { ((Consumabili)
	 * o).effectOnUse(this); this.getInventario().getOggetti().remove(o); } else {
	 * String errore = "Non puoi usare questo oggetto"; } }
	 * 
	 * public void levaArmatura() { this.getArmaturaEquipaggiata().removeStat(this);
	 * this.setArmaturaEquipaggiata(null); } public void levaArma() {
	 * this.getArmaEquipaggiata().removeStat(this); this.setArmaEquipaggiata(null);
	 * }
	 * 
	 * public void getta(Oggetto o) { this.getInventario().getOggetti().remove(o); }
	 */

	/*
	 * public void equipaggia(Oggetto o) { if (o instanceof Equipaggiabili &&
	 * this.getRazza().equals(((Equipaggiabili) o).getRazza()) &&
	 * this.getCurrentLevel() >= ((Equipaggiabili) o).getLivello()) { if (o
	 * instanceof Arma) { this.setArmaEquipaggiata((Arma) o);
	 * ((Arma)o).addStat(this); } else { this.setArmaturaEquipaggiata((Armatura) o);
	 * } } else { System.out.println("Non puoi equipaggiarlo"); }
	 * 
	 * }
	 */

	/*
	 * public void vendi(Oggetto o) {
	 * this.getInventario().setSoldi(this.getInventario().getSoldi() +
	 * o.getValore()); this.getInventario().getOggetti().remove(o); }
	 */

	public int getIdPersonaggio() {
		return idPersonaggio;
	}


	public void setIdPersonaggio(int idPersonaggio) {
		this.idPersonaggio = idPersonaggio;
	}


	public int getPuntiLb() {
		return puntiLb;
	}


	public void setPuntiLb(int puntiLb) {
		this.puntiLb = puntiLb;
	}


	public int getPosizioneLb() {
		return posizioneLb;
	}


	public void setPosizioneLb(int posizioneLb) {
		this.posizioneLb = posizioneLb;
	}


	public Razza getRazza() {
		return razza;
	}


	public void setRazza(Razza razza) {
		this.razza = razza;
	}


	public int getIdUtente() {
		return idUtente;
	}

	public void setIdUtente(int idGiocatore) {
		this.idUtente = idGiocatore;
	}

	public Inventario getInventario() {
		return inventario;
	}

	public void setInventario(Inventario inventario) {
		this.inventario = inventario;
	}

	public int getCurrentLevel() {
		return currentLevel;
	}

	public void setCurrentLevel(int currentLevel) {
		this.currentLevel = currentLevel;
	}

	public int getCurrentExp() {
		return currentExp;
	}

	public void setCurrentExp(int currentExp) {
		this.currentExp = currentExp;
	}

	public int getMaxExp() {
		return maxExp;
	}

	public Arma getArmaEquipaggiata() {
		return armaEquipaggiata;
	}

	public void setArmaEquipaggiata(Arma armaEquipaggiata) {
		this.armaEquipaggiata = armaEquipaggiata;
	}

	public Armatura getArmaturaEquipaggiata() {
		return armaturaEquipaggiata;
	}

	public void setArmaturaEquipaggiata(Armatura armaturaEquipaggiata) {
		this.armaturaEquipaggiata = armaturaEquipaggiata;
	}

	public int getMaxLevel() {
		return maxLevel;
	}
	
	@Override
	public String toString() {
		return "Personaggio [idPersonaggio=" + idPersonaggio + ", idUtente=" + idUtente + ", inventario=" + inventario
				+ ", currentLevel=" + currentLevel + ", maxLevel=" + maxLevel + ", currentExp=" + currentExp
				+ ", maxExp=" + maxExp + ", armaEquipaggiata=" + armaEquipaggiata + ", armaturaEquipaggiata="
				+ armaturaEquipaggiata + ", puntiLb=" + puntiLb + ", posizioneLb=" + posizioneLb + ", razza=" + razza
				+ "]";
	}


}
