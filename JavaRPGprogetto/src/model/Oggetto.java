package model;

public class Oggetto {
	private int idOggetto;
	private String idTipo;
	private String nome;
	private int currentQuantity;
	private int maxQuantity;
	private int valore;
	private String descrizione;
	
	
	
	public Oggetto(int idOggetto, String idTipo, String nome, int currentQuantity, int maxQuantity, int valore,
			String descrizione) {
		super();
		this.idOggetto = idOggetto;
		this.idTipo = idTipo;
		this.nome = nome;
		this.currentQuantity = currentQuantity;
		this.maxQuantity = maxQuantity;
		this.valore = valore;
		this.descrizione = descrizione;
	}
	public int getIdOggetto() {
		return idOggetto;
	}
	public void setIdOggetto(int idOggetto) {
		this.idOggetto = idOggetto;
	}
	public String getIdTipo() {
		return idTipo;
	}
	public void setIdTipo(String idTipo) {
		this.idTipo = idTipo;
	}
	public String getDescrizione() {
		return descrizione;
	}
	public void setDescrizione(String descrizione) {
		this.descrizione = descrizione;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public int getCurrentQuantity() {
		return currentQuantity;
	}
	public void setCurrentQuantity(int currentQuantity) {
		this.currentQuantity = currentQuantity;
	}
	public int getMaxQuantity() {
		return maxQuantity;
	}
	public void setMaxQuantity(int maxQuantity) {
		this.maxQuantity = maxQuantity;
	}
	public int getValore() {
		return valore;
	}
	public void setValore(int valore) {
		this.valore = valore;
	}
	@Override
	public String toString() {
		return "nome: " + nome + ", currentQuantity: "
				+ currentQuantity + ", maxQuantity= " + maxQuantity + ", valore= " + valore + ", descrizione= "
				+ descrizione+" ";
	}
	
	

}
