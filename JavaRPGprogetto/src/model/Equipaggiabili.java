package model;

abstract public class Equipaggiabili extends Oggetto {
	public Equipaggiabili(int idOggetto, String idTipo, String nome, int currentQuantity, int maxQuantity, int valore,
			String descrizione, int stat, String razza, int livello) {
		super(idOggetto, idTipo, nome, currentQuantity, maxQuantity, valore, descrizione);
		this.setStat(stat);
		this.setRazza(razza);
		this.setLivello(livello);

	}

	private int stat;
	private String razza;
	private int livello;

	abstract public void addStat(Personaggio g);

	abstract public void removeStat(Personaggio g);

	public int getStat() {
		return stat;
	}

	public void setStat(int stat) {
		this.stat = stat;
	}

	public String getRazza() {
		return razza;
	}

	public void setRazza(String razza) {
		this.razza = razza;
	}

	public int getLivello() {
		return livello;
	}

	public void setLivello(int livello) {
		this.livello = livello;
	}

	@Override
	public String toString() {
		return super.toString() + "stat: " + stat + ", razza: " + razza + ", livello: " + livello;
	}


	

}
