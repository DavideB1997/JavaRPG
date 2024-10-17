package model;

public class Razza {
	private int idRazza;
	private String nomeRazza;
	
	public Razza(int idRazza, String nomeRazza) {
		super();
		this.setIdRazza(idRazza);
		this.setNomeRazza(nomeRazza);
	}
	public int getIdRazza() {
		return idRazza;
	}
	public void setIdRazza(int idRazza) {
		this.idRazza = idRazza;
	}
	public String getNomeRazza() {
		return nomeRazza;
	}
	public void setNomeRazza(String nomeRazza) {
		this.nomeRazza = nomeRazza;
	}
	@Override
	public String toString() {
		return "Razza [idRazza=" + idRazza + ", nomeRazza=" + nomeRazza + "]";
	}
	
	
	
}
