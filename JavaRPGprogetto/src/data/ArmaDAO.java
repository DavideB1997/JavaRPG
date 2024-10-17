package data;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import model.Arma;
import model.Inventario;
import model.Razza;

public class ArmaDAO {
		public static Arma getArma(int idPersonaggio) throws SQLException {
			Arma a = null;
			Inventario i = InventarioDAO.getInventario(idPersonaggio);
			int currentQuantity =0;
			int maxQuantity =0;
			int valore = 0;
			String descrizione = "";
			int attacco = 0;
			String razza = "";
			int livello = 0;
			ConnessioneDb.connect();
			String query = "select o.* , p.* , r.* from oggetto o join personaggio p on armaEquipaggiata = idOggetto join razza r on o.idRazza = r.idRazza where p.idPersonaggio = ?";
			PreparedStatement st = ConnessioneDb.getCon().prepareStatement(query);
			st.setInt(1, idPersonaggio);
			ResultSet out = st.executeQuery();
			while (out.next()) {
			int idOggetto = out.getInt("idOggetto");
			String idTipo = out.getString("idTipo");
			String nome = out.getString("nome");
			for (int y =0; y<i.getOggetti().size();y++) {
				if (i.getOggetti().get(y).getIdOggetto() == idOggetto) {
					currentQuantity =i.getOggetti().get(y).getCurrentQuantity();
					maxQuantity = i.getOggetti().get(y).getMaxQuantity();
					valore = i.getOggetti().get(y).getValore();
					descrizione = i.getOggetti().get(y).getDescrizione();
					attacco = out.getInt("attacco");
					razza = out.getString("nomeRazza");
					livello = out.getInt("livello");
				}
				
			}
			
			a = new Arma (idOggetto,idTipo,nome,currentQuantity,maxQuantity,valore,descrizione,attacco,razza,livello);
			
			}
		
			return a;
		}

		public static void saveArma(Arma a, int idPersonaggio) throws SQLException {
			ConnessioneDb.connect();
			String query = "UPDATE javarpg.personaggio SET armaEquipaggiata = ? WHERE (idPersonaggio = ?);";
			PreparedStatement st = ConnessioneDb.getCon().prepareStatement(query);
			
			st.setInt(1, a.getIdOggetto());
			st.setInt(2, idPersonaggio);
			
			
			ConnessioneDb.close();
			}
		
	
		}


