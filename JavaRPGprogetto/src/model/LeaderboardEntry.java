package model;

public class LeaderboardEntry {
    private String userName;
    private String characterName;
    private int score;

    // Costruttori, getter e setter
    public LeaderboardEntry(String userName, String characterName, int score) {
        this.userName = userName;
        this.characterName = characterName;
        this.score = score;
    }

    public String getUserName() {
        return userName;
    }

    public String getCharacterName() {
        return characterName;
    }

    public int getScore() {
        return score;
    }
}
