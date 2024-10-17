package endPoint;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.*;

@ServerEndpoint("/stanze")
public class StanzaServerEndpoint {
    private static final Map<String, Set<Session>> stanze = new HashMap<>();
    private static final Map<String, Map<String, PlayerInfo>> playerData = new HashMap<>(); // Map to track player info for each room
    private String currentRoom;

    @OnOpen
    public void onOpen(Session session) {
        System.out.println("Connessione aperta: " + session.getId());
    }

    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        synchronized (stanze) { // Synchronization to avoid concurrency issues
        	if (message.startsWith("join:")) {
        	    // Split the message to extract roomCode and playerId
        	    String[] parts = message.split(":");
        	    String roomCode = parts[1];  // Extract the room code from the message
        	    String playerId = parts[2];  // Extract the player ID from the message

        	    // Create the room if it doesn't exist yet
        	    stanze.putIfAbsent(roomCode, new HashSet<>());
        	    stanze.get(roomCode).add(session);  
        	    
        	    // Create player data list for the room if not present
        	    playerData.putIfAbsent(roomCode, new HashMap<>());
        	    currentRoom = roomCode;  // Set the current room for this session
        	    
        	    // Send a welcome message to the player
        	    session.getBasicRemote().sendText("Sei entrato nella stanza: " + roomCode);

        	    PlayerInfo newPlayer = new PlayerInfo(roomCode, playerId, "100", "100");  // Set initial position
        	    
        	    playerData.get(roomCode).put(playerId, newPlayer);  // Store player in playerData using the client-provided ID
        	    
        	    // Send the list of existing players in the room to the new player
        	    for (Map.Entry<String, PlayerInfo> entry : playerData.get(roomCode).entrySet()) {
        	        PlayerInfo p = entry.getValue();
        	        
        	        session.getBasicRemote().sendText("newPlayer:" + p.getIdRoom() + ":" + p.getId() + ":" + p.getX() + ":" + p.getY());
        	    }

        	    // Notify other players in the room about the new player (optional)
        	    for (Session s : stanze.get(roomCode)) {
        	        if (!s.equals(session)) {  // Skip sending this to the current player
        	            s.getBasicRemote().sendText("Un nuovo utente è entrato nella stanza " + roomCode);
        	        }
        	    }
        	} else if (message.startsWith("leave:")) {
        		    String[] parts = message.split(":");
        		    String roomCode = parts[1];  // Extract the room code from the message
        		    String playerId = parts[2];  // Extract the playerId from the message
        		    
        		    
        		    if (stanze.containsKey(roomCode)) {
        		        stanze.get(roomCode).remove(session);
        		        playerData.get(roomCode).remove(playerId);
        		        
        		        session.getBasicRemote().sendText("Sei uscito dalla stanza: " + roomCode + ":" + playerId);

        		        // Informare gli altri utenti della stanza
        		        for (Session s : stanze.get(roomCode)) {
        		            if (s.isOpen() && !s.equals(session)) {
        		                s.getBasicRemote().sendText("playerRemoved:" + roomCode + ":" + playerId);
        		            }
        		        }
        		    }
        		} else if (message.startsWith("positionUpdate:")) {
            	
            	
                // Handle position update
                String[] parts = message.split(":");
                
                // Check that there are at least 5 parts
                if (parts.length >= 5) {
                    String roomCode = parts[1];
                    String playerId = parts[2];
                    String x = parts[3];
                    String y = parts[4];

                    // Update the player's position in the map
                    PlayerInfo player = playerData.get(roomCode).get(playerId);
                    
                    
                    if (player != null) {
                        player.setX(x);
                        player.setY(y);
                    } else {
                        player = new PlayerInfo(roomCode, playerId, x, y);
                        playerData.get(roomCode).put(playerId, player);
                    }

                    // Send the position update to all users in the room
                    for (Session s : stanze.get(roomCode)) {
                        if (s.isOpen() && !s.equals(session)) {
                            s.getBasicRemote().sendText("positionUpdate:" + roomCode + ":" + playerId + ":" + x + ":" + y);
                        }
                    } 
                } else {
                    System.err.println("Messaggio positionUpdate non formattato correttamente: " + message);
                }
            }
        }
    }

    @OnClose
    public void onClose(Session session) {
        System.out.println("Connessione chiusa: " + session.getId());
        synchronized (stanze) {
            if (currentRoom != null) {
                Set<Session> roomSessions = stanze.get(currentRoom);
                if (roomSessions != null) {
                    roomSessions.remove(session);
                    if (roomSessions.isEmpty()) {
                        stanze.remove(currentRoom);
                    }
                }
                playerData.get(currentRoom).remove(session.getId());
            }
        }
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        System.err.println("Errore nella sessione: " + session.getId() + " - " + throwable.getMessage());
    }

    // Class to keep track of player information
    private static class PlayerInfo {
        private String id;
        private String idRoom;
        private String x;
        private String y;

        public PlayerInfo(String idRoom, String id, String x, String y) {
            this.idRoom = idRoom;
            this.id = id;
            this.x = x;
            this.y = y;
        }

        public String getIdRoom() {
            return idRoom;
        }

        public String getId() {
            return id;
        }

        public String getX() {
            return x;
        }

        public void setX(String x) {
            this.x = x;
        }

        public String getY() {
            return y;
        }

        public void setY(String y) {
            this.y = y;
        }
    }
}
