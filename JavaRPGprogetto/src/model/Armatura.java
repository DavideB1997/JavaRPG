package model;

public class Armatura extends Equipaggiabili {



	public Armatura(int idOggetto, String idTipo, String nome, int currentQuantity, int maxQuantity, int valore,
			String descrizione, int stat, String razza, int livello) {
		super(idOggetto, idTipo, nome, currentQuantity, maxQuantity, valore, descrizione, stat, razza, livello);
		
	}

	@Override
	public void addStat(Personaggio g) {
		g.setCurrentHp(g.getCurrentHp()+getValore());
		g.setMaxHp(g.getMaxHp()+getValore());
	}

	@Override
	public void removeStat(Personaggio g) {
		g.setCurrentHp(g.getCurrentHp()-getValore());
		g.setMaxHp(g.getMaxHp()-getValore());
	}

}
