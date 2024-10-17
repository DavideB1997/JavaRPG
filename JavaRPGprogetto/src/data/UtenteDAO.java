package data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import model.Utente;

public class UtenteDAO {
	
	public static Utente getUtente(String username, String password) throws SQLException {
		ConnessioneDb.connect();
		String query = "select * from utente where nome = ? and password = ?";
		PreparedStatement st = ConnessioneDb.getCon().prepareStatement(query);
	   Utente utente= null;
       st.setString(1, username);
       st.setString(2, password);
       ResultSet out = st.executeQuery();
		while (out.next()) {
			int idUtente = out.getInt("idUtente");
			String email = out.getString("email");
			String ruolo = out.getString("ruolo");
			utente = new Utente(idUtente, username, email, password, ruolo);

		}
		ConnessioneDb.close();
		return utente;
	}
	
	
	public static List<Utente> getUtenti() throws SQLException {
		ConnessioneDb.connect();
		String query = "select * from utente";
		PreparedStatement st = ConnessioneDb.getCon().prepareStatement(query);
		ResultSet out = st.executeQuery();
		List<Utente> utenti = new ArrayList();

		while (out.next()) {
			int idUtente = out.getInt("idUtente");
			String nome = out.getString("nome");
			String email = out.getString("email");
			String password = out.getString("password");
			String ruolo = out.getString("ruolo");
			Utente utente = new Utente(idUtente, nome, email, password, ruolo);
			utenti.add(utente);
		}
		ConnessioneDb.close();
		return utenti;
	}

	public static void aggiungiUtente(String nome, String email, String password, String ruolo) throws SQLException {
		try {
			ConnessioneDb.connect();
			ConnessioneDb.getCon();
			String query = "INSERT INTO utente (nome, email, password, ruolo) VALUES (?, ?, ?,?);";
			PreparedStatement st = ConnessioneDb.getCon().prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
			st.setString(1, nome);
			st.setString(2, email);
			st.setString(3, password);
			st.setString(4, ruolo);
			st.executeUpdate();
			ResultSet rs = st.getGeneratedKeys();
			ConnessioneDb.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void aggiungiUtente(Utente u) throws SQLException {
		try {
			ConnessioneDb.connect();
			ConnessioneDb.getCon();
			String query = "INSERT INTO utente (nome, email, password, ruolo) VALUES (?, ?, ?,?);";
			PreparedStatement st = ConnessioneDb.getCon().prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
			st.setString(1, u.getNome());
			st.setString(2, u.getEmail());
			st.setString(3, u.getPassword());
			st.setString(4, u.getRuolo());
			st.executeUpdate();
			ResultSet rs = st.getGeneratedKeys();
			ConnessioneDb.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static boolean loginUtente(String username, String password) throws SQLException {
		ConnessioneDb.connect();
		ConnessioneDb.getCon();
		Utente u = null;
		String query = "select nome, password, email from utente where nome = ? and password = ?";
		PreparedStatement st = ConnessioneDb.getCon().prepareStatement(query);
		st.setString(1, username);
		st.setString(2, password);
		ResultSet rs = st.executeQuery();
		while (rs.next()) {
			u = new Utente(0, rs.getString("nome"), rs.getString("email"), rs.getString("password"), "");
		}
		ConnessioneDb.close();
		if (u != null) {
			return true;
		}

		else {
			return false;

		}
	}
	
	public static void updateUser(String email, String username, String password, int idUtente) throws SQLException {
	    Connection conn = null;
	    PreparedStatement st = null;

	    try {
	        // Connetti al database
	        conn = ConnessioneDb.connect();

	        // Query di aggiornamento dell'utente
	        String query = "UPDATE utente SET email = ?, password = ?, nome = ? WHERE idUtente = ?";
	        
	        // Prepara l'istruzione
	        st = conn.prepareStatement(query);
	        
	        // Imposta i parametri della query
	        st.setString(1, email);
	        st.setString(2,password);
	        st.setString(3, username);  // Presupponendo che tu voglia aggiornare anche la password
	        st.setInt(4, idUtente);
	        
	        // Esegui l'aggiornamento
	        int rowsAffected = st.executeUpdate();

	        // Stampa o registra il numero di righe aggiornate

	    } catch (SQLException e) {
	        e.printStackTrace();
	        throw e;
	    } finally {
	        // Chiudi PreparedStatement e Connection
	        if (st != null) try { st.close(); } catch (SQLException e) { e.printStackTrace(); }
	        if (conn != null) try { conn.close(); } catch (SQLException e) { e.printStackTrace(); }
	    }
	}

}
