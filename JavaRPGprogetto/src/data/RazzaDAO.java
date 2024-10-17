package data;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import model.Arma;
import model.Armatura;
import model.Inventario;
import model.Personaggio;
import model.Razza;

public class RazzaDAO {
	public static Razza getRazza(int idPersonaggio) throws SQLException {
		Razza r = null;
		ConnessioneDb.connect();
		String query = "select rp.*, r.nomeRazza from razza r join razza_personaggio rp on r.idRazza = rp.idRazza where rp.idPersonaggio = ?;";
		PreparedStatement st = ConnessioneDb.getCon().prepareStatement(query);
		st.setInt(1, idPersonaggio);
		ResultSet out = st.executeQuery();
		while (out.next()) {
		int idRazza = out.getInt("idRazza");
		String nomeRazza = out.getString("nomeRazza");
		r = new Razza(idRazza,nomeRazza);
		}
		return r;
	}
	
	public static void saveRazza(Personaggio p) throws SQLException {
		ConnessioneDb.connect();
		String query = "insert into razza_personaggio (idRazza, idPersonaggio) value (?,?)";
		PreparedStatement st = ConnessioneDb.getCon().prepareStatement(query);
		st.setInt(1, p.getRazza().getIdRazza());
		st.setInt(2, p.getIdPersonaggio());
	}
}
