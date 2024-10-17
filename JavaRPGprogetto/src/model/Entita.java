package model;
abstract public class Entita {
	private int currentHp;
	private int maxHp;
	private int maxMana;
	private int currentMana;
	private int attacco;
	private String nome;
	
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Entita( int currentHp, int maxHp, int maxMana, int currentMana, int attacco,String nome) {
		super();
		this.setCurrentHp(currentHp);
		this.setMaxHp (maxHp);
		this.setMaxMana(maxMana);
		this.setCurrentMana(currentMana);
		this.setAttacco(attacco);
		this.setNome(nome);
	}

	public int getCurrentHp() {
		return currentHp;
	}

	public void setCurrentHp(int currentHp) {
		this.currentHp = currentHp;
	}



	public int getMaxHp() {
		return maxHp;
	}

	public void setMaxHp(int maxHp) {
		this.maxHp = maxHp;
	}

	public int getMaxMana() {
		return maxMana;
	}

	public void setMaxMana(int maxMana) {
		this.maxMana = maxMana;
	}

	public int getCurrentMana() {
		return currentMana;
	}

	public void setCurrentMana(int currentMana) {
		this.currentMana = currentMana;
	}

	public int getAttacco() {
		return attacco;
	}

	public void setAttacco(int attacco) {
		this.attacco = attacco;
	}
}
