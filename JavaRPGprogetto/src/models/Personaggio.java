package models;

public class Personaggio {
    private String id; // Identificatore univoco del personaggio
    private String idRoom;
    private int x;
    private int y; 
    private int speed;

    // Costruttore
    public Personaggio(String id, int x, int y, int speed) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    public String getIdRoom() {
		return idRoom;
	}

	public void setIdRoom(String idRoom) {
		this.idRoom = idRoom;
	}

	// Getter e Setter
    public String getId() {
        return id;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public void setPosition(int x, int y) {
        this.x = x;
        this.y = y;
    }
}
