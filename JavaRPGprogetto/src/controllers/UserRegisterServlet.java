package controllers;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import data.ConnessioneDb;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@WebServlet("/UserRegisterServlet")
public class UserRegisterServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String username = request.getParameter("newUsername"); // Qui è nome
        String email = request.getParameter("newEmail"); // Qui è email
        String password = request.getParameter("newPassword");

        // Verifica se i parametri sono vuoti
        if (username == null || email == null || password == null || username.isEmpty() || email.isEmpty()
                || password.isEmpty()) {
            request.setAttribute("errorMessage", "Nome, email e password non possono essere vuoti.");
            request.getRequestDispatcher("login.jsp").forward(request, response); // Assicurati che il percorso sia corretto
            return;
        }

        Connection conn = null;
        PreparedStatement preparedStatement = null;

        try {
            ConnessioneDb.connect();
            conn = ConnessioneDb.getCon();
            if (conn == null) {
                throw new SQLException("Connessione al database non riuscita.");
            }

            // Definisci la query correttamente
            String sql = "INSERT INTO utente (nome, email, password) VALUES (?, ?, ?)";
            preparedStatement = conn.prepareStatement(sql); // Usa sql
            preparedStatement.setString(1, username); // Nome
            preparedStatement.setString(2, email); // Email
            preparedStatement.setString(3, password); // Password

            int result = preparedStatement.executeUpdate();
            System.out.println("Risultato dell'aggiornamento: " + result); // Debug
            if (result > 0) {
                response.sendRedirect("login.jsp");
            } else {
                request.setAttribute("errorMessage", "Errore durante l'inserimento nel database.");
                request.getRequestDispatcher("login.jsp").forward(request, response); // Assicurati che il percorso sia corretto
            }
        } catch (SQLException e) {
            e.printStackTrace();
            request.setAttribute("errorMessage",
                    "Si è verificato un errore durante la registrazione: " + e.getMessage());
            request.getRequestDispatcher("login.jsp").forward(request, response); // Assicurati che il percorso sia corretto
        } finally {
            try {
                if (preparedStatement != null) {
                    preparedStatement.close();
                }
                if (conn != null) {
                    conn.close(); // Chiudi anche la connessione
                }
                ConnessioneDb.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
