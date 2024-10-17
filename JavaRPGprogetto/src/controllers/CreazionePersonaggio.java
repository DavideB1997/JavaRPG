package controllers;
import model.Arma;
import model.Consumabili;
import model.Inventario;
import model.Oggetto;
import model.Personaggio;
import model.Razza;
import model.Utente;

import java.util.*;
import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import data.PersonaggioDAO;


@WebServlet("/CreazionePersonaggio")
public class CreazionePersonaggio extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public CreazionePersonaggio() {
        super();
  
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {


	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Razza r = null;
		Arma arma = null;
		String nome = request.getParameter("characterName");
		Consumabili c = null;
		Inventario i =null;
		List  <Oggetto> o = new ArrayList();
		Utente u =(Utente) request.getSession().getAttribute("utente");
		request.getSession().getAttribute("personaggi");
		List <Personaggio> personaggi = new ArrayList();
	    String nomeRazza = request.getParameter("selectedSprite");
	    int idRazza =0;
		if (nomeRazza.equals("cavaliere") ) {
	    	idRazza=1;}
		else if (nomeRazza.equals("fata")) {
			idRazza = 2;
		}
		else if (nomeRazza.equals("gnomo")) {
			idRazza = 2;
		}
	    	
	    
		if (request.getParameter("weapon").equals("spada")) {
			arma = new Arma(1,"danno","spada",1,99,1,"spada arruginita",2,nomeRazza,1);
		}
		else if (request.getParameter("weapon").equals("bacchetta")) {
			arma = new Arma(2,"danno","bacchetta",1,99,1,"bacchetta usurata",2,nomeRazza,1);
		}
		else if (request.getParameter("weapon").equals("mazza")) {
			arma = new Arma(3,"danno","mazza",1,99,1,"mazza spuntata",2,nomeRazza,1);
		}
		else if (request.getParameter("weapon").equals("martello")) {
			arma = new Arma(4,"danno","martello",1,99,1,"martello rotondo",2,nomeRazza,1);
		}
		
		if (request.getParameter("pozione").equals("cura")) {
			c = new Consumabili(8,"cura","cura minore",3,5,10,"Piccola pozione curativa");
		}
		else if (request.getParameter("pozione").equals("mana")) {
			c = new Consumabili(9,"cura","mana minore",3,5,10,"Piccola pozione di mana");
		}
		else if (request.getParameter("pozione").equals("danno")) {
			c = new Consumabili(10,"danno","danno minore",3,5,10,"Piccola pozione di veleno");
		}
		else if (request.getParameter("pozione").equals("cura+mana")) {
			c = new Consumabili(11,"cura","pozione minore",3,5,10,"Piccola pozione");
		}
		r = new Razza(idRazza,nomeRazza);
		o.add(c);
		o.add(arma);
		i = new Inventario (1,10,30,0,o,u.getIdUtente());
		
		Personaggio p = new Personaggio (10,10,10,10,1,nome,0,u.getIdUtente(),i,1,0,arma,null,0,0,r);
		personaggi.add(p);
		System.out.println(p);
		
		try {
			PersonaggioDAO.createPersonaggio(p);
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		
		
		
		




	}

}
