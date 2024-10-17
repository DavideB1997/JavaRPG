<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
    // Invalidare la sessione
    session.invalidate();
    
    // Reindirizzare alla home page
    response.sendRedirect("HomeServlet"); // Assicurati di usare l'URL corretto per la tua home
%>
