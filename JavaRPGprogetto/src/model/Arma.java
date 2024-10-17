package model;

public class Arma extends Equipaggiabili {



public Arma(int idOggetto, String idTipo, String nome, int currentQuantity, int maxQuantity, int valore,
			String descrizione, int stat, String razza, int livello) {
		super(idOggetto, idTipo, nome, currentQuantity, maxQuantity, valore, descrizione, stat, razza, livello);
		
	}

public void addStat(Personaggio g) {
	g.setAttacco(getStat()+g.getAttacco());
}

@Override
public void removeStat(Personaggio g) {
	g.setAttacco(g.getAttacco()-getStat());
}
}
