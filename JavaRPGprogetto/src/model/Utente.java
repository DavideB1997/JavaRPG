package model;

public class Utente {
	private int idUtente;
	private String nome;
	private String email;
	private String password;
	private String ruolo;
	public Utente () {
		
	}
	@Override
	public String toString() {
		return "Utente [idUtente=" + idUtente + ", nome=" + nome + ", email=" + email + ", password=" + password
				+ ", ruolo=" + ruolo + "]";
	}
	public Utente(int idUtente,String nome, String email, String password,String ruolo) {
		super();
		this.setNome(nome);
		this.setEmail(email);
		this.setPassword(password);
		this.setIdUtente(idUtente);
		this.setRuolo(ruolo);
	}
	public Utente(String nome, String email, String password,String ruolo) {
		super();
		this.setNome(nome);
		this.setEmail(email);
		this.setPassword(password);
		this.setRuolo(ruolo);
	}
	public String getRuolo() {
		return ruolo;
	}
	public void setRuolo(String ruolo) {
		this.ruolo = ruolo;
	}
	public int getIdUtente() {
		return idUtente;
	}
	public void setIdUtente(int idUtente) {
		this.idUtente = idUtente;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

}
