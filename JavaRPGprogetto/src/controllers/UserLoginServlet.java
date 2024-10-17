package controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import data.PersonaggioDAO;
import data.UtenteDAO;
import model.Personaggio;
import model.Utente;


@WebServlet("/UserLoginServlet")
public class UserLoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public UserLoginServlet() {
        super();

    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		response.getWriter().append("Served at: ").append(request.getContextPath());
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        Utente u = null;

        // Logica di verifica delle credenziali
        try {
            if (UtenteDAO.loginUtente(username, password)) {
                HttpSession session = request.getSession();
                session.setAttribute("username", username);
                session.setAttribute("password", password);
                try{
       			 u =	UtenteDAO.getUtente(username, password);
       			 System.out.println(u);
       			session.setAttribute("utente", u);
       			List<Personaggio> personaggi = PersonaggioDAO.getPersonaggi(u.getIdUtente());
       			System.out.println(personaggi);
       			session.setAttribute("personaggi", personaggi);
       			session.setMaxInactiveInterval(0);
       			
       		}
       		catch(Exception e) {
       			e.printStackTrace();
       		}
                
                response.sendRedirect("home.jsp"); // Reindirizza a home.jsp in caso di successo
            } else {
                request.setAttribute("errorMessage", "Credenziali non valide.");
                request.getRequestDispatcher("login.jsp").forward(request, response); // Rimanda a login.jsp
            }
        } catch (Exception e) {
            e.printStackTrace();
            request.setAttribute("errorMessage", "Errore durante il login.");
            request.getRequestDispatcher("login.jsp").forward(request, response);
        }
    }
}

