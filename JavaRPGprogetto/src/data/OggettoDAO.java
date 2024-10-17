package data;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import model.Inventario;
import model.Oggetto;

public class OggettoDAO {
    public static void addOggetto(Oggetto o, int idInventario) throws SQLException {
        ConnessioneDb.connect(); // Assicurati che la connessione sia aperta correttamente
        
        String query = "insert into oggetti_inv (idOggetto, idInventario, currentQuantity, maxQuantity) values (?,?,?,?);";
        PreparedStatement st = ConnessioneDb.getCon().prepareStatement(query);
        
        st.setInt(1, o.getIdOggetto());
        st.setInt(2, idInventario);
        st.setInt(3, o.getCurrentQuantity());
        st.setInt(4, o.getMaxQuantity());
        
        // Esegui l'aggiornamento e verifica il risultato
        int rowsInserted = st.executeUpdate();
        System.out.println("Rows inserted: " + rowsInserted);
        
        // Chiudi la connessione solo dopo l'esecuzione della query
        ConnessioneDb.close();
    }
}
