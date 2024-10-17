package model;

public class Consumabili extends Oggetto {
	public Consumabili(int idOggetto, String idTipo, String nome, int currentQuantity, int maxQuantity, int valore,
			String descrizione) {
		super(idOggetto, idTipo, nome, currentQuantity, maxQuantity, valore, descrizione);
		
	}


	private int Effetto;


	public void effectOnUse(Personaggio g) {
		if (this.getNome().equals("PozioneCura")) {
			g.setCurrentHp(Effetto+g.getCurrentHp());
		}
	}
}
