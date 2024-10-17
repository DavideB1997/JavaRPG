package data;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import model.Arma;
import model.Armatura;

public class ArmaturaDAO {
	public static Armatura getArmatura(int idPersonaggio) throws SQLException {
		Armatura a = null;
		ConnessioneDb.connect();
		String query = "select o.*, p.armaturaEquipaggiata, r.nomeRazza, oi.* " +
	               "from oggetto o " +
	               "join personaggio p on armaturaEquipaggiata = idOggetto " +
	               "join razza r on o.idRazza = r.idRazza " +
	               "join oggetti_inv oi on o.idOggetto = oi.idOggetto " +
	               "where p.idPersonaggio = ?;";
		PreparedStatement st = ConnessioneDb.getCon().prepareStatement(query);
		st.setInt(1, idPersonaggio);
		ResultSet out = st.executeQuery();
		while (out.next()) {
		int idOggetto = out.getInt("idOggetto");
		String idTipo = out.getString("idTipo");
		String nome = out.getString("nome");
		int currentQuantity = out.getInt("currentQuantity");
		int maxQuantity = out.getInt("maxQuantity");
		int valore = out.getInt("valore");
		String descrizione = out.getString("descrizione");
		int attacco = out.getInt("difesa");
		String razza = out.getString("nomeRazza");
		int livello = out.getInt("livello");
		a = new Armatura (idOggetto,idTipo,nome,currentQuantity,maxQuantity,valore,descrizione,attacco,razza,livello);
		
		}
		
		return a;
	}
	
	public static void saveArmatura(Armatura a, int idPersonaggio) throws SQLException {
		ConnessioneDb.connect();
		String query = "UPDATE javarpg.personaggio SET armaturaEquipaggiata = ? WHERE (idPersonaggio = ?);";
		PreparedStatement st = ConnessioneDb.getCon().prepareStatement(query);
		
		st.setInt(1, a.getIdOggetto());
		st.setInt(2, idPersonaggio);
		
		
		ConnessioneDb.close();
		}
	

}
