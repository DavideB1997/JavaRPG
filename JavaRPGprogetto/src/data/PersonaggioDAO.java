package data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.*;

import model.Personaggio;
import model.Razza;
import model.Oggetto;
import model.Equipaggiabili;
import model.Arma;
import model.Armatura;
import model.Inventario;

public class PersonaggioDAO {
	public static List<Personaggio> getPersonaggi(int idUtente) throws SQLException {
	    List<Personaggio> p = new ArrayList<>();
	    Razza r = null;
	    Inventario i = null;
	    Connection conn = null;
	    PreparedStatement st = null;
	    ResultSet out = null;
	    
	    try {
	        conn = ConnessioneDb.connect(); // Ora 'conn' dovrebbe essere una connessione valida
	        String query = "SELECT * FROM personaggio WHERE idUtente = ?";
	        st = conn.prepareStatement(query); // Usa 'conn' per creare il PreparedStatement
	        st.setInt(1, idUtente);
	        out = st.executeQuery();
	        
	        while (out.next()) {
	            int idPersonaggio = out.getInt("idPersonaggio");
	            String nomep = out.getString("nome");
	            int currentHp = out.getInt("currentHp");
	            int maxHp = out.getInt("maxHp");
	            int currentMana = out.getInt("currentMana");
	            int maxMana = out.getInt("maxMana");
	            int attaccop = out.getInt("attacco");
	            int currentLevel = out.getInt("currentLevel");
	            int currentExp = out.getInt("currentExp");
	            int puntiLb = out.getInt("puntiLb");
	            int posizioneLb = out.getInt("posizioneLb");
	            
	            // Recupera i dati collegati dalle altre tabelle
	            Arma armaEquipaggiata = ArmaDAO.getArma(idPersonaggio);
	            Armatura armaturaEquipaggiata = ArmaturaDAO.getArmatura(idPersonaggio);
	            r = RazzaDAO.getRazza(idPersonaggio);
	            i = InventarioDAO.getInventario(idPersonaggio);
	            
	            // Crea un oggetto Personaggio e aggiungilo alla lista
	            Personaggio m = new Personaggio(currentHp, maxHp, maxMana, currentMana, attaccop, nomep, idPersonaggio, idUtente, i, currentLevel, currentExp, armaEquipaggiata, armaturaEquipaggiata, puntiLb, posizioneLb, r);
	            p.add(m);
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	        // Gestisci l'eccezione se necessario
	    } finally {
	        // Chiudi le risorse nell'ordine inverso di apertura
	        if (out != null) try { out.close(); } catch (SQLException e) { e.printStackTrace(); }
	        if (st != null) try { st.close(); } catch (SQLException e) { e.printStackTrace(); }
	        if (conn != null) try { conn.close(); } catch (SQLException e) { e.printStackTrace(); }
	    }
	    
	    return p;
	}

	
	public static Personaggio getPersonaggio(int idPersonaggio) throws SQLException {
		Personaggio p = null;
		Razza r = RazzaDAO.getRazza(idPersonaggio);
		Inventario i = InventarioDAO.getInventario(idPersonaggio);
		Arma arma = ArmaDAO.getArma(idPersonaggio);
		Armatura armatura = ArmaturaDAO.getArmatura(idPersonaggio);
		ConnessioneDb.connect();
		String query = "select * from personaggio where idPersonaggio=?;";
		PreparedStatement st = ConnessioneDb.getCon().prepareStatement(query);
		st.setInt(1, idPersonaggio);
		ResultSet out = st.executeQuery();
		while (out.next()) {
			int idUtente = out.getInt("idUtente");
			String nomep = out.getString("nome");
			int currentHp = out.getInt("currentHp");
			int maxHp = out.getInt("maxHp");
			int currentMana = out.getInt("currentMana");
			int maxMana = out.getInt("maxMana");
			int attaccop = out.getInt("attacco");
			int currentLevel = out.getInt("currentLevel");
			int currentExp = out.getInt("currentExp");
			int puntiLb = out.getInt("puntiLb");
			int posizioneLb= out.getInt("posizioneLb");
			p = new Personaggio(currentHp,maxHp,maxMana,currentMana,attaccop,nomep,idPersonaggio,idUtente,i,currentLevel,currentExp,arma,armatura,puntiLb,posizioneLb,r);
			
		}
		ConnessioneDb.close();
		return p;
	}
	public static void savePersonaggio(Personaggio p) throws SQLException {
	    ConnessioneDb.connect();
	    String query = "update personaggio set currentHp = ?, maxHp = ?, currentMana = ?, maxMana = ?, attacco = ?, nome = ?, idUtente = ?, currentLevel = ?, currentExp = ?, puntiLb = ?, posizioneLb = ? where idPersonaggio = ?;";
	    PreparedStatement st = ConnessioneDb.getCon().prepareStatement(query);
	    st.setInt(1, p.getCurrentHp());
	    st.setInt(2, p.getMaxHp());
	    st.setInt(3, p.getCurrentMana());
	    st.setInt(4, p.getMaxMana());
	    st.setInt(5, p.getAttacco());
	    st.setString(6, p.getNome());
	    st.setInt(7, p.getIdUtente());
	    st.setInt(8, p.getCurrentLevel());
	    st.setInt(9, p.getCurrentExp());
	    st.setInt(10, p.getPuntiLb());
	    st.setInt(11, p.getPosizioneLb());
	    st.setInt(12, p.getIdPersonaggio());
	    
	    st.executeUpdate();
	    
	    ArmaDAO.saveArma(p.getArmaEquipaggiata(), p.getIdPersonaggio());
	    ArmaturaDAO.saveArmatura(p.getArmaturaEquipaggiata(), p.getIdPersonaggio());
	    InventarioDAO.saveInventario(p.getInventario());

	    ConnessioneDb.close();
	}
	public static void createPersonaggio(Personaggio p) throws SQLException {
	    ConnessioneDb.connect();
	    String query = "INSERT INTO personaggio (currentHp, maxHp, currentMana, maxMana, attacco, nome, idUtente, currentLevel, currentExp, puntiLb, posizioneLb, maxLevel, maxExp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
	    PreparedStatement st = ConnessioneDb.getCon().prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
	    
	    st.setInt(1, p.getCurrentHp());
	    st.setInt(2, p.getMaxHp());
	    st.setInt(3, p.getCurrentMana());
	    st.setInt(4, p.getMaxMana());
	    st.setInt(5, p.getAttacco());
	    st.setString(6, p.getNome());
	    st.setInt(7, p.getIdUtente());
	    st.setInt(8, p.getCurrentLevel());
	    st.setInt(9, p.getCurrentExp());
	    st.setInt(10, p.getPuntiLb());
	    st.setInt(11, p.getPosizioneLb());
	    st.setInt(12, 11);
	    st.setInt(13, 12500);
	    
	    
	    st.executeUpdate();

	    ResultSet generatedKeys = st.getGeneratedKeys();
	    if (generatedKeys.next()) {
	        int idPersonaggio = generatedKeys.getInt(1);
	        p.setIdPersonaggio(idPersonaggio);
	    }

	    ArmaDAO.saveArma(p.getArmaEquipaggiata(), p.getIdPersonaggio());
	    RazzaDAO.saveRazza(p);
	    InventarioDAO.createInventario(p.getInventario(), p.getIdPersonaggio());

	    ConnessioneDb.close();
	}
	
	
	
}
