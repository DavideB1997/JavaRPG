package data;
import data.OggettoDAO;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import model.Arma;
import model.Armatura;
import model.Inventario;
import model.Oggetto;
import model.Personaggio;
import model.Razza;

public class InventarioDAO {

	public static Inventario getInventario(int idPersonaggio) throws SQLException {
		Inventario inv = null;
		List<Oggetto> oggetti = new ArrayList();
		ConnessioneDb.connect();
		String query = "SELECT o.*, oi.*, i.soldi, i.idInventario, i.maxCapacita,i.currentCapacita, i.idPersonaggio "
				+ "FROM oggetto o " + "JOIN oggetti_inv oi ON o.idOggetto = oi.idOggetto "
				+ "JOIN inventario i ON oi.idInventario = i.idInventario " + "WHERE i.idPersonaggio = ?;";

		PreparedStatement st = ConnessioneDb.getCon().prepareStatement(query);
		st.setInt(1, idPersonaggio);
		ResultSet out = st.executeQuery();
		int idInventario = -1;
		int soldi = 0;
		int maxCapacita = 0;
		int currentCapacita = 0;
		int idPers = 0;
		while (out.next()) {
			if (idInventario == -1) {
				idInventario = out.getInt("idInventario");
				soldi = out.getInt("soldi");
				maxCapacita = out.getInt("maxCapacita");
				currentCapacita = out.getInt("currentCapacita");
				idPers = out.getInt("idPersonaggio");
			}

			Oggetto o = new Oggetto(out.getInt("idOggetto"), out.getString("idTipo"), out.getString("nome"),
					out.getInt("currentQuantity"), out.getInt("maxQuantity"), out.getInt("valore"),
					out.getString("descrizione"));
			oggetti.add(o);

		}

		if (idInventario != -1) {
			inv = new Inventario(idInventario, maxCapacita, currentCapacita, soldi, oggetti, idPersonaggio);
		}
		
		return inv;

	}
	
	public static void saveInventario(Inventario i) throws SQLException {
		ConnessioneDb.connect();
		String query = "UPDATE javarpg.inventario SET currentCapacita = ? maxCapacita = ? soldi = ? WHERE (idPersonaggio = ?);"
				+ "update oggetti_inv set currentQuantity = ? where (idPersonaggio = ? and idOggetto = ?);"
				+ "delete from oggetti_inv where currentCapacita = 0";
		PreparedStatement st = ConnessioneDb.getCon().prepareStatement(query);
		
		st.setInt(1, i.getCurrentCapacita());
		st.setInt(2, i.getMaxCapacita());
		st.setInt(3, i.getSoldi());
		st.setInt(4, i.getIdPersonaggio());
		for (int y =0; 1<i.getOggetti().size();y++ ) {
	    st.setInt(5,i.getOggetti().get(y).getCurrentQuantity() );
		st.setInt(6, i.getIdPersonaggio());
		st.setInt(7, i.getOggetti().get(y).getIdOggetto());
		}
		
		
		
		ConnessioneDb.close();
		}
	/*public static void createInventario(Inventario i, int idPersonaggio) throws SQLException {
		ConnessioneDb.connect();
		String query = "insert into inventario (idPersonaggio, currentCapacita, maxCapacita, soldi) values (?,?,?,?);";
		PreparedStatement st = ConnessioneDb.getCon().prepareStatement(query);
		
		st.setInt(1, i.getIdPersonaggio() );
		st.setInt(2, i.getCurrentCapacita() );
		st.setInt(3, i.getMaxCapacita() );
		st.setInt(4, i.getSoldi() );
		for (int y =0; y<i.getOggetti().size();y++ ) {
	    OggettoDAO.addOggetto(i.getOggetti().get(y), i.getIdInventario()); 
		}
		
		
		
		ConnessioneDb.close();
		}*/
	
	public static void createInventario(Inventario i, int idPersonaggio) throws SQLException {
	    ConnessioneDb.connect();
	    String query = "INSERT INTO inventario (idPersonaggio, currentCapacita, maxCapacita, soldi) VALUES (?, ?, ?, ?);";
	    PreparedStatement st = ConnessioneDb.getCon().prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
	    
	    st.setInt(1, idPersonaggio);
	    st.setInt(2, i.getCurrentCapacita());
	    st.setInt(3, i.getMaxCapacita());
	    st.setInt(4, i.getSoldi());
	    
	    // Esegui l'inserimento
	    int rowsInserted = st.executeUpdate();
	    if (rowsInserted > 0) {
	        // Recupera l'ID generato
	        ResultSet generatedKeys = st.getGeneratedKeys();
	        if (generatedKeys.next()) {
	            int generatedIdInventario = generatedKeys.getInt(1);
	            // Imposta l'ID dell'inventario nell'oggetto Inventario
	            i.setIdInventario(generatedIdInventario);
	        }
	    }

	    // Aggiungi gli oggetti all'inventario appena creato
	    for (Oggetto oggetto : i.getOggetti()) {
	        OggettoDAO.addOggetto(oggetto, i.getIdInventario());
	    }

	    ConnessioneDb.close();
	}

}
