package servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import combatModels.Personaggio;

/**
 * Servlet implementation class combatServlet
 */
@WebServlet("/getCombatState")
public class combatServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
	
	
    public combatServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        
        // Log della sessione
        System.out.println("Sessione attuale: " + session.getId());

        Personaggio personaggio = (Personaggio) session.getAttribute("personaggio");

        // Se non esiste, puoi crearlo per il test (opzionale)
        if (personaggio == null) {
            personaggio = new Personaggio("Piero");
            session.setAttribute("personaggio", personaggio); // Salva nella sessione
        }

        // Log del personaggio
        System.out.println("Personaggio: " + personaggio.nome);

        // Converti l'oggetto personaggio in JSON
        Gson gson = new Gson();
        String jsonResponse = gson.toJson(personaggio);
        
        // Imposta il tipo di contenuto della risposta
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();
        out.print(jsonResponse);
        out.flush();
    }
	
	
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
