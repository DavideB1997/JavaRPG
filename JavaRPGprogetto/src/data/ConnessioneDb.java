package data;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import com.mysql.cj.jdbc.MysqlDataSource;

public class ConnessioneDb {
    private static Connection conn = null;
    
    public static Connection connect() throws SQLException {
        if (conn == null || conn.isClosed()) {
            try {
                // Assicurati di avere il driver giusto per il tuo database
                Class.forName("com.mysql.cj.jdbc.Driver"); // O il driver che stai usando
                String url = "jdbc:mysql://localhost:3306/javarpg";
                String user = "root";
                String password = "JAITA124";
                conn = DriverManager.getConnection(url, user, password);
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
                throw new SQLException("Driver JDBC non trovato.");
            }
        }
        return conn;
    }
    
    public static void close() throws SQLException {
        if (conn != null && !conn.isClosed()) {
            conn.close();
        }
    }
    
    public static Connection getCon() {
        return conn;
    }
}
