package model;
import java.util.List;

public class Inventario {
	private int idInventario;
	private int maxCapacita;
	private int currentCapacita;
	private int soldi;
	private List<Oggetto> oggetti;
	private int idPersonaggio;
   
    
	public int getIdInventario() {
		return idInventario;
	}
	public void setIdInventario(int idInventario) {
		this.idInventario = idInventario;
	}
	public Inventario(int idInventario,int maxCapacita, int currentCapacita, int soldi, List<Oggetto> oggetti, int idPersonaggio) {
		super();
		this.setIdInventario(idInventario);
		this.maxCapacita = maxCapacita;
		this.currentCapacita = currentCapacita;
		this.soldi = soldi;
		this.oggetti = oggetti;
		this.idPersonaggio = idPersonaggio;
	}
	public int getMaxCapacita() {
		return maxCapacita;
	}
	public void setMaxCapacita(int maxCapacita) {
		this.maxCapacita = maxCapacita;
	}
	public int getCurrentCapacita() {
		return currentCapacita;
	}
	public void setCurrentCapacita(int currentCapacita) {
		this.currentCapacita = currentCapacita;
	}
	public List<Oggetto> getOggetti() {
		return oggetti;
	}
	public void setOggetti(List<Oggetto> oggetti) {
		this.oggetti = oggetti;
	}
	public int getIdPersonaggio() {
		return idPersonaggio;
	}
	public void setIdPersonaggio(int idGiocatore) {
		this.idPersonaggio = idGiocatore;
	}
	public int getSoldi() {
		return soldi;
	}
	public void setSoldi(int soldi) {
		this.soldi = soldi;
	}
	@Override
	public String toString() {
		return "Inventario [maxCapacita=" + maxCapacita + ", currentCapacita=" + currentCapacita + ", soldi=" + soldi
				+ ", oggetti=" + oggetti + ", idPersonaggio=" + idPersonaggio + "]";
	}
	
	
	
}
